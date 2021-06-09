import { IOption } from "../components/Select";

import Cloud from "../assets/images/svgs/Cloud";
import House from "../assets/images/svgs/House";
import Business from "../assets/images/svgs/Business";
import StreetFood from "../assets/images/svgs/StreetFood";
import PottedPlant from "../assets/images/svgs/PottedPlant";
import TakeAwayFood from "../assets/images/svgs/TakeAwayFood";
import OnlineStore from "../assets/images/svgs/OnlineStore";
import TShirt from "../assets/images/svgs/TShirt";
import Car from "../assets/images/svgs/Car";

const CategoryOptions: IOption[] = [
  {
    icon: Cloud,
    description: "Outros"
  },
  {
    icon: House,
    description: "Moradia"
  },
  {
    icon: Business,
    description: "Trabalho"
  },
  {
    icon: StreetFood,
    description: "Lanches"
  },
  {
    icon: PottedPlant,
    description: "Residência"
  },
  {
    icon: TakeAwayFood,
    description: "Comissão"
  },
  {
    icon: OnlineStore,
    description: "Supermercado"
  },
  {
    icon: TShirt,
    description: "Roupas"
  },
  {
    icon: Car,
    description: "Veículo"
  },
];

export default CategoryOptions;