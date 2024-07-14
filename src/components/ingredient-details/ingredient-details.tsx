import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { getAllIngredients, useSelector } from '@services';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getAllIngredients);
  const getIngredientById = (id: string) =>
    ingredients.find((ingredient) => ingredient._id === id);

  let { id } = useParams<'id'>();
  const ingredientData = getIngredientById(String(id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
