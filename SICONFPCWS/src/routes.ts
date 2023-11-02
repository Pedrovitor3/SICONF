import { Router, Request, Response } from 'express';
import { FrequenciaController } from './controllers/FrequenciaController';
import { verifyToken } from './Utils/functionsToken';
import { PessoaController } from './controllers/PessoaController';

export const router = Router();
const frequenciaController = new FrequenciaController();
const pessoaController = new PessoaController();

/*
    5 métodos de requisição HTTP mais utilizados:
    GET => Busca
    POST => salvar
    PUT => Alterar
    DELETE => Deletar
    PATCH => Alteração específica
*/

//frequencia
router.post("/frequencia", verifyToken , frequenciaController.create);
router.get("/frequencia", verifyToken, frequenciaController.all);
router.get("/frequencia/:id",verifyToken, frequenciaController.one);
router.put("/frequencia/:id",verifyToken, frequenciaController.update);
router.delete("/frequencia/:id", verifyToken, frequenciaController.remove);

//pessoa
router.post("/pessoa", verifyToken , pessoaController.create);
router.get("/pessoa", verifyToken, pessoaController.all);
router.get("/pessoa/:id",verifyToken, pessoaController.one);
router.put("/pessoa/:id",verifyToken, pessoaController.update);
router.delete("/pessoa/:id", verifyToken, pessoaController.remove);

router.get('/generateToken', frequenciaController.token);

 export default router; // Retornando as rotas preenchidas para o server.ts