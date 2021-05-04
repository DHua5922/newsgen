import Title from "./Title";
import Sidenav from "./Sidenav";
import tw from "twin.macro";

export default function UserPage(Component){
    return function UserPageComponent({ title, ...props }) {
        return (
            <>
                <Title title={title} />
                <div tw="flex h-full">
                    <Sidenav />
                    <Component {...props} />
                </div>
            </>
        );
    }
}