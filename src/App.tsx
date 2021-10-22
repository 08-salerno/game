import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteProps,
} from 'react-router-dom';
import styled from 'styled-components';
import Register from './pages/Register/Register';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Forum from './pages/forum/Forum';
import ForumRoutes from './pages/forum/routes';
import { LeaderBordRoutes } from './pages/leader-bord/routes';
import LeaderBord from './pages/leader-bord/LeaderBord';
import GameGrid from './components/GameGrid/GameGrid';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import withFullscreen from './components/withFullscreen';
import PrivateRoute from './components/HOC/PrivateRoute/PrivateRoute';
import { selectUser } from './modules/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from './modules/redux/hooks';
import {
  fetchUserAction,
} from './modules/redux/sagas/user.saga';
import gitUrl from './modules/constants/repo-url';

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
    title: 'game',
    link: '/game',
    component: withFullscreen(GameGrid),
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

const NavBar = styled.nav`
  overflow: hidden;
  background-color: #333;
  font-family: Arial;
`;
const DropDown = styled.div`
  float: left;
  overflow: hidden;
`;
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  ${DropDown}:hover & {
    display: block;
  }
`;
const DropDownButton = styled.button`
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit; 
  margin: 0; 

  ${DropDown}:hover & {
    color: grey;
  }
`;
const DropDownLink = styled(Link)`
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    color: grey;
  }
`;
const NavBarLink = styled.a`
float: left;
font-size: 16px;
color: white;
text-align: center;
padding: 14px 16px;
text-decoration: none;
&:hover {
  color: grey;
}
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
                <React.Fragment key={route.link}>
                    {authChecked && (
                        <PrivateRoute
                          key={route.link}
                          component={route.component}
                          path={route.path ? route.path : route.link}
                        />
                    )}
                </React.Fragment>
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
