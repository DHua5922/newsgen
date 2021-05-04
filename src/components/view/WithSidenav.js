import Sidenav from "./Sidenav";

function WithSidenav(Component) {
    return function WithSidenavComponent({ sidenav, ...props }) {
        return (
            <>
                <Sidenav {...sidenav} />
                <Component {...props} />
            </>
        );
    }
}

export default WithSidenav;