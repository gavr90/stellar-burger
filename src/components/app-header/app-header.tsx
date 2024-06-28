import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

type HeaderProps = {
  name: string | undefined;
};

export const AppHeader: FC<HeaderProps> = ({ name }) => (
  <AppHeaderUI userName={name || ''} />
);
