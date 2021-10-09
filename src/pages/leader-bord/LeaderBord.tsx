import React, { useEffect, useState } from 'react';
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

  const leaderItemMapper = (leader: Leader): React.ReactElement => {
    const isAuthorizedUserScore = authorizedUser && authorizedUser.login === leader.login;
    return (
          <div key={leader.login} style={isAuthorizedUserScore ? { color: 'red' } : {}}>
              <span>{isAuthorizedUserScore ? 'Вы' : leader.login }</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{leader.score}</span>
          </div>
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
                      {leaders.map((leader) => (
                        leaderItemMapper(leader)
                      ))}
                      {loading ? 'Загрузка...' : (
                          <div>
                              <button type="button" onClick={handleLoadMoreLeadersButtonClick}>Загрузить ещё</button>
                          </div>
                      )}
                  </>
              )}
        </div>
  );
};

export default LeaderBord;
