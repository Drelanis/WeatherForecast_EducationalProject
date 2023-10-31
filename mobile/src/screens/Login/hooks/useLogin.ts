import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutation/login';
import { AuthContext } from 'context/index';
import { ILoginValues } from 'lib/interfaces';

const useLogin = () => {
  const [login] = useMutation(LOGIN);
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogin = async ({ email, password }: ILoginValues) => {
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      setAuth({ isAuth: true, userId: data?.login.userId });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { handleLogin };
};

export default useLogin;
