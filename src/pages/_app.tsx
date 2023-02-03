import { store } from "../app";
// import { Chakra } from "../Chakra";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "../../public/nprogress.css";
import { theme } from "../theme";
import {
  ChakraProvider,
} from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
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

  return (
    <Provider store={store}>
      <ChakraProvider  theme={theme}>
      {/*<Chakra cookies={pageProps.cookies}>*/}
      {/*  */}
      {/*</Chakra>*/}
      <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
