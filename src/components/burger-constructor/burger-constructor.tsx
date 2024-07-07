import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  useDispatch,
  useSelector,
  orderBurger,
  clearConstructorItems,
  clearOrderResult,
  getConstructorItems,
  getOrderRequest,
  getOrderResult,
  getUser,
  getUserSelector
} from '@services';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderResult = useSelector(getOrderResult);

  const user = useSelector(getUserSelector);

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login', { replace: true, state: { from: location } });
    }

    if (!constructorItems.bun || orderRequest) return;
    const itemsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      )
    ];
    dispatch(orderBurger(itemsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructorItems());
    dispatch(clearOrderResult());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderResult}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
