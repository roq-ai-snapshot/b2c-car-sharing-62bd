import * as yup from 'yup';

export const operationsDashboardValidationSchema = yup.object().shape({
  total_cars: yup.number().integer().nullable(),
  available_cars: yup.number().integer().nullable(),
  booked_cars: yup.number().integer().nullable(),
  maintenance_cars: yup.number().integer().nullable(),
  last_updated: yup.date().nullable(),
  company_id: yup.string().nullable().required(),
});
