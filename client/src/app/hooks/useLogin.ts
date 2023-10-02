import { useFormik } from 'formik';
import { loginValidate as validate } from '@lib/helpers/loginValidate';
import { ILoginValues } from '@models/interfaces/viewInterfaces';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@apolloGraphQL/mutation/login';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const router = useRouter();
  const [login] = useMutation(LOGIN);

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
            localStorage.setItem('accessToken', data.login.accessToken);
            router.push('/profile');
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
