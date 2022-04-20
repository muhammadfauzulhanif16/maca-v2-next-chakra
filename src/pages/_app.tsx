import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app";
import { Chakra } from "../Chakra";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </Provider>
  );
};

export default MyApp;
