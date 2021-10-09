import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import store from './modules/redux/store';
import App from './App';

const Root: React.VFC = () => (
    <>
        <Normalize />
        <Provider store={store}>
            <App />
        </Provider>
    </>
);

ReactDOM.render(<Root />, document.querySelector('#root'));



sonarCube
параметры
agile scrum
waterfall

по трем точкам
композиция сверху вниз
снизу вверх

export default function Countdown() {
  const [num, setNum] = useState(100);
  const [pause, setPause] = useState(false);

  const handleClick = () => {
    setPause(!pause);
  };

  useEffect(() => {
    let i;
    if (pause) {
      i = setInterval(() => {
        setNum((prev) => prev + 1);
      });
    }

    return () => {
      clearInterval(i);
    };
  }, [pause]);

  return (
    <div>
      <div>{num}</div>
      <button onClick={handleClick}>{pause ? 'Run' : 'Pause'}</button>
    </div>
  );
}
