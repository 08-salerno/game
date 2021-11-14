import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from 'react-router-dom';
import {
  NavBar, NavBarLink, DropDown, DropDownContent, DropDownButton, DropDownLink,
} from './styles/Navbar/NavBar';
import Layout from './styles/Layout/Layout';
import Register from './pages/Register/Register';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Forum from './pages/forum/Forum';
import ForumRoutes from './pages/forum/routes';
import { LeaderBordRoutes } from './pages/leader-bord/routes';
import LeaderBord from './pages/leader-bord/LeaderBord';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PrivateRoute from './components/HOC/PrivateRoute/PrivateRoute';
import { selectUser } from './modules/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from './modules/redux/hooks';
import {
  fetchUserAction,
} from './modules/redux/sagas/user.saga';
import gitUrl from './modules/constants/repo-url';
import Game from './pages/game/Game';

type AppRoute = {
  title: string;
  link: string;
  private?:boolean;
} & RouteProps &
  Required<Pick<RouteProps, 'component'>>;

/**
 * Добавляй руты сюда, а не в разметку
 */
const routes: AppRoute[] = [
  {
    title: 'Регистрация',
    link: '/register',
    component: Register,
  },
  {
    title: 'Игра',
    link: '/game',
    component: Game,
  },
  {
    title: 'Авторизация',
    link: '/auth',
    component: Auth,
  },
  {
    title: 'Страница пользователя',
    link: '/profile',
    component: Profile,
    private: true,
  },
  {
    title: 'Форум',
    link: ForumRoutes.HOME,
    component: Forum,
    private: true,
  },
  {
    title: 'Таблица лидеров',
    link: LeaderBordRoutes.HOME,
    component: LeaderBord,
  },
];

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const authChecked = useAppSelector((state) => state.user.authChecked);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserAction);
    }
  }, [user]);

  return (
    <ErrorBoundary>
      <Router>
        <>
          <NavBar>
            <DropDown>
              <DropDownButton type="button">Routes DD</DropDownButton>
              <DropDownContent>
                <DropDownLink to="/">Главная</DropDownLink>
                {routes.map((route: AppRoute) => (
                      <DropDownLink key={route.link} to={route.link}>
                        {route.title}
                      </DropDownLink>
                ))}
              </DropDownContent>
            </DropDown>
            <NavBarLink
              href={gitUrl}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </NavBarLink>
          </NavBar>
          <Layout>
            <Switch>
              {routes.map((route: AppRoute) => (!route.private ? (
                /**
                 * Добавь недостающий пропс
                 */
                <Route
                  key={route.link}
                  path={route.path ? route.path : route.link}
                  component={route.component}
                />
              ) : (
                authChecked && (
                        <PrivateRoute
                          key={route.link}
                          component={route.component}
                          path={route.path ? route.path : route.link}
                        />
                )
              )))}
              <Route path="/" exact>
                <h1>Отсюда всё начинается :)</h1>
                Возможно логично сделать стартовую страницу сразу с игрой и перенаправлять
                на страницу с игрой при странных рутах
              </Route>
            </Switch>
          </Layout>
        </>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
