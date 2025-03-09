export interface Option {
    optionName: string; 
    choices: string[]; 
}
export const options: Option[] = [
    {
      optionName: '티셔츠 사이즈',
      choices: ['XS', 'S', 'M', 'L', 'XL'],
    },
  ];

export interface responsesData {
    id: string;
    name: string;
    email: string;
    phone: string;
    grade: string;
    num: string;
    selectedOptions: { [key: string]: string };
}

export const responsesInfo: responsesData[] = [
    {
        id: '1',
        name: '고에진',
        email: 'qwe@naver.com',
        phone: '000-1234-5678',
        grade: '1',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "S",
        },
    },
    {
        id: '2',
        name: '조히은',
        email: 'asd@naver.com',
        phone: '000-1212-3232',
        grade: '2',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "M",
        },
    },
    {
        id: '3',
        name: '한승철',
        email: 'qaz@naver.com',
        phone: '000-3456-1234',
        grade: '2',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "L",
        },
    },
    {
        id: '4',
        name: '민정준',
        email: 'poi@naver.com',
        phone: '000-1345-2346',
        grade: '2',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "L",
        },
    },
    {
        id: '5',
        name: '고에진',
        email: 'ghj@naver.com',
        phone: '000-1234-5678',
        grade: '4',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "L",
        },
    },
    {
        id: '6',
        name: '조히은',
        email: 'jhe@naver.com',
        phone: '000-1212-3232',
        grade: '3',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "L",
        },
    },
    {
        id: '7',
        name: '한승철',
        email: 'hsc@naver.com',
        phone: '000-3456-1234',
        grade: '1',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "L",
        },
    },
    {
        id: '8',
        name: '민정준',
        email: 'mjj@naver.com',
        phone: '000-1345-2346',
        grade: '3',
        num: '20211234',
        selectedOptions: {
            "티셔츠 사이즈": "L",
        },
    },
];
