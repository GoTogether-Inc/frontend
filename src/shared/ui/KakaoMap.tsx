import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <div className="w-full h-[300px]">
      <Map center={{ lat, lng }} style={{ width: '100%', height: '100%' }}>
        <MapMarker position={{ lat, lng }} />
      </Map>
    </div>
  );
};

export default KakaoMap;
