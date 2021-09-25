import React from 'react';
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

type AppRoute = {
  title: string;
  link: string;
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
    title: 'Авторизация',
    link: '/auth',
    component: Auth,
  },
  {
    title: 'Страница пользователя',
    link: '/profile',
    component: Profile,
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

const App: React.FC = () => (
  <Router>
    <div>
      <NavBar>
        <DropDown>
          <DropDownButton type="button">Routes DD</DropDownButton>
          <DropDownContent>
            <DropDownLink to="/">Главная</DropDownLink>
            {routes.map((route: AppRoute) => (
              <DropDownLink to={route.link}>{route.title}</DropDownLink>
            ))}
          </DropDownContent>
        </DropDown>
        <NavBarLink href="https://github.com/08-salerno/game" target="_blank" rel="noreferrer">Github</NavBarLink>
      </NavBar>
      <Layout>
        <Switch>
          {routes.map((route: AppRoute) => (
            /**
             * Добавь недостающий пропс
             */
            <Route path={route.path ? route.path : route.link} component={route.component} />
          ))}
          <Route path="/">
            <h1>Отсюда всё начинается :)</h1>
            Возможно логично сделать стартовую страницу сразу с игрой и перенаправлять на
            страницу с игрой при странных рутах
          </Route>
        </Switch>
      </Layout>

    </div>
  </Router>
);

export default App;
