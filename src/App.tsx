import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
//import { colors, colorsToChoose, basicColors } from './styles/colors';
import themes from './styles/themes';
import { Title, Description } from './styles/App/App';
import {
  NavBar, NavBarLink, DropDown, DropDownContent, DropDownHead, DropDownLink, DropDownButton,
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
  private?: boolean;
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

  // ТУТ ЗАГОТОВКА ДЛЯ ПОЛЬЗОВАТЕЛЬСКОЙ КАСТОМИЗАЦИИ ТЕМЫ

  /* const [backgroundColor, setBackgroundColor] = useState('white');
  const [fontColor, setFontColor] = useState('black');
  const [interfaceColor, setInterfaceColor] = useState('blue');
  const [isMount, setIsMount] = useState(false); */

  const [theme, setTheme] = useState(themes.dark);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserAction);
    }
  }, [user]);

  // ТУТ ЗАГОТОВКА ДЛЯ ПОЛЬЗОВАТЕЛЬСКОЙ КАСТОМИЗАЦИИ ТЕМЫ

  /* useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      return;
    }
    setTheme({
      backgroundColor: colors[backgroundColor][backgroundColor],
      font: colors[fontColor][fontColor],
      buttons: {
        font: colors.black.black,
        main: {
          main: colors[interfaceColor][`${interfaceColor}_400`],
          hover: colors[interfaceColor][`${interfaceColor}_600`],
          disabled: colors[interfaceColor][`${interfaceColor}_100`],
        },
        alt: {
          main: colors[interfaceColor][`${interfaceColor}_400`],
          hover: colors[interfaceColor][`${interfaceColor}_600`],
          disabled: colors[interfaceColor][`${interfaceColor}_100`],
        },
        exit: {
          main: colors[interfaceColor][`${interfaceColor}_400`],
          hover: colors[interfaceColor][`${interfaceColor}_600`],
          exit: colors[interfaceColor][`${interfaceColor}_100`],
        },
      },
      navbar: {
        backgroundColor: colors.grey.grey_800,
        font: colors.white.white,
        fontHover: colors.grey.grey_400,
        buttonBackground: colors.white.white,
        buttonHover: colors.grey.grey_200,
        buttonText: colors.black.black,
      },
      form: {
        font: colors.black.black,
        label: colors.grey.grey_800,
        background: colors.white.white,
        underline: colors.grey.grey_800,
      },
    });
  }, [backgroundColor, fontColor, interfaceColor]); */

  return (
    <ErrorBoundary>
      <Router>
        <>
          <ThemeProvider theme={theme}>
            <NavBar>
              <DropDown>
                <DropDownHead type="button">Routes DD</DropDownHead>
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
              <DropDown>
                <DropDownHead type="button">Theme</DropDownHead>
                <DropDownContent>
                  <DropDownButton onClick={(): void => setTheme(themes.light)}>Light</DropDownButton>
                  <DropDownButton onClick={(): void => setTheme(themes.dark)}>Dark</DropDownButton>
                </DropDownContent>
              </DropDown>
              {// ТУТ ЗАГОТОВКА ДЛЯ ПОЛЬЗОВАТЕЛЬСКОЙ КАСТОМИЗАЦИИ ТЕМЫ

              /* <DropDown>
                <DropDownHead type="button">Background color</DropDownHead>
                <DropDownContent>
                  {Object.entries(colorsToChoose).map((item: string[]) => (
                    <DropDownButton onClick={(): void => setBackgroundColor(item[0])}>{item[1]}</DropDownButton>
                  ))}
                </DropDownContent>
              </DropDown>
              <DropDown>
                <DropDownHead type="button">Interface color</DropDownHead>
                <DropDownContent>
                  {Object.entries(colorsToChoose).map((item: string[]) => (
                    <DropDownButton onClick={(): void => setInterfaceColor(item[0])}>{item[1]}</DropDownButton>
                  ))}
                </DropDownContent>
              </DropDown>
              <DropDown>
                <DropDownHead type="button">Font color</DropDownHead>
                <DropDownContent>
                  {Object.entries(Object.assign(colorsToChoose, basicColors)).map((item: string[]) => (
                    <DropDownButton onClick={(): void => setFontColor(item[0])}>{item[1]}</DropDownButton>
                  ))}
                </DropDownContent>
              </DropDown> */}
            </NavBar>
            <Layout id="layout">
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
                  <Title>Отсюда всё начинается :)</Title>
                  <Description>Возможно логично сделать стартовую страницу сразу с игрой и
                    перенаправлять на страницу с игрой при странных рутах
                  </Description>
                </Route>
              </Switch>
            </Layout>
          </ThemeProvider>
        </>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
