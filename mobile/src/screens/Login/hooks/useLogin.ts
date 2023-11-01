import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutation/login';
import { AuthContext, LoadingContext } from 'context/index';
import { ILoginValues } from 'lib/interfaces';

const useLogin = () => {
  const [login] = useMutation(LOGIN);
  const { setAuth } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const handleLogin = async ({ email, password }: ILoginValues) => {
    try {
      setLoading(true);
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      setAuth({ isAuth: true, userId: data?.login.userId });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};

export default useLogin;
