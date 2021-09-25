import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteProps,
} from 'react-router-dom';
import GameGrid from './components/GameGrid/GameGrid';

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
    title: 'game',
    link: '/game',
    component: GameGrid,
  },
];

const App: React.FC = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          {routes.map((route: AppRoute, i) => (
            <li key={i}>
              <Link to={route.link}>{route.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Switch>
        {routes.map((route: AppRoute, i) => (
          /**
           * Добавь недостающий пропс
           */
          <Route key={i} component={route.component} path={route.path ? route.path : route.link} />
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
