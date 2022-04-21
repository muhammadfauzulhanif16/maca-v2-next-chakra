import {
  GridItem,
  Heading,
  Text,
  Box,
  Badge,
  useColorModeValue,
  Spinner,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { IconButton } from "../IconButton";
import { ArrowClockwise } from "@emotion-icons/fluentui-system-regular";
import { Logo } from "../Logo";
import { Theme } from "../Theme";

interface PageHeaderProps {
  pageHeaderTitle: string;
  description: string;
  buttonText: string;
  buttonIcon: any;
  amount?: number;
  isLoading?: boolean;
  buttonType?: any;
}

export const PageHeader: FC<PageHeaderProps> = ({
  pageHeaderTitle,
  description,
  buttonText,
  buttonIcon,
  amount = 0,
  isLoading,
  buttonType,
}): JSX.Element => {
  const router = useRouter(),
    cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
      "200-800": useColorModeValue("cyan.200", "cyan.800"),
      "400-500": useColorModeValue("cyan.400", "cyan.500"),
    },
    gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
      "400-500": useColorModeValue("gray.400", "gray.500"),
    };

  return (
    <GridItem>
      <Box
        borderBottomWidth={2}
        borderBottomColor={gray["100-800"]}
        display={{
          base: "block",
          lg: "none",
        }}
      >
        <Flex mx={4} my={2} justifyContent="space-between">
          <Logo />

          <Heading color={cyan["400-500"]}>Maca</Heading>

          <Theme />
        </Flex>
      </Box>

      <Box
        display={{
          base: "grid",
          lg: "flex",
        }}
        justifyContent="space-between"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={4}
        mx={{
          base: 4,
          lg: 0,
        }}
        mt={{
          base: 4,
          lg: 0,
        }}
      >
        <Box>
          <Box pos="relative">
            <Heading fontWeight={500}>{pageHeaderTitle}</Heading>

            {pageHeaderTitle !== "Dashboard" ? (
              <Badge
                colorScheme="cyan"
                pos="absolute"
                top={0}
                right={0}
                fontSize={16}
                rounded={4}
              >
                {isLoading ? <Spinner size="xs" /> : amount}
              </Badge>
            ) : null}
          </Box>

          <Text color={gray["400-500"]}>{description}</Text>
        </Box>

        <Box display="flex" justifyContent="end">
          <IconButton
            as={buttonIcon}
            isLoading={isLoading}
            text={buttonText}
            buttonProps={{
              type: buttonType,
              disabled: isLoading,
              bgColor: cyan["300-600"],
              _hover: {
                bgColor: cyan["200-800"],
              },
              w: {
                base: "max",
                lg: 40,
              },
              onClick: () =>
                router.push(
                  buttonText === "Add" ? `/${buttonText.toLowerCase()}` : ""
                ),
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
              label: buttonText,
              children: null,
            }}
          />
        </Box>
      </Box>
    </GridItem>
  );
};
