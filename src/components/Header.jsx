"use client";
import Image from "next/image";
import MyButton from "./MyButton";
import IconHamburger from "/public/assets/shared/tablet/icon-hamburger.svg";
import LogoImg from "/public/assets/shared/desktop/logo.svg";
import IconCart from "/public/assets/shared/desktop/icon-cart.svg";
import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { navLinks } from "@/constants";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  const currentLocale = pathname.split('/')[1] || 'en';
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);

  const menuItems = [
    {
      text: t("headphones"),
      image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
      delay: "delay-0",
    },
    {
      text: t("speakers"),
      image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
      delay: "delay-500",
    },
    {
      text: t("earphones"),
      image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
      delay: "delay-1000",
    },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "uz", label: "O'zbekcha" },
    { value: "ru", label: "Русский" },
  ];

  const handleLanguageChange = (newLocale) => {
    setSelectedLanguage(newLocale);
    
    const currentPath = pathname;
    
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    
    const redirectPath = currentPath.startsWith(`/${currentLocale}`) 
      ? newPath 
      : `/${newLocale}${currentPath}`;

    router.push(redirectPath);
    
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  return (
    <header className="bg-black py-8">
      <div className="base-container flex justify-between items-center">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-block cursor-pointer hover:opacity-90 active:scale-90 transition-transform md:mr-10 xl:hidden"
        >
          <img src={IconHamburger.src} alt="" aria-hidden="true" />
        </button>

        <Link href="/">
          <img
            className="w-[143px] h-[25px] object-cover md:mr-auto"
            src={LogoImg.src}
            alt="Logo"
            width={143}
            height={25}
          />
        </Link>

        <nav className="hidden xl:block mx-auto">
          <ul className="flex">
            {navLinks.map(({ path, text }, index) => (
              <li key={index}>
                <Link
                  className={`${buttonVariants({
                    variant: "link",
                  })} text-white uppercase tracking-wide !font-bold`}
                  href={path}
                >
                  {t(text.toLowerCase())}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hover:opacity-80 transition-opacity">
            <img src={IconCart.src} alt="" aria-hidden="true" />
          </button>

          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[120px] bg-transparent border-gray-700 text-white hover:bg-gray-800 transition-colors">
              <SelectValue>
                {languages.find(lang => lang.value === selectedLanguage)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700">
              <SelectGroup>
                <SelectLabel className="text-white">Languages</SelectLabel>
                {languages.map((lang) => (
                  <SelectItem 
                    key={lang.value} 
                    value={lang.value}
                    className="text-white hover:bg-gray-800 cursor-pointer"
                  >
                    {lang.value === selectedLanguage && "✓ "}{lang.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div
          className={`bg-white absolute z-50 top-[89px] w-full left-0 right-0 transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          } xl:hidden`}
        >
          <div className="w-full shadow-sm">
            <ul className="flex flex-col gap-16 w-full pt-20 px-6 pb-10 md:flex-row">
              {menuItems.map(({ text, image, delay }, index) => (
                <li
                  className={`w-full relative ${delay} ${
                    open ? "animate-slide-top" : ""
                  }`}
                  key={index + text}
                >
                  <div className="flex flex-col items-center justify-end bg-gray rounded-[8px] min-h-[165px]">
                    <div className="flex flex-col items-center">
                      <h3 className="text-sm font-bold mb-2">{text}</h3>
                      <MyButton text={t("shop")} variant="link" />
                    </div>
                    <Image
                      className="w-[100px] h-[100px] object-cover -order-1 absolute top-0 -translate-y-1/3"
                      width={100}
                      height={100}
                      src={image}
                      alt={text}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}