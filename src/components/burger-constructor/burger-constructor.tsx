import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger } from '../../services/burger-constructor/actions';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructorItems,
  clearOrderModalData
} from '../../services/burger-constructor/slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.constructorItems
  );

  const orderRequest = useSelector(
    (state) => state.burgerConstructor.orderRequest
  );

  const orderModalData = useSelector(
    (state) => state.burgerConstructor.orderModalData
  );

  const user = useSelector((state) => state.auth.user);

  const onOrderClick = () => {
    // if (!user) {
    //   return navigate('/login');
    // }

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
    dispatch(clearOrderModalData());
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
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
