import React, { useEffect, useState } from 'react';
import withFullscreen from '../../components/withFullscreen';
import GameGrid from './GameGrid/GameGrid';
import { saveScore } from '../leader-bord/api';
import { useAppSelector } from '../../modules/redux/hooks';
import { selectUser } from '../../modules/redux/slices/userSlice';
import useAppRouter from '../../modules/router/router';
import rootElementSelector from '../../modules/utils/root-element-selector';
import { exitFullscreen } from '../../modules/utils/fullscreen.utils';
import { AltButton, SubmitButton } from '../../styles/Buttons/Buttons';
import {
  Popup, StyledModal, Title, StatText,
} from './styles';

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
      <StyledModal isOpen={isGameOverModalOpen} appElement={rootElementSelector()}>
        <Popup>
          <Title>Игра окончена</Title>
          <StatText>Ваш рекорд: {userScore}</StatText>
          {!user && (
            <p>Вы не авторизированны. Ваш рекорд не будет сохранён :(</p>
          )}
          <SubmitButton type="button" onClick={closeGameOverModal}>Сыграть ещё!</SubmitButton>
          <AltButton type="button" onClick={onNavigateToLeaderBord}>Посмотреть таблицу рекордов</AltButton>
        </Popup>
      </StyledModal>
    </>
  );
};

export default Game;
