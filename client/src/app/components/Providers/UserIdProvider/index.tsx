import { UserIdContext } from '@context';
import { FC, useState } from 'react';

interface IUserIdProviderProps {
  children: React.ReactNode;
}

const UserIdProvider: FC<IUserIdProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export default UserIdProvider;
