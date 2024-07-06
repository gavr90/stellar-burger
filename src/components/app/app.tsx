import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Modal, FeedInfo, OrderInfo, IngredientDetails } from '@components';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, ProtectedRoute } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { getFeed } from '../../services/feed/actions';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location?.state?.background;
  const userName = useSelector((state) => state.auth.user?.name);
  const profileMatch = useMatch('profile/orders/:number')?.params.number;
  const feedMatch = useMatch('feed/:number')?.params.number;
  const orderId = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeed());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader name={userName} />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderId}`}
                onClose={() => navigate('/feed')}
                children={<OrderInfo />}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => navigate('/')}
                children={<IngredientDetails />}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderId}`}
                  onClose={() => navigate('/profile/orders')}
                  children={<OrderInfo />}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
