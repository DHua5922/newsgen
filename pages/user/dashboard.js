import { newsServices } from "../../src/services/news/NewsService";
import styled from "styled-components";
import NewsGrid from "../../src/components/view/NewsGrid";
import { Loader } from "../../src/components/view/Loader";
import { ErrorMessage } from "../../src/components/view/ErrorMessage";
import Sidenav from "../../src/components/view/Sidenav";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
import { styles } from "../../styles/globals";
import { useState, useReducer, useEffect } from "react";
import ConfirmationPrompt from "../../src/components/view/ConfirmationPrompt";
import { Button } from "react-bootstrap";
import loadReducer, { initialLoadState } from "../../src/redux/reducers/loadReducer";
import loadActions from "../../src/redux/actions/loadAction";

const Container = styled.div`padding: 32px 44px;`;
const DeleteIcon = styled(TrashFill)`${styles.newsIcon}`;

export default function Dashboard() {
    const [loadState, dispatchLoadState] = useReducer(loadReducer, initialLoadState);
    const [newsToDelete, setNewsToDelete] = useState(null);
    const [favNews, setFavNews] = useState(null);

    useEffect(() => {
        if(!favNews)
            newsServices
                .getFavNews()
                .then(response => setFavNews(response.data));
    });

    let componentToRender;
    if(!favNews) {
        componentToRender = <Loader />;
    } else {
        const { errorMsgs, pending } = loadState;

        const newsData = favNews.map((news, index) => {
            return {
                ...news,
                icon: <DeleteIcon 
                    onClick={() => setNewsToDelete({...news, index: index})}
                />
            };
        });

        const promptButtons = [
            {
                props: {
                    variant: "primary",
                    onClick: () => setNewsToDelete(null)
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
                                setFavNews(favNews.filter((news, index) => index !== newsToDelete.index));
                                setNewsToDelete(null);
                                dispatchLoadState(loadActions.success([]));
                            })
                            .catch(() => dispatchLoadState(loadActions.fail(["There was a problem deleting this news. Pleaes try again."])))
                    }
                },
                children: "Delete News"
            },
        ];

        componentToRender = (
            <Container>
                <NewsGrid list={newsData} />
                <ConfirmationPrompt 
                    modal={{
                        show: newsToDelete ? true : false,
                        onHide: () => {
                            setNewsToDelete(null);
                            dispatchLoadState(loadActions.success([]));
                        }
                    }}
                    header={{
                        children: "Delete this news?"
                    }}
                    body={{
                        children: <>
                            Are you sure you want to delete this news?
                            {
                                pending &&
                                    <Loader 
                                        message={"Deleting news. Please wait."} 
                                    />
                            }
                            {
                                errorMsgs.map(message =>
                                    <ErrorMessage
                                        message={message}
                                    />) 
                            }
                        </>
                    }}
                    footer={{
                        children: promptButtons.map(button => 
                                        <Button {...button.props}>
                                            {button.children}
                                        </Button>)
                    }}
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