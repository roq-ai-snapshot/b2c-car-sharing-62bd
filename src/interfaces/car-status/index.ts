import { CarInterface } from 'interfaces/car';
import { GetQueryInterface } from 'interfaces';

export interface CarStatusInterface {
  id?: string;
  car_id: string;
  status?: string;
  last_updated?: any;
  next_maintenance?: any;
  mileage?: number;
  location?: string;
  created_at?: any;
  updated_at?: any;

  car?: CarInterface;
  _count?: {};
}

export interface CarStatusGetQueryInterface extends GetQueryInterface {
  id?: string;
  car_id?: string;
  status?: string;
  location?: string;
}
