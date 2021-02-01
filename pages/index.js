import useSWR from "swr";
import { Loader } from "../src/components/view/Loader";
import { apiLink } from "../src/constants";
import { newsServices } from "../src/services/news/NewsService";
import { ErrorMessage } from "../src/components/view/ErrorMessage";
import NewsGrid from "../src/components/view/NewsGrid";
import MyNavbar from "../src/components/view/MyNavbar";
import Title from "../src/components/view/Title";
import styled from "styled-components";
import { styles } from "../styles/globals";

const fetcher = (url) => newsServices.getTopNews(url).then(response => response.data);

const Center = styled.div`${styles.center}`;
const Container = styled.div`
    padding: 0px 50px; 
    padding-top: 110px;
    padding-bottom: 25px;
`;

export default function Home() {
    const { data, error } = useSWR(
        apiLink.topNews,
        fetcher
    );

    let componentToRender;
    if(error) {
        componentToRender = (
            <Center>
                <ErrorMessage message={"Cannot get news"} />
            </Center>
        );
    } else if(!data) {
        componentToRender = (
            <Center>
                <Loader message={"Getting news..."} />
            </Center>
        );
    } else {
        componentToRender = (
            <Container>
                <NewsGrid list={data.articles} />
            </Container>
        );
    }

    return (
        <>
            <Title title={"newsgen"} />
            <MyNavbar />
            {componentToRender}
        </>
    );
}
