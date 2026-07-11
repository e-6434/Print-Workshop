import {
  CreditCardIcon,
 NewspaperIcon,
  UsersIcon,
  ChartBarIcon,
  FolderMinusIcon,
  AdjustmentsHorizontalIcon,
  AcademicCapIcon
} from "@heroicons/react/24/solid";
 



export const statisticsCardsData = [
      {
    color: "gray",
    icon: CreditCardIcon,
    title: "اعلام وضعیت",
    value: " مرخصی",
     link: "./damain",
    footer: {
      color: "text-red-500",
      value: "پشتیبانی : ",
      label: "   مراجعه حضوری",
    },
  },
    {
    color: "gray",
    icon: NewspaperIcon,
    title: "سامانه",
    value: " متمرکز فاوا",
    link: "http://132.168.250.85:3000/",
    footer: {
      color: "text-green-500",
      value: "پشتیبانی : ",
      label: "مرکز خدمات رایانه",
    },
  },


];

export default statisticsCardsData;
