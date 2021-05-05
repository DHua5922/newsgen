import MyNavbar from "./MyNavbar";
import Title from "./Title";

function GuestPage(Component) {
    return function GuestPageComponent({ title, ...props }) {
        return (
            <>
                <Title title={title} />
                <MyNavbar />
                <Component {...props} />
            </>
        );
    }
}

export default GuestPage;