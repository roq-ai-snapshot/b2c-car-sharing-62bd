import axios from 'axios';
import queryString from 'query-string';
import { OperationsDashboardInterface, OperationsDashboardGetQueryInterface } from 'interfaces/operations-dashboard';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOperationsDashboards = async (
  query?: OperationsDashboardGetQueryInterface,
): Promise<PaginatedInterface<OperationsDashboardInterface>> => {
  const response = await axios.get('/api/operations-dashboards', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createOperationsDashboard = async (operationsDashboard: OperationsDashboardInterface) => {
  const response = await axios.post('/api/operations-dashboards', operationsDashboard);
  return response.data;
};

export const updateOperationsDashboardById = async (id: string, operationsDashboard: OperationsDashboardInterface) => {
  const response = await axios.put(`/api/operations-dashboards/${id}`, operationsDashboard);
  return response.data;
};

export const getOperationsDashboardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/operations-dashboards/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteOperationsDashboardById = async (id: string) => {
  const response = await axios.delete(`/api/operations-dashboards/${id}`);
  return response.data;
};
