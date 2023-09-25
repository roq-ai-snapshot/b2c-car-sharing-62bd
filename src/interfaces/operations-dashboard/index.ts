import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface OperationsDashboardInterface {
  id?: string;
  company_id: string;
  total_cars?: number;
  available_cars?: number;
  booked_cars?: number;
  maintenance_cars?: number;
  last_updated?: any;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface OperationsDashboardGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
}
