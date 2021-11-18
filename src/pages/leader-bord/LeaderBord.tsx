import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  ResultBlock, ResultScore, ResultUser, ResultUserCurrent,
} from './style';
import { colors } from '../../styles/colors';
import { SubmitButton } from '../../styles/Buttons/Buttons';
import { getLeaderBord } from './api';
import { Leader } from './types/leader';
import usePrevious from '../../modules/utils/use-previous';
import { selectUser, UserStateValue } from '../../modules/redux/slices/userSlice';
import { useAppSelector } from '../../modules/redux/hooks';

const LeaderBord: React.VFC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [leadersOffset, setLeadersOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const previousLeadersOffset = usePrevious(leadersOffset);

  const authorizedUser: UserStateValue = useAppSelector(selectUser);

  useEffect(() => {
    if (!previousLeadersOffset || (leadersOffset > previousLeadersOffset)) {
      setLoading(true);

      getLeaderBord(leadersOffset)
        .then((newLeaders: Leader[]) => {
          if (newLeaders.length > 0) {
            setLeaders([...leaders, ...newLeaders]);
          } else {
            setLeadersOffset(leadersOffset - leaders.length);
          }
        })
        .catch(() => {
          setLeadersOffset(leadersOffset - leaders.length);
        })
        .finally(() => setLoading(false));
    }
  }, [leadersOffset]);

  const handleLoadMoreLeadersButtonClick = (): void => {
    setLeadersOffset(leadersOffset + leaders.length);
  };

  const positionTheme: {
    [key: string]: {
      [key: string]: string
    }
  } = {
    gold: {
      resultColor: colors.amber.amber_400,
    },
    silver: {
      resultColor: colors.blue_grey.blue_grey_100,
    },
    bronze: {
      resultColor: colors.amber.amber_800,
    },
    basic: {
      resultColor: colors.grey.grey_200,
    },
  };
  const positionColors = ['gold', 'silver', 'bronze', 'basic'];

  const leaderItemMapper = (leader: Leader, position: string): React.ReactElement => {
    const isAuthorizedUserScore = authorizedUser && authorizedUser.login === leader.login;
    return (
      <ThemeProvider theme={positionTheme[position]}>
        <ResultBlock>
          {isAuthorizedUserScore ? <ResultUserCurrent>{String.fromCharCode(9733)}</ResultUserCurrent> : null}
          <ResultUser>{isAuthorizedUserScore ? 'Вы' : leader.login}</ResultUser>
          <ResultScore>{leader.score}</ResultScore>
        </ResultBlock>
      </ThemeProvider>
    );
  };

  return (
    <div>
      {leaders.length === 0
        ? (
          <div>
            Никто не поставил рекорд... Будь первым!
          </div>
        )
        : (
          <>
            {leaders.map((leader, index) => (

              leaderItemMapper(leader, positionColors[index < 3 ? index : 3])
            ))}
            {loading ? 'Загрузка...' : (
              <div>
                <SubmitButton type="button" onClick={handleLoadMoreLeadersButtonClick}>Загрузить ещё</SubmitButton>
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default LeaderBord;
