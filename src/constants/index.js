import { getTranslations } from "next-intl/server";

const t = getTranslations;
export const navLinks = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Headphones",
    path: "/categories/headphones",
  },
  {
    text: "Speakers",
    path: "/categories/speakers",
  },
  {
    text: "Earphones",
    path: "/categories/earphones",
  },
];
