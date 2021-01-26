import useSWR from "swr";
import { Loader } from "../src/components/view/Loader";
import { apiLink } from "../src/constants";
import { newsServices } from "../src/services/news/NewsService";
import { ErrorMessage } from "../src/components/view/ErrorMessage";
import NewsGrid from "../src/components/view/NewsGrid";
import MyNavbar from "../src/components/view/MyNavbar";
import styled from "styled-components";

const fetcher = (url) => newsServices.getTopNews(url).then(response => response.data);

const Container = styled.div`padding: 32px 44px;`;

export default function Home() {
  const { data, error } = useSWR(
    apiLink.topNews,
    fetcher);

  let componentToRender;
  if(error) {
    componentToRender = (
        <ErrorMessage message={error.response.data.message} />);
  } else if(!data) {
    componentToRender = <Loader />;
  } else {
    componentToRender = (
      <Container>
          <NewsGrid list={data.articles} />
      </Container>);
  }

  return (
    <>
      <MyNavbar />
      {componentToRender}
    </>
  );
}
