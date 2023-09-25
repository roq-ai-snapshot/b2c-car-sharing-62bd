import axios from 'axios';
import queryString from 'query-string';
import { CarStatusInterface, CarStatusGetQueryInterface } from 'interfaces/car-status';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCarStatuses = async (
  query?: CarStatusGetQueryInterface,
): Promise<PaginatedInterface<CarStatusInterface>> => {
  const response = await axios.get('/api/car-statuses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCarStatus = async (carStatus: CarStatusInterface) => {
  const response = await axios.post('/api/car-statuses', carStatus);
  return response.data;
};

export const updateCarStatusById = async (id: string, carStatus: CarStatusInterface) => {
  const response = await axios.put(`/api/car-statuses/${id}`, carStatus);
  return response.data;
};

export const getCarStatusById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-statuses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarStatusById = async (id: string) => {
  const response = await axios.delete(`/api/car-statuses/${id}`);
  return response.data;
};
