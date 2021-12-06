import React from 'react';
import {
  ErrorMessage, Field, FieldProps, Form, Formik, FormikValues,
} from 'formik';
import { object, string, StringSchema } from 'yup';
import { createTopic } from '../../api';
import ForumRoutes from '../../routes';
import { FormikSubmit } from '../../../../modules/utils/formik.utils';
import useAppRouter from '../../../../modules/router/router';

const TopicCreateSchema = object().shape<{ title: StringSchema }>({
  title: string().required('').min(3, 'Минимум 3 символа'),
});

const MaxTitleLength = 300;

interface TopicCreateFormValue extends FormikValues {
  title: string;
}

const TopicCreatePage: React.VFC = () => {
  const router = useAppRouter();

  const handleSubmit: FormikSubmit<TopicCreateFormValue> = (
    values: TopicCreateFormValue,
  ): Promise<void> => createTopic(values.title)
    .then((id: number) => {
      router.go(`${ForumRoutes.HOME}/${id}`);
    })
    .catch(() => {
      // todo [sitnik] уведомить пользоователя об ошибке
    });

  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={TopicCreateSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }): React.ReactElement => (
        <Form>
          {/* todo [sitnik] вынести в переиспользуемый компонент*/}
          <Field name="title" maxLength={MaxTitleLength} placeholder="Описание">
            {(props: FieldProps<string, TopicCreateFormValue>): React.ReactElement => (
              <div>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <textarea {...props.field} />
                <div>
                  {props.field.value.length || 0}/{MaxTitleLength}
                </div>
              </div>
            )}
          </Field>
          <div>
            <ErrorMessage name="title" />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting || !(dirty && isValid)}>
              Создать тему
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TopicCreatePage;
