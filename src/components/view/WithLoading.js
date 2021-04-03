import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import styled from "styled-components";
import { styles } from "../../../styles/globals";

const Center = styled.div`${styles.center}`;

function WithLoading(Component) {
    return function WithLoadingComponent({ error, loading, ...props }) {
        if(error) {
            return (
                <Center>
                    <ErrorMessage message={error.message} />
                </Center>
            );
        }
        else if(loading) {
            return (
                <Center>
                    <Loader message={loading.message} />
                </Center>
            );
        }
        return <Component {...props} />;
    }
}

export default WithLoading;