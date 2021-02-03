import useSWR from "swr";
import { Loader } from "../../src/components/view/Loader";
import { apiLink } from "../../src/constants";
import { newsServices } from "../../src/services/news/NewsService";
import NewsGrid from "../../src/components/view/NewsGrid";
import styled from "styled-components";
import Sidenav from "../../src/components/view/Sidenav";
import { useState } from "react";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import { Star } from "@styled-icons/boxicons-regular/Star";
import { styles } from "../../styles/globals";

const fetcher = (url) => newsServices.getTopNews(url).then(response => response.data);

const Container = styled.div`
    padding: 32px 44px;
    margin-left: 50px;
`;
const Center = styled.div`${styles.center}`;
const FavIcon = styled(Star)`${styles.newsIcon}`;

export default function NewsPage() {
    const { data, error } = useSWR(
        apiLink.topNews,
        fetcher
    );
    const [markError, setMarkError] = useState(null);

    let componentToRender;
    if(error) {
        componentToRender = (
            <Center>
                <ErrorMessage
                    message={"Cannot load news"} 
                />
            </Center>
        );
    } else if(!data) {
        componentToRender = (
            <Center>
                <Loader 
                    message={"Loading news..."} 
                />
            </Center>
        );
    } else {
        const newsList = data.articles.map(news => {
            return {
                ...news, 
                icon: <FavIcon
                            onClick={() => newsServices.markFav(news)
                                .then(() => setMarkError(null))
                                .catch(error => setMarkError(error.response))}
                        />
            };
        });

        const modal = {
            show: markError ? true : false,
            onHide: () => setMarkError(null)
        };

        const header = {
            children: "Cannot Mark News"
        };

        const body = {
            children: "There was a problem marking this news. Please try again."
        };

        componentToRender = (
            <Container>
                <NewsGrid list={newsList} />
                <ConfirmationPrompt 
                    modal={modal}
                    header={header}
                    body={body}
                />
            </Container>
        );
    }

    return (
        <>
            <Sidenav />
            {componentToRender}
        </>
    );
}