import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import SecondaryButton from '../../../design-system/ui/buttons/SecondaryButton';

interface AddressSearchProps {
  address: string;
  setAddress: (address: string) => void;
  onLocationChange?: (lat: number, lng: number) => void;
  onDetailAddressChange?: (detailAddress: string) => void;
}

export const AddressSearch = ({ address, setAddress, onLocationChange, onDetailAddressChange }: AddressSearchProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postcodeKey, setPostcodeKey] = useState(0);
  const [detailAddress, setDetailAddress] = useState('');

  const handleComplete = (data: Address) => {
    setAddress(data.address);
    if (onLocationChange) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(data.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { y, x } = result[0];
          onLocationChange(parseFloat(y), parseFloat(x));
        }
      });
    }
    setIsModalOpen(false);
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
    if (onDetailAddressChange) {
      onDetailAddressChange(e.target.value);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setPostcodeKey(prevKey => prevKey + 1);
  };

  const closeModalOnBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="주소를 입력해주세요"
            value={address}
            readOnly
            className="flex-1 p-2 mr-2 border border-gray-300 rounded"
          />
          <SecondaryButton label="주소 검색" color="pink" size="large" onClick={openModal} />
        </div>
        <input
          type="text"
          placeholder="상세주소를 입력해주세요"
          value={detailAddress}
          onChange={handleDetailAddressChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center w-full max-w-lg h-full mx-auto bg-black bg-opacity-50 z-50"
          onClick={closeModalOnBackgroundClick}
        >
          <div className="relative bg-white rounded-lg p-5">
            <img
              src="//t1.daumcdn.net/postcode/resource/images/close.png"
              alt="닫기"
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
            <DaumPostcode key={postcodeKey} onComplete={handleComplete} />
          </div>
        </div>
      )}
    </>
  );
};
