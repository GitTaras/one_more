import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .max(250, 'max length is 250 charts')
    .required('type message'),
});

export const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(16, 'max length is 16 charts'),
  lastName: Yup.string()
    .required()
    .trim()
    .min(2, 'min length is 2 charts')
    .max(16, 'max length is 16 charts'),
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

export const signinSchema = Yup.object().shape({
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