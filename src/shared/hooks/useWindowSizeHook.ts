import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

type ReturnType = [WindowSize];

const useWindowSize = (): ReturnType => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const resizeViewPort = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 300);

  // 컴포넌트 마운트 시에만 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('resize', resizeViewPort);
    return () => {
      window.removeEventListener('resize', resizeViewPort);
    };
  }, []);

  return [windowSize];
};

export default useWindowSize;
