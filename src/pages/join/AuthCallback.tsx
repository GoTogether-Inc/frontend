import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../app/provider/authStore";
import { useEffect } from "react";
import { useUserInfo } from "../../features/join/hooks/useUserHook";

const AuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status'); // 'new' or 'existing'
    const { login, setName, closeModal,isModalOpen } = useAuthStore();
    const { data } = useUserInfo();

    useEffect(() => {
        const handleAuth = async () => {
            try {
                login();
                closeModal();
                if (status === 'new') {
                    navigate('/join/agreement');
                } else {
                    setName(data?.name || "바보");
                    console.log(isModalOpen);
                    navigate('/');
                }
            } catch (error) {
                console.error('인증 처리 실패', error);
                navigate('/');
            }
        };
        handleAuth();
    }, []);

    return <div className="text-center mt-32 text-lg font-bold">로그인 중입니다...</div>;
};

export default AuthCallback;


