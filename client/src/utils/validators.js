import * as Yup from 'yup';

export const PostSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .max(250, 'max length is 250 charts')
    .required('type message'),
});
