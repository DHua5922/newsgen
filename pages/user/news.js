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

const fetcher = (url) => newsServices.getTopNews(url).then(response => response.data);

const Container = styled.div`padding: 32px 44px;`;

export default function NewsPage() {
    const { data, error } = useSWR(
        apiLink.topNews,
        fetcher
    );
    const [markError, setMarkError] = useState(null);

    let componentToRender;
    if(error) {
        componentToRender = (
            <ErrorMessage
                message={"Cannot load news"} 
            />
        );
    } else if(!data) {
        componentToRender = <Loader />;
    } else {
        componentToRender = (
        <Container>
            <NewsGrid 
                list={data.articles.map(news => {
                    return {
                        ...news, 
                        fav: {
                            canShow: true,
                            onClick: () => newsServices.markFav(news)
                                            .then(() => setMarkError(null))
                                            .catch(error => setMarkError(error.response))
                        }
                    };
                })} 
            />
            <ConfirmationPrompt 
                modal={{
                    show: markError ? true : false,
                    onHide: () => setMarkError(null)
                }}
                header={{
                    children: "Cannot Mark News"
                }}
                body={{
                    children: "There was a problem marking this news. Please try again."
                }}
                footer={{}}
            />
        </Container>);
    }

    return (
        <>
            <Sidenav />
            {componentToRender}
        </>
    );
}