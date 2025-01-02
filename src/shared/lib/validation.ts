export const validations = {
  name: {
    required: '이름을 입력해 주세요.',
    minLength: {
      value: 2,
      message: '이름은 최소 두 글자 이상이어야 합니다.',
    },
  },
  phone: {
    required: '연락처를 입력해 주세요.',
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: '연락처는 10~11자리 숫자여야 합니다.',
    },
  },
  email: {
    required: '이메일을 입력해 주세요.',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '올바른 이메일 형식이어야 합니다.',
    },
  },
};
