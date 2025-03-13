import KakaoMap from '../../../../shared/ui/KakaoMap';

const MapInfo = {
  LocationName: '서울특별시 강남구 00동',
  lat: 37.4979,
  lng: 126.795841,
};

const LocationInfo = () => {
  return (
    <div className="p-5 bg-white flex flex-col gap-2 rounded-[10px]">
      <p className="font-bold md:text-2xl text-xl">오시는 길</p>
      <p>{MapInfo.LocationName}</p>
      <KakaoMap lat={MapInfo.lat} lng={MapInfo.lng} />
    </div>
  );
};

export default LocationInfo;
