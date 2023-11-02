import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutation/login';
import { AuthContext, LoadingContext } from 'context/index';
import { ILoginValues } from 'lib/interfaces';
import Toast from 'react-native-toast-message';

const useLogin = () => {
  const [login] = useMutation(LOGIN);
  const { setAuth } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const handleLogin = async ({ email, password }: ILoginValues) => {
    try {
      setLoading(true);
      const { data, errors } = await login({
        variables: {
          email,
          password,
        },
      });
      setAuth({ isAuth: true, userId: data?.login.userId });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error =(',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};

export default useLogin;
