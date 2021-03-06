import useSWR from "swr";
import { newsServices } from "../src/services/news/NewsService";
import NewsGrid from "../src/components/view/NewsGrid";
import WithLoading from "../src/components/view/WithLoading";
import GuestPage from "../src/components/view/GuestPage";
import tw, { styled } from "twin.macro";

const fetcher = (queryString) => newsServices.getTopNews(queryString).then(response => response.data);

const Container = styled.div`
    padding: 0 4vw;
    ${tw`pt-28 pb-6`}
`;

export default function Home() {
    const { data, error } = useSWR(
        "?country=us",
        fetcher
    );

    const MainContent = ({...props}) => (
        <Container><NewsGrid {...props} /></Container>
    );
    const Homepage = GuestPage(WithLoading(MainContent));
    return (
        <Homepage 
            title={"newsgen"}
            error={error ? { message: "Cannot get news" } : null}
            loading={!data ? { message: "Getting news..." } : null}
            list={data ? data.articles : []} 
        />
    );
}