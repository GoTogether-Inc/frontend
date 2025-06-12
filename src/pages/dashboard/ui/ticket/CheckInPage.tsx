import QrScannerComponent from "../../../../features/ticket/ui/QrScanner";
import DashboardLayout from "../../../../shared/ui/backgrounds/DashboardLayout";

const CheckInPage = () => {
  return (
    <DashboardLayout centerContent="DASHBOARD">
      <div className='flex flex-col gap-2 mt-8 px-7'>
        <h1 className="w-full text-center font-bold text-xl">QR 코드 스캔</h1>
        <div className="max-w-screen-md mx-auto">
          <QrScannerComponent />
        </div>
      </div>
    </DashboardLayout>

  );
};

export default CheckInPage;