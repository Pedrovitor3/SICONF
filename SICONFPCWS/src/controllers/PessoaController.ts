import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Pessoa } from '../models/Pessoa';


class PessoaController {
    
    async create(request: Request, response: Response, next: NextFunction) {
      console.log('-------------------------------------------------',request.body)
        const {  
          name,
          cpf,
          observacao,
          cargo,
          situacao,
          faltas,
          regional,
          unidade_policial,
          frequencia,
          position,
        } = request.body;
      
        const resourcePessoaRepository = APPDataSource.getRepository(Pessoa);
      
        const pessoa = resourcePessoaRepository.create({
          name,
          cpf,
          observacao,
          cargo,
          situacao,
          faltas,
          regional,
          unidade_policial,
          frequencia,
          position,
        });
      
        await resourcePessoaRepository.save(pessoa);
      
        return response.status(201).json(pessoa);
      }
    
    async all(reques: Request, response: Response, next: NextFunction) {
        const resourcePessoaRepository = APPDataSource.getRepository(Pessoa);

        const all = await resourcePessoaRepository.find();

        return response.json(all);
    }

    async one(request: Request, response: Response, next: NextFunction){
        const resourcePessoaRepository = APPDataSource.getRepository(Pessoa);

        const { id } = request.params;

        const one = await resourcePessoaRepository.findOne({where: {id: id}});

        return response.json(one);
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const { 
          name,
          cpf,
          observacao,
          cargo,
          situacao,
          faltas,
          regional,
          unidade_policial,  
          frequencia,
          position
        } = request.body;
        const id = request.params.id;
      
        const resourcePessoaRepository = APPDataSource.getRepository(Pessoa);
      
        const pessoaFull = await resourcePessoaRepository.findOne({
          where: { id: id },
        });
      
        if (!pessoaFull) {
          return response.status(400).json({ status: "pessoa não encontrada" });
        }
        const pessoa = await resourcePessoaRepository.update({
          id
        }, {
          name,
          cpf,
          observacao,
          cargo,
          situacao,
          faltas,
          regional,
          unidade_policial,
          frequencia,
          position,
          });
      
      
        return response.status(201).json(pessoa);
      }

    async remove(request: Request, response: Response, next: NextFunction) {
        const resourcePessoaRepository = APPDataSource.getRepository(Pessoa);

        let pessoaToRemove = await resourcePessoaRepository.findOneBy({id: request.params.id});

        if(!pessoaToRemove) {
            return response.status(400).json({status: "pessoa não encontrada!"});
        }

        const deleteResponse = await resourcePessoaRepository.softDelete(pessoaToRemove.id);
        if(!deleteResponse.affected) {
            return response.status(400).json({status: "pessoa não excluida!"});
        }

        return response.json(pessoaToRemove);
    }

 
    async paginar(request: Request, response: Response, next: NextFunction){
        const resourcePessoaRepository = APPDataSource.getRepository(Pessoa);

        const { perPage, page, column} = request.query;
        const skip = parseInt(page.toString()) * parseInt(perPage.toString());

        const all = await resourcePessoaRepository.createQueryBuilder('pessoa')
            .take( parseInt(perPage.toString()) )
            .skip( skip )
            .addOrderBy( column.toString(), 'ASC' )
            .getMany();

        return response.json(all);    
        }

    async token(request: Request, response: Response, next: NextFunction)  {
        const id = 1;
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 43200,
        });

        return response.json({auth: true, token});
    }
}

export { PessoaController }