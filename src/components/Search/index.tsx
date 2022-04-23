import {
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  useColorMode,
  Input,
} from "@chakra-ui/react";
import { useState, FC, useRef, MutableRefObject } from "react";
import { IconButton } from "../IconButton";
import { Search as SearchIcon } from "@emotion-icons/fluentui-system-regular";

interface SearchProps {
  shelfSearch?: any;
  setShelfSearch?: any;
}

export const Search: FC<SearchProps> = ({
  shelfSearch,
  setShelfSearch,
}: SearchProps) => {
  const cyan = {
    "300-600": useColorModeValue("cyan.300", "cyan.600"),
    "200-800": useColorModeValue("cyan.200", "cyan.800"),
    "400-500": useColorModeValue("cyan.400", "cyan.500"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure(),
    { colorMode } = useColorMode();

  const handleSearch = ({ target: { value } }: any) => {
    setShelfSearch(value);
  };

  const initialRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <>
      <IconButton
        as={SearchIcon}
        // isLoading={isLoading}
        text="Search"
        buttonProps={{
          // type: buttonType,
          // disabled: isLoading,
          bgColor: cyan["300-600"],
          _hover: {
            bgColor: cyan["200-800"],
          },
          w: {
            base: "max",
            lg: 40,
          },
          onClick: onOpen,
        }}
        textProps={{
          display: {
            base: "none",
            lg: "block",
          },
          ml: 4,
        }}
        iconProps={{
          w: 6,
          h: 6,
        }}
        tooltipProps={{
          display: {
            base: "block",
            lg: "none",
          },
          label: "Search",
          children: null,
        }}
      />

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />

        <ModalContent rounded={8} m={4}>
          <ModalBody p={2} display="flex">
            <IconButton
              as={SearchIcon}
              iconProps={{
                color: cyan["400-500"],
                w: 6,
                h: 6,
              }}
              buttonProps={{
                p: 0,
                variant: "none",
                mr: 2,
                cursor: "default",
              }}
            />

            <Input
              id="email"
              type="email"
              placeholder="Search book"
              variant="unstyled"
              p={0}
              onInput={handleSearch}
              value={shelfSearch}
              ref={initialRef}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
