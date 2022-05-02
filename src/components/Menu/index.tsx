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
import { Question } from "@emotion-icons/fluentui-system-regular";
import { FC } from "react";

type MenuItemState = {
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
  menuItemList: Array<MenuItemState>;
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
  const blue = {
      "300-600": useColorModeValue("blue.300", "blue.600"),
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
            bgColor: blue["300-600"],
            shadow: "md",
          }}
          variant="ghost"
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
            bgColor: blue["300-600"],
            shadow: "md",
          }}
        />
      )}

      <MenuList
        {...menuListProps}
        rounded={12}
        bgColor={gray["50-900"]}
        shadow="md"
        border={0}
      >
        {menuItemList.map(({ text, onClick }: MenuItemState, id: number) => (
          <MenuItem
            key={id}
            onClick={onClick}
            rounded={12}
            _hover={{
              shadow: "md",
              bgColor: blue["300-600"],
            }}
            _focus={{
              bgColor: "none",
            }}
            {...menuItemProps}
          >
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
