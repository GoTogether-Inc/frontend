import React from 'react';
import DashboardLayout from '../../../shared/ui/backgrounds/DashboardLayout';
import DefaultTextField from '../../../../design-system/ui/textFields/DefaultTextField';
import MultilineTextField from '../../../../design-system/ui/textFields/MultilineTextField';
import Button from '../../../../design-system/ui/Button';
import TimePicker from '../../../features/event-manage/ui/TimePicker';

const EmailPage = () => {
  return (
    <DashboardLayout centerContent="WOOACON 2024">
      <div className="p-5 flex flex-col gap-10 min-h-full">
        <div className="w-full text-center font-bold text-xl">이벤트 예약 발송</div>

        {/* 수신자와 제목 입력하는 부분 */}
        <div>
          <div className="text-xs flex flex-row gap-2 text-gray-700 w-full justify-end">
            <button className="hover:text-main">전체 이메일 보내기</button>|
            <button className="hover:text-main">티켓별 이메일 보내기</button>
          </div>
          <DefaultTextField className="h-12" leftText="받는 사람" />
          <DefaultTextField className="h-12" leftText="제목" />
        </div>

        {/* 이메일 내용 작성 부분 */}
        <MultilineTextField
          label="추가 발송될 이메일 내용"
          detail="추가 발송될 이메일 본문 내용입니다."
          className="h-80 mb-10"
        />

        {/*시간 선택 컴포넌트*/}
        <TimePicker />

        <div className="flex-grow"></div>

        <Button label="보내기" onClick={() => console.log('post 요청')} className="w-full h-12 rounded-full" />
      </div>
    </DashboardLayout>
  );
};

export default EmailPage;
