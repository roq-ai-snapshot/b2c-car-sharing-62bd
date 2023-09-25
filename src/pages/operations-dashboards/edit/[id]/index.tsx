import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getOperationsDashboardById, updateOperationsDashboardById } from 'apiSdk/operations-dashboards';
import { operationsDashboardValidationSchema } from 'validationSchema/operations-dashboards';
import { OperationsDashboardInterface } from 'interfaces/operations-dashboard';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';

function OperationsDashboardEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<OperationsDashboardInterface>(
    () => (id ? `/operations-dashboards/${id}` : null),
    () => getOperationsDashboardById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OperationsDashboardInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOperationsDashboardById(id, values);
      mutate(updated);
      resetForm();
      router.push('/operations-dashboards');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<OperationsDashboardInterface>({
    initialValues: data,
    validationSchema: operationsDashboardValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Operations Dashboards',
              link: '/operations-dashboards',
            },
            {
              label: 'Update Operations Dashboard',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Operations Dashboard
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Total Cars"
            formControlProps={{
              id: 'total_cars',
              isInvalid: !!formik.errors?.total_cars,
            }}
            name="total_cars"
            error={formik.errors?.total_cars}
            value={formik.values?.total_cars}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_cars', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Available Cars"
            formControlProps={{
              id: 'available_cars',
              isInvalid: !!formik.errors?.available_cars,
            }}
            name="available_cars"
            error={formik.errors?.available_cars}
            value={formik.values?.available_cars}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('available_cars', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Booked Cars"
            formControlProps={{
              id: 'booked_cars',
              isInvalid: !!formik.errors?.booked_cars,
            }}
            name="booked_cars"
            error={formik.errors?.booked_cars}
            value={formik.values?.booked_cars}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('booked_cars', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Maintenance Cars"
            formControlProps={{
              id: 'maintenance_cars',
              isInvalid: !!formik.errors?.maintenance_cars,
            }}
            name="maintenance_cars"
            error={formik.errors?.maintenance_cars}
            value={formik.values?.maintenance_cars}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('maintenance_cars', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_updated" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Updated
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_updated ? new Date(formik.values?.last_updated) : null}
              onChange={(value: Date) => formik.setFieldValue('last_updated', value)}
            />
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/operations-dashboards')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'operations_dashboard',
    operation: AccessOperationEnum.UPDATE,
  }),
)(OperationsDashboardEditPage);
