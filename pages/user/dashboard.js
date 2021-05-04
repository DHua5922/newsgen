import { newsServices } from "../../src/services/news/NewsService";
import styled from "styled-components";
import NewsGrid from "../../src/components/view/NewsGrid";
import { Loader } from "../../src/components/view/Loader";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import Sidenav from "../../src/components/view/Sidenav";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
import { styles } from "../../styles/globals";
import { useReducer, useEffect } from "react";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { Button } from "react-bootstrap";
import loadReducer, { initialLoadState } from "../../src/redux/reducers/loadReducer";
import loadActions from "../../src/redux/actions/loadAction";
import dashboardReducer, { initialDashboardState } from "../../src/redux/reducers/dashboardReducer";
import dashboardActions from "../../src/redux/actions/dashboardAction";
import UserPage from "../../src/components/view/UserPage";

const Container = styled.div`
    padding: 32px 44px;
    margin-left: 60px;
`;
const Center = styled.div`${styles.center}`;
const DeleteIcon = styled(TrashFill)`${styles.newsIcon}`;

const header = {
    children: "Delete this news?"
};

export default function Dashboard() {
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);
    const [dashboardState, dispatchDashboardState] = useReducer(dashboardReducer, initialDashboardState);

    const { favNews, newsToDelete } = dashboardState;

    useEffect(() => {
        if(!favNews)
            newsServices
                .getFavNews()
                .then(response => dispatchDashboardState(dashboardActions.updateFavNews(response.data)));
    });

    let componentToRender;
    if(!favNews) {
        componentToRender = () => <Center><Loader message={"Loading favorite news..."} /></Center>;
    } else {
        const { errorMsgs, pending } = loadState;

        const list = favNews.map((news, index) => {
            return {
                ...news,
                icon: <DeleteIcon 
                    onClick={() => dispatchDashboardState(dashboardActions.setNewsToDelete({...news, index: index}))}
                />
            };
        });

        const modal = {
            show: newsToDelete ? true : false,
            onHide: () => {
                dispatchDashboardState(dashboardActions.setNewsToDelete(null));
                dispatchLoadState(loadActions.success([]));
            }
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
                            onClick: () => dispatchDashboardState(dashboardActions.setNewsToDelete(null))
                        },
                        children: "Cancel"
                    },
                    {
                        props: {
                            variant: "danger",
                            onClick: () => {
                                dispatchLoadState(loadActions.pending());
                                newsServices
                                    .deleteFav(newsToDelete.id)
                                    .then(() => {
                                        dispatchDashboardState(dashboardActions.setAll({
                                            newsToDelete: null,
                                            favNews: favNews.filter((_, index) => index !== newsToDelete.index),
                                        }));
                                        dispatchLoadState(loadActions.success([]));
                                    })
                                    .catch(() => dispatchLoadState(loadActions.fail(["There was a problem deleting this news. Pleaes try again."])))
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

        componentToRender = () => (
            <Container>
                <NewsGrid list={list} />
                <ConfirmationPrompt 
                    modal={modal}
                    header={header}
                    body={body}
                    footer={footer}
                />
            </Container>
        );
    }

    const Page = UserPage(componentToRender);
    return <Page title="Your favorite news" />;
}