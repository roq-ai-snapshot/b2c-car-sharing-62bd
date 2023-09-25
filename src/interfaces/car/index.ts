import { BookingInterface } from 'interfaces/booking';
import { CarStatusInterface } from 'interfaces/car-status';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  license_plate?: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  car_status?: CarStatusInterface[];
  company?: CompanyInterface;
  _count?: {
    booking?: number;
    car_status?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  color?: string;
  license_plate?: string;
  company_id?: string;
}
