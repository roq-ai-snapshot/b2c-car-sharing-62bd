import * as yup from 'yup';

export const carStatusValidationSchema = yup.object().shape({
  status: yup.string().nullable(),
  last_updated: yup.date().nullable(),
  next_maintenance: yup.date().nullable(),
  mileage: yup.number().integer().nullable(),
  location: yup.string().nullable(),
  car_id: yup.string().nullable().required(),
});
