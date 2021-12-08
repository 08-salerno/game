import React from 'react';
import { object, string, StringSchema } from 'yup';
import {
  Formik, Field, FormikValues, FieldProps, FormikConfig,
} from 'formik';
import { FormContainer } from '../../../../../../styles/Forms/Forms';
import { SubmitButton } from '../../../../../../styles/Buttons/Buttons';

export type CommentLeaverProps = {
  handleLeaveComment: (text: string) => Promise<void>;
};

interface CommentFormValue extends FormikValues {
  comment: string;
}

const CommentSchema = object().shape<{ comment: StringSchema }>({
  comment: string().required(''),
});

const MaxCommentLength = 1024;

const CommentLeaver: React.VFC<CommentLeaverProps> = (props) => {
  const { handleLeaveComment } = props;

  const value: CommentFormValue = {
    comment: '',
  };

  const handleSubmit: FormikConfig<CommentFormValue>['onSubmit'] = (
    values: CommentFormValue,
    { setValues },
  ): Promise<void> => handleLeaveComment(values.comment).then(() => {
    setValues({ comment: '' });
    return Promise.resolve();
  });

  return (
    <Formik
      initialValues={value}
      validationSchema={CommentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }): React.ReactElement => (
        <FormContainer>
          {/* todo [sitnik] вынести в переиспользуемый компонент*/}
          <Field name="comment">
            {(props: FieldProps<string, CommentFormValue>): React.ReactElement => (
              <div style={{ width: '100%' }}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <textarea
                  style={{ width: '100%' }}
                  placeholder="Ваш комментарий"
                  maxLength={MaxCommentLength}
                  rows={5}
                  {...props.field}
                />
                <div style={{ textAlign: 'right' }}>
                  {props.field.value.length || 0}/{MaxCommentLength}
                </div>
              </div>
            )}
          </Field>
          <SubmitButton type="submit" disabled={isSubmitting || !(dirty && isValid)}>
            Прокомментировать
          </SubmitButton>
        </FormContainer>
      )}
    </Formik>
  );
};

export default CommentLeaver;
