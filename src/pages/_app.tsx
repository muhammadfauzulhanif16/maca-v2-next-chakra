import { store } from "../app";
import { Chakra } from "../Chakra";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import NProgress from "nprogress";
import "../../public/nprogress.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: any) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    },
    gray = {
      "50-900": useColorModeValue("gray.50", "gray.900"),
    };

  return (
    <Provider store={store}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </Provider>
  );
};

export default MyApp;
