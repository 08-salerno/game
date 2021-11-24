import React from 'react';
import {
  Formik, FormikValues,
} from 'formik';
import { object, string } from 'yup';
import { createTopic } from '../../api';
import ForumRoutes from '../../routes';
import { FormikSubmit } from '../../../../modules/utils/formik.utils';
import useAppRouter from '../../../../modules/router/router';
import { FormContainer, Title } from '../../../../styles/Forms/Forms';
import FormFiled from '../../../../components/FormField/FormField';
import { SubmitButton } from '../../../../styles/Buttons/Buttons';

const TopicCreateSchema = object().shape({
  topic: string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Required'),
});

interface TopicCreateFormValue extends FormikValues {
  title: string;
}

const TopicCreatePage: React.VFC = () => {
  const router = useAppRouter();

  const handleSubmit: FormikSubmit<TopicCreateFormValue> = (
    values: TopicCreateFormValue,
  ): Promise<void> => createTopic(values.title)
    .then((id: string) => {
      router.go(`${ForumRoutes.HOME}/${id}`);
    })
    .catch(() => {
      // todo [sitnik] уведомить пользоователя об ошибке
    });

  /*   const CreateInput = styled(Field)`
      font-family: Arial;
      width: 100%;
      border: none;
      border-bottom: 1px solid ${(props): string => props.theme.form.underline};
      color: ${(props): string => props.theme.form.font};
      background-color: ${(props): string => props.theme.form.background};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    `; */
  return (
    <>
      <Formik
        initialValues={{ title: '' }}
        validationSchema={TopicCreateSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid, isSubmitting }): React.ReactElement => (
          <FormContainer>
            <Title>Создать тему</Title>
            <FormFiled name="topic" label="topic" type="topic" />
            <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</SubmitButton>
          </FormContainer>
        )}
      </Formik>
      {/*     <Formik
      initialValues={{ title: '' }}
      validationSchema={TopicCreateSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }): React.ReactElement => (
        <Form>
          <Field name="title" maxLength={MaxTitleLength} placeholder="Описание">
            {(props: FieldProps<string, TopicCreateFormValue>): React.ReactElement => (
              <div>
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
    </Formik> */}
    </>
  );
};

export default TopicCreatePage;
