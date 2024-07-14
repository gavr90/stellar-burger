import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Navigate } from 'react-router-dom';
import {
  authenticatedSelector,
  registerUser,
  useDispatch,
  useSelector
} from '@services';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authenticatedSelector);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(registerUser(data));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
