export interface KakaoLinkOptions {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      Link: {
        sendDefault: (options: KakaoLinkOptions) => void;
      };
    };
  }
}
