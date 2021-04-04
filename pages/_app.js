import "../styles/globals.css";
import "../src/services/interceptor";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "../src/redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp
