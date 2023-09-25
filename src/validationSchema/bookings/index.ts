import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  booking_status: yup.string().nullable(),
  pickup_location: yup.string().nullable(),
  dropoff_location: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  car_id: yup.string().nullable().required(),
});
