import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import withFullscreen from '../../components/withFullscreen';
import GameGrid from './GameGrid/GameGrid';
import { saveScore } from '../leader-bord/api';
import { useAppSelector } from '../../modules/redux/hooks';
import { selectUser } from '../../modules/redux/slices/userSlice';
import useAppRouter from '../../modules/router/router';
import { exitFullscreen } from '../../modules/utils/fullscreen.utils';

export type GameProps = {
    onGameOver: (score: number) => void;
}
const GameGridWithFullscreen = withFullscreen<GameProps>(GameGrid);
const Game: React.FC = () => {
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const user = useAppSelector(selectUser);
  const router = useAppRouter();

  const onGameOver: GameProps['onGameOver'] = (score: number) => {
    exitFullscreen();
    setUserScore(score);
    setIsGameOverModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      saveScore({ score: userScore, login: user.login }).then(() => {
        // todo [sitnik]
      }).catch(() => {
        // todo [sitnik]
      });
    }
  }, [userScore]);

  const closeGameOverModal = (): void => {
    setIsGameOverModalOpen(false);
  };

  const onNavigateToLeaderBord = (): void => {
    closeGameOverModal();
    router.goLeaderBoard();
  };

  return (
        <>
            <GameGridWithFullscreen onGameOver={onGameOver} />
            <Modal isOpen={isGameOverModalOpen} ariaHideApp={false}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <h1>Игра окончена</h1>
                    <h2>Ваш рекорд: {userScore}</h2>
                    {!user && (
                        <p>Вы не авторизированны. Ваш рекорд не будет сохранён :(</p>
                    )}
                    <button type="button" onClick={closeGameOverModal}>Сыграть ещё!</button>
                    <br />
                    <button type="button" onClick={onNavigateToLeaderBord}>Посмотреть таблицу рекордов</button>
                </div>
            </Modal>
        </>
  );
};

export default Game;
