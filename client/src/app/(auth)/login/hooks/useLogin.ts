import { useContext } from 'react';
import { useFormik } from 'formik';
import { loginValidate as validate } from '@lib/helpers/loginValidate';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@apolloGraphQL/mutation/login';
import { useRouter } from 'next/navigation';
import { AuthContext, UserIdContext } from '@context';
import { ILoginValues } from '@lib/intarfaces';

const useLogin = () => {
  const router = useRouter();
  const [login] = useMutation(LOGIN);
  const { setAuth } = useContext(AuthContext);
  const { setUserId } = useContext(UserIdContext);

  const formik = useFormik<ILoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values: ILoginValues, { resetForm }) => {
      try {
        const { email, password } = values;
        resetForm({
          values: {
            email,
            password,
          },
        });
        await toast.promise(
          async () => {
            const { data } = await login({
              variables: {
                email,
                password,
              },
            });
            setUserId(data.login.userId);
            setAuth(true);
            router.push('/weather');
          },
          { pending: 'Login ...' }
        );
        toast.success('User is authorized');
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return { formik };
};

export default useLogin;
