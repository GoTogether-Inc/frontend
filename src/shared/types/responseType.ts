export interface Option {
  optionName: string;
  choices: string[];
}

export interface responsesData {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  num: string;
  selectedOptions: { [key: string]: string };
}
