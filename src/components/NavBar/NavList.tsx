import {
  Home,
  BookAdd,
  BookOpen,
  Book,
} from "@emotion-icons/fluentui-system-regular";

export type NavListState = {
  icon: any;
  title: string;
};

export const NavList: Array<NavListState> = [
  {
    icon: Home,
    title: "Dashboard",
  },
  {
    icon: BookAdd,
    title: "Add",
  },
  {
    icon: BookOpen,
    title: "Reading",
  },
  {
    icon: Book,
    title: "Finished",
  },
];
