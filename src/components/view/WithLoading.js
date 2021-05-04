import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import tw, { styled } from "twin.macro";

const Center = tw.div`
    grid justify-center items-center h-full w-full
`;

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