import { FormikConfig } from 'formik';

export type FormikSubmit<FormValue> = FormikConfig<FormValue>['onSubmit']
