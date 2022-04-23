import { FC } from "react";
import { IconButton } from "../IconButton";
import { Question } from "@emotion-icons/fluentui-system-regular";
import {
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
  Text,
  ModalOverlay,
  ListIcon,
  List,
  Code,
} from "@chakra-ui/react";
import { Github } from "@emotion-icons/boxicons-logos";
import { useRouter } from "next/router";

export const Help: FC<{}> = () => {
  const cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    },
    gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
    };

  const { isOpen, onOpen, onClose } = useDisclosure(),
    { colorMode } = useColorMode();

  const router = useRouter();

  return (
    <>
      <IconButton
        as={Question}
        iconProps={{
          w: 6,
          h: 6,
        }}
        buttonProps={{
          variant: "none",
          _hover: {
            bgColor: cyan["300-600"],
          },
          p: 0,
          onClick: onOpen,
        }}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent
          bgColor={gray["100-800"]}
          shadow="none"
          rounded={16}
          m={4}
          userSelect="none"
        >
          <ModalHeader
            p={8}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading fontWeight={500} lineHeight={0}>
              What am I?
            </Heading>
            <ModalCloseButton
              position="static"
              _focus={{
                shadow: "none",
              }}
            />
          </ModalHeader>

          <ModalBody
            py={0}
            px={8}
            css={{
              "&::-webkit-scrollbar": {
                width: ".5rem",
                height: ".5rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colorMode === "light" ? "#76E4F7" : "#00A3C4",
                borderRadius: "1rem",
              },
            }}
          >
            <UnorderedList>
              <ListItem>
                <Text display="inline" fontWeight="700">
                  Maca
                </Text>{" "}
                is a website application to keep a list of books are being read
                or have been read, and taken from the Sundanese language which
                means {`"\Read\"`}.
              </ListItem>
              <ListItem>
                The technology used is Next JS, Chakra UI, Formik, RTK Query.
              </ListItem>
              <ListItem>
                Features :
                <OrderedList>
                  <ListItem>
                    Add books to the bookshelf are being read or have been read
                    with details of title, author and published.
                  </ListItem>
                  <ListItem>
                    See all important overview of book activity.
                  </ListItem>
                  <ListItem>
                    See a list of books are being read or have been read on the
                    bookshelf.
                  </ListItem>
                  <ListItem>Search for book by title or author.</ListItem>
                  <ListItem>Change status and delete book.</ListItem>
                  <ListItem>Light or dark theme mode.</ListItem>
                  <ListItem>Responsive on any device.</ListItem>
                </OrderedList>
              </ListItem>
              <ListItem>
                Follow in tounch me :
                <List>
                  <ListItem
                    textDecor="underline"
                    onClick={() =>
                      router.push("https://github.com/muhammadfauzulhanif16")
                    }
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <ListIcon as={Github} />
                    @muhammadfauzulhanif16
                  </ListItem>
                </List>
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter p={4} justifyContent="center">
            <Code
              children="version 2.1"
              colorScheme="cyan"
              rounded={6}
              px={2}
              py={0.5}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
