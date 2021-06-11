function getTheMonthName(month: number): string {
  switch(month) {
    case 1: return "janeiro";
    case 2: return "fevereiro";
    case 3: return "março";
    case 4: return "abril";
    case 5: return "maio";
    case 6: return "junho";
    case 7: return "julho";
    case 8: return "agosto";
    case 9: return "setembro";
    case 10: return "outubro";
    case 11: return "novembro";
    case 12: return "dezembro";
    default: return "mês";
  }
}

export function getCurrentDay(date: Date): string {
  return date.getDate().toString();
};

export function getCurrentMonth(date: Date): string {
  return getTheMonthName((date.getMonth() + 1));
};

export function getCurrentYear(date: Date): number {
  return date.getFullYear();
};

export default function formatDate(date: Date): string {
  const day: string = date.getDate().toString();
  const month: string = getTheMonthName((date.getMonth() + 1));

  return day + " de " + month;
};