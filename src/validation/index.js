import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
  message: Yup.string()
    .max(250, 'max length is 250 charts')
    .required('type message'),
});

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(30, 'max length is 30 charts'),
  email: Yup.string()
    .required()
    .email()
    .trim()
    .max(30, 'max length is 30 charts')
    .min(6, 'min length is 6 charts'),
  password: Yup.string()
    .required()
    .trim()
    .min(6, 'min length is 6 charts')
    .max(50, 'max length is 50 charts'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const editUserSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(30, 'max length is 30 charts'),
  email: Yup.string()
    .required()
    .email()
    .trim()
    .max(30, 'max length is 30 charts')
    .min(6, 'min length is 6 charts'),
});

export const updatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required()
    .trim()
    .min(6, 'min length is 6 charts')
    .max(50, 'max length is 50 charts'),
  password: Yup.string()
    .required()
    .trim()
    .max(50, 'max length is 50 charts')
    .min(6, 'min length is 6 charts')
    .test('not same', 'new password must differ from old', function(value) {
      return this.parent.oldPassword !== value;
    }),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email('bad email')
    .trim()
    .max(30, 'max length is 30 charts')
    .min(6, 'min length is 6 charts'),
  password: Yup.string()
    .required()
    .trim()
    .min(6, 'min length is 6 charts')
    .max(50, 'max length is 50 charts'),
});
