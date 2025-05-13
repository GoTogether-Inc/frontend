export const initializeKakao = () => {
  return new Promise<void>(resolve => {
    if (window.Kakao && window.Kakao.Link) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://developers.kakao.com/sdk/js/kakao.js`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_MAP_API_KEY);
      }
      resolve();
    };
  });
};

export const shareToKakao = async (title: string, description: string, imageUrl: string, linkUrl: string) => {
  await initializeKakao();

  if (!window.Kakao?.Link?.sendDefault) {
    throw new Error('카카오 SDK가 초기화되지 않았습니다.');
  }

  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl,
      link: {
        mobileWebUrl: linkUrl,
        webUrl: linkUrl,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
    ],
  });
};
