import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { getIsAuthChecked } from '../../services/auth/slice';
import { Navigate } from 'react-router-dom';
import { registerUser } from '../../services/auth/actions';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(getIsAuthChecked);

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

  if (isAuthChecked) {
    return <Navigate to={'/'} />;
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
