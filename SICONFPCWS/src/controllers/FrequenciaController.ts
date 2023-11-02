import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Frequencia } from '../models/frequencia';


class FrequenciaController {
    
    async create(request: Request, response: Response, next: NextFunction) {
      console.log('-------------------------------------------------',request.body)
        const {  
          name,
          data
        } = request.body;
      
        const resourceFrequenciaRepository = APPDataSource.getRepository(Frequencia);
      
        const frequencia = resourceFrequenciaRepository.create({
          name,
          data,
        });
      
        await resourceFrequenciaRepository.save(frequencia);
      
        return response.status(201).json(frequencia);
      }
    
    async all(reques: Request, response: Response, next: NextFunction) {
        const resourceFrequenciaRepository = APPDataSource.getRepository(Frequencia);

        const all = await resourceFrequenciaRepository.find();

        return response.json(all);
    }

    async one(request: Request, response: Response, next: NextFunction){
        const resourceFrequenciaRepository = APPDataSource.getRepository(Frequencia);

        const { id } = request.params;

        const one = await resourceFrequenciaRepository.findOne({where: {id: id}});

        return response.json(one);
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const { 
          name,
          data,
          
        } = request.body;
        const id = request.params.id;
      
        const resourceFrequenciaRepository = APPDataSource.getRepository(Frequencia);
      
        const frequenciaFull = await resourceFrequenciaRepository.findOne({
          where: { id: id },
        });
      
        if (!frequenciaFull) {
          return response.status(400).json({ status: "frequencia não encontrada" });
        }
        const frequencia = await resourceFrequenciaRepository.update({
          id
        }, {
          name,
          data,
       
          });
      
      
        return response.status(201).json(frequencia);
      }

    async remove(request: Request, response: Response, next: NextFunction) {
        const resourceFrequenciaRepository = APPDataSource.getRepository(Frequencia);

        let frequenciaToRemove = await resourceFrequenciaRepository.findOneBy({id: request.params.id});

        if(!frequenciaToRemove) {
            return response.status(400).json({status: "frequencia não encontrada!"});
        }

        const deleteResponse = await resourceFrequenciaRepository.softDelete(frequenciaToRemove.id);
        if(!deleteResponse.affected) {
            return response.status(400).json({status: "frequencia não excluida!"});
        }

        return response.json(frequenciaToRemove);
    }

 
    async paginar(request: Request, response: Response, next: NextFunction){
        const resourceFrequenciaRepository = APPDataSource.getRepository(Frequencia);

        const { perPage, page, column} = request.query;
        const skip = parseInt(page.toString()) * parseInt(perPage.toString());

        const all = await resourceFrequenciaRepository.createQueryBuilder('frequencia')
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

export { FrequenciaController }