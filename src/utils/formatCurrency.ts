export default function formatCurrency(value: number) {
  return "R$ " + String(Number(value / 100).toFixed(2).toString().replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
}