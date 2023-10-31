import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutation/login';
import { ILoginValues } from 'lib/interfaces';

const useLogin = () => {
  const [login] = useMutation(LOGIN);

  const handleLogin = async ({ email, password }: ILoginValues) => {
    try {
      const { data, errors } = await login({
        variables: {
          email,
          password,
        },
      });
      console.log(data);
      console.log(errors);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { handleLogin };
};

export default useLogin;
