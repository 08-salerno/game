import { useHistory } from 'react-router-dom';
import ForumRoutes from '../../pages/forum/routes';
import { LeaderBordRoutes } from '../../pages/leader-bord/routes';

type VoidFn = () => void
type AppRouter = {
    goAuth: VoidFn;
    goRegister: VoidFn;
    goProfile: VoidFn
    goMain: VoidFn;
    goGame: VoidFn;
    goForum: VoidFn;
    goLeaderBoard: VoidFn;
    goBack: VoidFn;
    go(path: string): void
}

function useAppRouter(): AppRouter {
  const history = useHistory();

  const goAuth = (): void => history.push('/auth');
  const goRegister = (): void => history.push('/register');
  const goProfile = (): void => history.push('/profile');
  const goMain = (): void => history.push('/');
  const goGame = (): void => history.push('/game');
  const goForum = (): void => history.push(ForumRoutes.HOME);
  const goLeaderBoard = (): void => history.push(LeaderBordRoutes.HOME);
  const goBack = (): void => {
    if (history.length > 0) {
      history.goBack();
    } else {
      goMain();
    }
  };
  const go = (path: string): void => history.push(path);

  return {
    goAuth,
    goRegister,
    goProfile,
    goMain,
    goGame,
    goForum,
    goLeaderBoard,
    goBack,
    go,
  };
}

export default useAppRouter;
