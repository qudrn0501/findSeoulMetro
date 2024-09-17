import { useEffect } from 'react';

const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      // 현재 뷰포트의 높이를 1vh로 계산
      let vh = window.innerHeight * 0.01;
      // --vh CSS 변수를 업데이트
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 페이지 로드 및 리사이즈 시 뷰포트 높이 설정
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight(); // 초기 실행

    // Cleanup 함수: 리스너 제거
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);
};

export default useViewportHeight;