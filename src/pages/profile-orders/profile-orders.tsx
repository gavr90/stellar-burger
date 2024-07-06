import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getProfileOrders } from '../../services/profile-orders/slice';
import { getOrders } from '../../services/profile-orders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  dispatch(getOrders());
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
