import TertiaryButton from '../../../design-system/ui/buttons/TertiaryButton';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full max-w-lg z-50 flex items-center justify-center mx-auto bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-base md:text-lg font-semibold text-black mb-3">이벤트를 삭제하시겠습니까?</h2>
        <p className="text-sm text-gray-600 mb-8">
          이 작업은 되돌릴 수 없습니다.
          <br /> 이벤트와 관련된 모든 데이터가 영구적으로 삭제됩니다.
        </p>
        <div className="flex justify-end gap-4">
          <TertiaryButton label="취소" type="button" color="black" size="medium" onClick={onClose} />
          <TertiaryButton label="삭제" type="button" color="pink" size="medium" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
