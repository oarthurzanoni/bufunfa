import * as Localization from "expo-localization";
import { FormatNumberOptions, I18n } from "i18n-js";
import en from "./en.json";
import ptBR from "./pt-br.json";

// Set the key-value pairs for the different languages you want to support.
export const i18n = new I18n({
  en,
  "pt-BR": ptBR,
});

export const currencyOptions: Record<string, Partial<FormatNumberOptions>> = {
  en: {
    delimiter: ",",
    separator: ".",
    unit: "$",
  },
  "pt-BR": {
    delimiter: ".",
    separator: ",",
    unit: "R$",
  },
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;
