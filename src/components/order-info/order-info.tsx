import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/profile-orders/actions';
import { getSelectedOrder } from '../../services/profile-orders/slice';
import { getAllOrders } from '../../services/feed/slice';

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const dispatch = useDispatch();
  const params = useParams();
  const num = Number(params.number);
  const orders = useSelector(getAllOrders);
  const selectedOrder = useSelector(getSelectedOrder);

  useEffect(() => {
    if (num) {
      const order: TOrder | undefined = orders.find((o) => o.number === num);
      if (order) {
        setOrderData(order);
      } else {
        dispatch(getOrderByNumber(num));
        setOrderData(selectedOrder);
      }
    }
  }, [num]);

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
