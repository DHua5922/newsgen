import "../styles/globals.css";
import 'tailwindcss/tailwind.css';
import "../src/services/interceptor";
import "bootstrap/dist/css/bootstrap.css";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import GlobalStyles from "../src/components/GlobalStyles";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Component {...pageProps} />
            </>
        </Provider>
    );
}

export default MyApp
