import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuProps,
  IconButton,
  ButtonProps,
  IconButtonProps,
  MenuButtonProps,
  MenuListProps,
  MenuItemProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";

type MenuItemState = {
  icon: any;
  text: string;
  onClick: any;
};

interface MacaMenuProps {
  menuProps?: MenuProps;
  as?: "button" | "iconButton" | undefined;
  buttonProps?: ButtonProps;
  iconButtonProps?: IconButtonProps;
  menuButtonProps?: MenuButtonProps;
  menuButtonText?: string;
  menuListProps?: MenuListProps;
  menuItemProps?: MenuItemProps;
  menuItemList: any;
}

export const MacaMenu: FC<MacaMenuProps> = ({
  menuProps,
  as,
  buttonProps,
  iconButtonProps,
  menuButtonProps,
  menuButtonText,
  menuListProps,
  menuItemProps,
  menuItemList,
}: MacaMenuProps) => {
  const cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    },
    gray = {
      "50-900": useColorModeValue("gray.50", "gray.900"),
    };

  return (
    <Menu {...menuProps}>
      {as === "button" ? (
        <MenuButton
          as={as === "button" ? Button : undefined}
          {...(as === "button" ? buttonProps : menuButtonProps)}
          _focus={{
            outline: "none",
          }}
          _active={{
            bgColor: "none",
          }}
          rounded={12}
          p={0}
          _hover={{
            bgColor: cyan["300-600"],
            shadow: "md",
          }}
        >
          {menuButtonText}
        </MenuButton>
      ) : (
        <MenuButton
          as={IconButton}
          {...iconButtonProps}
          _focus={{
            outline: "none",
          }}
          _active={{
            bgColor: "none",
          }}
          rounded={12}
          variant="ghost"
          _hover={{
            bgColor: cyan["300-600"],
            shadow: "md",
          }}
        />
      )}

      <MenuList
        {...menuListProps}
        rounded={16}
        bgColor={gray["50-900"]}
        outline="none"
        shadow="md"
      >
        {menuItemList.map(({ icon, text, onClick }: MenuItemState) => (
          <MenuItem
            _hover={{
              bgColor: "none",
              fontWeight: 500,
            }}
            icon={icon}
            onClick={onClick}
          >
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
