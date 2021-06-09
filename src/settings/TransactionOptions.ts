import { IOption } from "../components/Select";

import MoneyBox from "../assets/images/svgs/MoneyBox";
import CardPayment from "../assets/images/svgs/CardPayment";
import ReceivDollar from "../assets/images/svgs/ReceivDollar";
import Donate from "../assets/images/svgs/Donate";

const TransactionOptions: IOption[] = [
  {
    icon: MoneyBox,
    description: "Entrada"
  },

  {
    icon: CardPayment,
    description: "Saída"
  },

  {
    icon: ReceivDollar,
    description: "A receber"
  },

  {
    icon: Donate,
    description: "Dívida"
  },
];

export default TransactionOptions;