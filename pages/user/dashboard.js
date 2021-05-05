import { newsServices } from "../../src/services/news/NewsService";
import NewsGrid from "../../src/components/view/NewsGrid";
import { Loader } from "../../src/components/view/Loader";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
import { useEffect, useState } from "react";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { Button } from "react-bootstrap";
import loadActions from "../../src/redux/actions/loadAction";
import dashboardActions from "../../src/redux/actions/dashboardAction";
import UserPage from "../../src/components/view/UserPage";
import { useDispatch, useSelector } from "react-redux";
import WithLoading from "../../src/components/view/WithLoading";
import tw, { styled } from "twin.macro";

const Container = styled.div`
    margin: 25px 0;
`;
const DeleteIcon = tw(TrashFill)`
    cursor-pointer h-8
`;

function useModalProps() {
    const dispatch = useDispatch();

    const { errorMsgs, pending } = useSelector(state => state.loadReducer);
    const { favNews, newsToDelete } = useSelector(state => state.dashboardReducer);

    const modal = {
        show: newsToDelete ? true : false,
        onHide: () => {
            dispatch(dashboardActions.setNewsToDelete(null));
            dispatch(loadActions.success([]));
        }
    };

    const header = {
        children: "Delete this news?"
    };

    const body = {
        children: <>
                    Are you sure you want to delete this news?
                    {
                        pending &&
                            <Loader 
                                message={"Deleting news. Please wait."} 
                            />
                    }
                    {
                        errorMsgs.map(message => (
                            <ErrorMessage
                                message={message}
                            />
                        ))
                    }
                </>
    };

    const footer = {
        children: [
                {
                    props: {
                        variant: "primary",
                        onClick: () => dispatch(dashboardActions.setNewsToDelete(null))
                    },
                    children: "Cancel"
                },
                {
                    props: {
                        variant: "danger",
                        onClick: () => {
                            dispatch(loadActions.pending());
                            newsServices
                                .deleteFav(newsToDelete.id)
                                .then(() => {
                                    dispatch(dashboardActions.setAll({
                                        newsToDelete: null,
                                        favNews: favNews.filter((_, index) => index !== newsToDelete.index),
                                    }));
                                    dispatch(loadActions.success([]));
                                })
                                .catch(() => dispatch(loadActions.fail(["There was a problem deleting this news. Pleaes try again."])))
                        }
                    },
                    children: "Delete News"
                },
            ].map(button => (
                <Button {...button.props}>
                    {button.children}
                </Button>
            ))
    };

    return {
        modal,
        header,
        body,
        footer,
    };
}

function useNews() {
    const dispatch = useDispatch();
    const { favNews } = useSelector(state => state.dashboardReducer);
    const [news, setNews] = useState(null);

    useEffect(() => {
        if(!news)
            newsServices
                .getFavNews()
                .then(response => {
                    setNews(response.data);
                    dispatch(dashboardActions.updateFavNews(response.data));
                    dispatch(loadActions.success([]));
                });
    });

    return favNews 
        ? favNews.map((news, index) => {
                return {
                    ...news,
                    icon: <DeleteIcon 
                        onClick={() => dispatch(dashboardActions.setNewsToDelete({...news, index: index}))}
                    />
                };
            }) 
        : [];
}

export default function Dashboard() {
    const { favNews } = useSelector(state => state.dashboardReducer);

    const MainContent = ({ list }) => (
        <Container>
            <NewsGrid list={list} />
            <ConfirmationPrompt {...useModalProps()} />
        </Container>
    );

    const Page = UserPage(WithLoading(MainContent));
    return (
        <Page 
            title="Your favorite news" 
            error={null}
            loading={!favNews ? { message: "Loading favorite news..." } : null} 
            list={useNews()}
        />
    );
}