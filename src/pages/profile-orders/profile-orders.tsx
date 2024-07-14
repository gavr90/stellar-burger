import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  useDispatch,
  useSelector,
  getProfileOrders,
  getOrders
} from '@services';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = useSelector(getProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
