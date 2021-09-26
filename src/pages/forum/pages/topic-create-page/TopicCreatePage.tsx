import React from 'react';
import {
  ErrorMessage,
  Field, FieldProps, Form, Formik, FormikConfig, FormikValues,
} from 'formik';
import { object, string, StringSchema } from 'yup';
import { useHistory } from 'react-router-dom';
import { createTopic } from '../../api';
import ForumRoutes from '../../routes';

export type TopicCreatePageProps = {
    handleCreateTopic: (title: string) => Promise<void>
}

const TopicCreateSchema = object().shape<{title: StringSchema}>({
  title: string().required('').min(3, 'Минимум 3 символа'),
});

const MaxTitleLength = 300;

interface TopicCreateFormValue extends FormikValues {
    title: string;
}

const TopicCreatePage: React.VFC = () => {
  const history = useHistory();

  const handleSubmit: FormikConfig<TopicCreateFormValue>['onSubmit'] = (
    values: TopicCreateFormValue,
  ): Promise<void> => createTopic(values.title).then((id: string) => {
    history.push(`${ForumRoutes.HOME}/${id}`);
    return Promise.resolve();
  }).catch(() => {
    // todo [sitnik] уведомить пользоователя об ошибке
  });

  return (
      <Formik initialValues={{ title: '' }} validationSchema={TopicCreateSchema} onSubmit={handleSubmit}>
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
