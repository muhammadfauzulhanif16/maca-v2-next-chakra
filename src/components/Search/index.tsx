import {
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import { FC, useRef, MutableRefObject } from "react";
import { IconButton } from "../IconButton";
import { Dismiss, BookSearch } from "@emotion-icons/fluentui-system-regular";

interface SearchProps {
  isLoading?: boolean;
  shelfSearch?: any;
  setShelfSearch?: any;
}

export const Search: FC<SearchProps> = ({
  isLoading,
  shelfSearch,
  setShelfSearch,
}: SearchProps) => {
  const cyan = {
    "300-600": useColorModeValue("cyan.300", "cyan.600"),
    "200-800": useColorModeValue("cyan.200", "cyan.800"),
  };

  const gray = {
    "50-900": useColorModeValue("gray.50", "gray.900"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = ({ target: { value } }: any) => {
    setShelfSearch(value);
  };

  const initialRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <>
      <IconButton
        as={BookSearch}
        isLoading={isLoading}
        text="Search"
        buttonProps={{
          shadow: "md",
          disabled: isLoading,
          bgColor: cyan["300-600"],
          _hover: {
            bgColor: isLoading ? "" : cyan["200-800"],
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

        <ModalContent rounded={12} m={4} shadow="md" bgColor={gray["50-900"]}>
          <ModalBody p={2} display="flex">
            <IconButton
              as={BookSearch}
              iconProps={{
                color: cyan["300-600"],
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
              placeholder="Search book by title or author"
              variant="unstyled"
              p={0}
              onInput={handleSearch}
              value={shelfSearch}
              ref={initialRef}
            />

            {shelfSearch.length > 0 && (
              <IconButton
                as={Dismiss}
                iconProps={{
                  color: cyan["300-600"],
                  w: 6,
                  h: 6,
                }}
                buttonProps={{
                  p: 0,
                  variant: "none",
                  ml: 2,
                  onClick: () => setShelfSearch(""),
                }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
