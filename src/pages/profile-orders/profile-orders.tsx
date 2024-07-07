import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import {
  useDispatch,
  useSelector,
  getProfileOrders,
  getOrders
} from '@services';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  dispatch(getOrders());

  const orders: TOrder[] = useSelector(getProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
