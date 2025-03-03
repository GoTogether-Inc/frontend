import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = ({ lat, lng }: { lat: number; lng: number }) => {
  //@TODO:마커 등 추가기능 추후에
  return (
    <Map center={{ lat: lat, lng: lng }} style={{ width: '100%', height: '360px' }}>
      <MapMarker position={{ lat: lat, lng: lng }}>
        <div style={{ color: '#000' }}></div>
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;
