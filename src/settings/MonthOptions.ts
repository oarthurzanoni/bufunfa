export interface IMonth {
  number: number;
  description: string;
  days: number;
}

const MonthOptions: IMonth[] = [
  {
    number: 1,
    description: "janeiro",
    days: 31,
  },
  {
    number: 2,
    description: "fevereiro",
    days: 28,
  },
  {
    number: 3,
    description: "março",
    days: 31,
  },
  {
    number: 4,
    description: "abril",
    days: 30,
  },
  {
    number: 5,
    description: "maio",
    days: 31,
  },
  {
    number: 6,
    description: "junho",
    days: 30,
  },
  {
    number: 7,
    description: "julho",
    days: 31,
  },
  {
    number: 8,
    description: "agosto",
    days: 31,
  },
  {
    number: 9,
    description: "setembro",
    days: 30,
  },
  {
    number: 10,
    description: "outubro",
    days: 31,
  },
  {
    number: 11,
    description: "novembro",
    days: 30,
  },
  {
    number: 12,
    description: "dezembro",
    days: 31,
  },
];

export default MonthOptions;