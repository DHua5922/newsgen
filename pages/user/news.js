import useSWR from "swr";
import { newsServices } from "../../src/services/news/NewsService";
import NewsGrid from "../../src/components/view/NewsGrid";
import styled from "styled-components";
import { useState } from "react";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { Star } from "@styled-icons/boxicons-regular/Star";
import WithSidenav from "../../src/components/view/WithSidenav";
import WithTitle from "../../src/components/view/WithTitle";
import WithLoading from "../../src/components/view/WithLoading";
import tw from "tailwind-styled-components";

const fetcher = (queryString) => newsServices.getTopNews(queryString).then(response => response.data);

const Container = styled.div`
    padding: 3vh 4vw;
    margin-left: 80px;
`;
const FavIcon = tw(Star)`
    cursor-pointer
    h-8
`;

function MainContent({ list }) {
    const [markError, setMarkError] = useState(null);

    const newsList = list.map(news => {
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

    return (
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

export default function NewsPage() {
    const { data, error } = useSWR(
        "?country=us",
        fetcher
    );

    const Page = WithTitle(WithSidenav(WithLoading(MainContent)));
    return (
        <Page 
            title={"News"}
            error={error ? { message: "Cannot get news" } : null}
            loading={!data ? { message: "Getting news..." } : null}
            list={data ? data.articles : []} 
        />
    );
}