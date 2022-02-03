import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../LoginFormMessages';

export const useForm = () => {
  const messages = useMessages();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup.string().required(messages.requiredError),
    password: yup.string().required(messages.requiredError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  return formik;
};
