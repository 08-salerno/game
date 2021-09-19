import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteProps,
} from 'react-router-dom';

type AppRoute = {
  title: string;
  link: string;
} & RouteProps &
  Required<Pick<RouteProps, 'component'>>;

/**
 * Добавляй руты сюда, а не в разметку
 */
const routes: AppRoute[] = [];

const App: React.FC = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          {routes.map((route: AppRoute) => (
            <li>
              <Link to={route.link}>{route.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Switch>
        {routes.map((route: AppRoute) => (
          /**
           * Добавь недостающий пропс
           */
          <Route path={route.path ? route.path : route.link}>{route.component}</Route>
        ))}
        <Route path="/">
          <h1>Отсюда всё начинается :)</h1>
          Возможно логично сделать стартовую страницу сразу с игрой и перенаправлять на
          страницу с игрой при странных рутах
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;