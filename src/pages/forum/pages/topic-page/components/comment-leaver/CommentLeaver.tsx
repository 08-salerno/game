import React from 'react';
import { object, string, StringSchema } from 'yup';
import {
  Formik, Form, Field, FormikValues, FieldProps, FormikConfig,
} from 'formik';

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
        <Form>
        {/* todo [sitnik] вынести в переиспользуемый компонент*/}
          <Field name="comment">
            {(props: FieldProps<string, CommentFormValue>): React.ReactElement => (
              <div>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <textarea placeholder="Ваш комментарий" maxLength={MaxCommentLength} {...props.field} />
                <div>
                  {props.field.value.length || 0}/{MaxCommentLength}
                </div>
              </div>
            )}
          </Field>
          <div>
            <button type="submit" disabled={isSubmitting || !(dirty && isValid)}>
              Прокомментировать
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentLeaver;
