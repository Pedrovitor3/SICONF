import { getConfig } from '../configs/sistemaConfig';
import { urlsServices } from '../configs/urlsConfig';
import axios from 'axios';

const api = axios.create({
  baseURL: urlsServices.LEGADOWS,
  //withCredentials: true,
});

export const useAxiosSICAD = () => ({
  unidadesPC: async () => {
    const response = await api.get(
      `/unidadesPC?token=${localStorage.getItem('token_sso')}`,
      getConfig('pub'),
    );
    return response;
  },
  unidadePorId: async (unidade: number) => {
    const response = await api.get(
      `/unidadePorId/${unidade}?token=${localStorage.getItem('token_sso')}`,
      getConfig('pub'),
    );
    return response;
  },
  servidoresPorUnidade: async (unidade: number) => {
    const response = await api.get(
      `/servidoresPorUnidadeId/${unidade}?token=${localStorage.getItem(
        'token_sso',
      )}`,
      getConfig('pub'),
    );
    return response;
  },
});
