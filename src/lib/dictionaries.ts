import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  am: () => import("@/dictionaries/am.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "am") => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
