import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../EditProfileFormMessages';
import { useAuth } from 'providers/Auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackNavigatorParams } from 'navigation/ProfileStackNavigator';

export const useForm = () => {
  const auth = useAuth();
  const messages = useMessages();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ProfileStackNavigatorParams, 'edit'>
    >();

  const initialValues = {
    photo: { uri: auth.user?.photo },
    name: auth.user!.name,
    lastName: auth.user!.lastName,
    email: auth.user!.email,
    phone: auth.user!.phone,
  };

  const validationSchema = yup.object({
    photo: yup
      .object()
      .shape({ uri: yup.string(), type: yup.string(), fileName: yup.string() })
      .nullable(),
    name: yup
      .string()
      .min(3, messages.min3Error)
      .max(30, messages.max30Error)
      .required(messages.requiredError),
    lastName: yup
      .string()
      .min(3, messages.min3Error)
      .max(30, messages.max30Error)
      .required(messages.requiredError),
    email: yup
      .string()
      .email(messages.emailError)
      .required(messages.requiredError),
    phone: yup
      .string()
      .min(4, messages.requiredError)
      .matches(/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/, messages.phoneError),
    // password: yup
    //   .string()
    //   .required(messages.requiredError)
    //   .matches(
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!¿@(.)$=%^/&¡*-]).{8,}$/,
    //     messages.passwordError,
    //   ),
    // passwordConfirmation: yup
    //   .string()
    //   .oneOf([yup.ref('password')], messages.matchError)
    //   .required(messages.requiredError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return formik;
};
