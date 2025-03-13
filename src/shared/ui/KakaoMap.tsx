import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Map center={{ lat: lat, lng: lng }} style={{ width: '100%', height: '100%' }}>
        <MapMarker position={{ lat: lat, lng: lng }} />
      </Map>
    </div>
  );
};

export default KakaoMap;
