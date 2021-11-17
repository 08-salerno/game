import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

// todo [sitnik] потенциальные проблемы с SSR (использование document и window)

const noop = (): void => {};

const FullscreenDiv = styled.div<{isFullscreen: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type WithFullscreenProps = {
    forceExit?: boolean
}

// eslint-disable-next-line max-len
const withFullscreen = <P extends Record<string, unknown>>(Component: React.ComponentType<P>): React.FC<P & WithFullscreenProps> => (props): ReactElement => {
  const isFullscreenAvailable = document.fullscreenEnabled;

  if (isFullscreenAvailable) {
    const fullscreenElementRef = React.createRef<HTMLDivElement>();
    const [isFullscreen, setIsFullscreen] = useState(false);

    const fKeyListener = (event: KeyboardEvent):void => {
      if (event.key === 'f') {
        if (isFullscreen) {
          document.exitFullscreen().then(() => {
            setIsFullscreen(false);
          }).catch(noop);
        } else {
          fullscreenElementRef.current?.requestFullscreen().then(() => {
            setIsFullscreen(true);
          }).catch(noop);
        }
      }
    };
    window.addEventListener('keypress', fKeyListener);

    const onFullscreenChange = (): void => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);

    useEffect(() => ():void => {
      window.removeEventListener('keypress', fKeyListener);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    });

    const { fullscreenDefault } = props;
    if (fullscreenDefault) {
      setTimeout(() => {
        fKeyListener(new KeyboardEvent('keypress', { key: 'f' }));
      }, 1000);
    }

    return (
          <FullscreenDiv ref={fullscreenElementRef} isFullscreen={isFullscreen}>
              <Component {...props} />
          </FullscreenDiv>
    );
  }

  return <Component {...props} />;
};

export default withFullscreen;
