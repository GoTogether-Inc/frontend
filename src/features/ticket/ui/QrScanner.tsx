import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useTicketQrCodeValidate } from "../hooks/useOrderHook";

const QrScannerComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const qrScannerRef = useRef<QrScanner | null>(null);

    const { mutate: validateQr } = useTicketQrCodeValidate();

    useEffect(() => {
        if (!videoRef.current) return;

        const scanner = new QrScanner(
            videoRef.current,
            (decoded) => {
                const data = decoded.data;
                setScanResult(data);
                setIsScanning(false);
                scanner.stop();
                checkInApiCall(data);
            },
            {
                onDecodeError: (err) => {
                    console.warn("QR decode error:", err);
                },
                highlightScanRegion: true,
                maxScansPerSecond: 5,
            }
        );

        qrScannerRef.current = scanner;

        return () => {
            scanner.destroy();
            qrScannerRef.current = null;
        };
    }, []);

    const handleStartScan = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            qrScannerRef.current?.start();
            setIsScanning(true);
            setScanResult(null);
        } catch (e) {
            alert(
                "카메라 접근이 차단되어 있어 스캔할 수 없습니다.\n시스템 설정 또는 브라우저 설정에서 권한을 허용해 주세요."
            );
        }
    };

    const checkInApiCall = async (qrData: string) => {
        try {
            const params = new URLSearchParams(qrData.replace(/-/g, '='));
            const orderIdStr = params.get('orderId');
            const sig = params.get('sig');
            const orderId = orderIdStr ? parseInt(orderIdStr, 10) : NaN;

            if (!isNaN(orderId) && sig) {
                validateQr({ orderId, sig });
            } else {
                alert("QR 코드 데이터 형식이 올바르지 않습니다.");
            }
        } catch {
            alert("QR 코드 데이터를 파싱할 수 없습니다.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">QR 코드 스캔</h2>
            <video
                ref={videoRef}
                className="border rounded w-full max-w-md"
                style={{ aspectRatio: "4 / 3" }}
            />
            {!isScanning && (
                <button
                    onClick={handleStartScan}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    스캔 시작
                </button>
            )}
            {scanResult && (
                <p className="mt-4 text-green-700 font-semibold">
                    스캔 완료
                </p>
            )}
        </div>
    );
};
export default QrScannerComponent;
