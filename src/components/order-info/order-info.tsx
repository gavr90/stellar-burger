import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { Preloader, OrderInfoUI } from '@ui';
import {
  useDispatch,
  useSelector,
  getOrderByNumber,
  getSelectedOrder,
  getAllOrders,
  getAllIngredients
} from '@services';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  let { number } = useParams<'number'>();
  const orders = useSelector(getAllOrders);
  const selectedOrder = useSelector(getSelectedOrder);
  const ingredients: TIngredient[] = useSelector(getAllIngredients);
  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    const order: TOrder | undefined = orders.find(
      (o) => o.number === Number(number)
    );
    if (order) {
      setOrderData(order);
    } else {
      dispatch(getOrderByNumber(Number(number)));
      setOrderData(selectedOrder);
    }
  });

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
