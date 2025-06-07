import QrScannerComponent from "../../../../features/ticket/ui/QrScanner";

const CheckInPage = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">체크인 스캐너</h1>
      <QrScannerComponent />
    </div>
  );
};

export default CheckInPage;