import MyNavbar from "./MyNavbar";
import tw from "tailwind-styled-components";

const FullPage = tw.div`
    pt-20
    w-full
    h-full
`;

function WithNavbar(Component) {
    return function WithNavbarComponent({ ...props }) {
        return (
            <>
                <MyNavbar />
                <FullPage>
                    <Component {...props} />
                </FullPage>
            </>
        );
    }
}

export default WithNavbar;