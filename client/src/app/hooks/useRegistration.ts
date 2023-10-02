import { useFormik } from 'formik';
import { registrationValidate as validate } from '@lib/helpers/registrationValidate';
import { IRegistrationValues } from '@models/interfaces/viewInterfaces';
import { toast } from 'react-toastify';
import { REGISTRATION } from '@apolloGraphQL/mutation/registration';
import { useMutation } from '@apollo/client';

const useRegistration = () => {
  const [registerUser] = useMutation(REGISTRATION);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validate,
    onSubmit: async (values: IRegistrationValues, { resetForm }) => {
      try {
        const { firstName, lastName, email, password, passwordRepeat } = values;
        resetForm({
          values: {
            firstName,
            lastName,
            email: '',
            password: '',
            passwordRepeat: '',
          },
        });
        await toast.promise(
          registerUser({
            variables: {
              email,
              firstName,
              lastName,
              password,
              passwordRepeat,
            },
          }),
          {
            pending: 'Registration...',
          }
        );
        toast.success('User is registered');
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return { formik };
};

export default useRegistration;
