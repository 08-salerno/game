import React, { useEffect, useState } from 'react';
import { getLeaderBord } from './api';
import { Leader } from './types/leader';
import usePrevious from '../../modules/utils/use-previous';

const LeaderBord: React.VFC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [leadersOffset, setLeadersOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const previousLeadersOffset = usePrevious(leadersOffset);

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
                      {/*todo Добавить выделение текущего пользователя,
                          когда будет добавлен пользовательский контекст*/}
                      {leaders.map((leader) => (
                          <div key={leader.login}>
                              <span>{leader.login}</span>
                              <span>&nbsp;-&nbsp;</span>
                              <span>{leader.score}</span>
                          </div>
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
