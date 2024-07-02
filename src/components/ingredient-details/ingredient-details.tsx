import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const getIngredientById = (id: string) =>
    useSelector((state) => state.ingredients.ingredients).find(
      (ingredient) => ingredient._id === id
    );

  let { id } = useParams<'id'>();
  const ingredientData = getIngredientById(String(id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
