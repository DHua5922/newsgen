import useSWR from "swr";
import { apiLink } from "../../src/constants";
import { newsServices } from "../../src/services/news/NewsService";
import styled from "styled-components";
import NewsGrid from "../../src/components/view/NewsGrid";
import { Loader } from "../../src/components/view/Loader";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import Sidenav from "../../src/components/view/Sidenav";

const fetcher = () => newsServices.getFavNews();

const Container = styled.div`padding: 32px 44px;`;

export default function Dashboard() {
    const { data, error } = useSWR(apiLink.favNews, fetcher);

    let componentToRender;
    if(error) {
        componentToRender = (
            <ErrorMessage message={["There was a problem loading your favorite news. Please try again."]} />);
    } else if(!data) {
        componentToRender = <Loader />;
    } else {
        componentToRender = (
        <Container>
            <NewsGrid list={data.data} />
        </Container>);
    }

    return (
        <>
            <Sidenav />
            {componentToRender}
        </>
    );
}