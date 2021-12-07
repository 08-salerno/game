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

const MaxTitleLength = 300;

const TopicCreateSchema = object().shape({
  title: string()
    .min(2, 'Name is too short')
    .max(MaxTitleLength, 'Name is too long')
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
    .then((id: number) => {
      router.go(`${ForumRoutes.HOME}/${id}`);
    })
    .catch(() => {
      // todo [sitnik] уведомить пользоователя об ошибке
    });

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
            <FormFiled name="title" label="title" type="title" />
            <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</SubmitButton>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default TopicCreatePage;
