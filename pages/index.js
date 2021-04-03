import useSWR from "swr";
import { newsServices } from "../src/services/news/NewsService";
import NewsGrid from "../src/components/view/NewsGrid";
import WithLoading from "../src/components/view/WithLoading";
import WithNavbar from "../src/components/view/WithNavbar";
import WithTitle from "../src/components/view/WithTitle";
import styled from "styled-components";

const fetcher = (queryString) => newsServices.getTopNews(queryString).then(response => response.data);

const Container = styled.div`
    padding: 2vh 8vw;
`;

function MainContent({...props}) {
    return <Container><NewsGrid {...props} /></Container>;
}

export default function Home() {
    const { data, error } = useSWR(
        "?country=us",
        fetcher
    );

    const Homepage = WithTitle(WithNavbar(WithLoading(MainContent)));
    return (
        <Homepage 
            title={"newsgen"}
            error={error ? { message: "Cannot get news" } : null}
            loading={!data ? { message: "Getting news..." } : null}
            list={data ? data.articles : []} 
        />
    );
}