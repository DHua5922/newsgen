import MyNavbar from "./MyNavbar";

function WithNavbar(Component) {
    return function WithNavbarComponent({ ...props }) {
        return (
            <>
                <MyNavbar />
                <Component {...props} />
            </>
        );
    }
}

export default WithNavbar;