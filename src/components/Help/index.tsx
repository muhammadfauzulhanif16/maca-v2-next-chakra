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
} from "@chakra-ui/react";

export const Help: FC<{}> = () => {
  const cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    },
    gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
    };

  const { isOpen, onOpen, onClose } = useDisclosure(),
    { colorMode } = useColorMode();

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
        <ModalContent bgColor={gray["100-800"]} shadow="lg" rounded={16} m={4}>
          <ModalHeader
            px={8}
            py={6}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading>What am I?</Heading>
            <ModalCloseButton
              position="static"
              _focus={{
                shadow: "none",
              }}
            />
          </ModalHeader>

          <ModalBody
            py={0}
            px={6}
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
                  <ListItem>Change status and delete book.</ListItem>
                  <ListItem>Light or dark theme mode.</ListItem>
                  <ListItem>Responsive on any device.</ListItem>
                </OrderedList>
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter p={4} />
        </ModalContent>
      </Modal>
    </>
  );
};
