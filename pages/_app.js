import "../styles/globals.css";
import "../src/services/interceptor";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { styles } from "../styles/globals";

const Page = styled.div`${styles.fullWidth}`;

function MyApp({ Component, pageProps }) {
    return <Page><Component {...pageProps} /></Page>;
}

export default MyApp
