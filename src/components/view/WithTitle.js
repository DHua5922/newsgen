import Title from "./Title";

function WithTitle(Component) {
    return function WithTitleComponent({ title, ...props }) {
        return (
            <>
                <Title title={title} />
                <Component {...props} />
            </>
        );
    }
}

export default WithTitle;