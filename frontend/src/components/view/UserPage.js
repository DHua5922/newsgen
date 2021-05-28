import Title from "./Title";
import Sidenav from "./Sidenav";
import tw, { styled } from "twin.macro";

const Content = styled.main`
    padding-left: 150px;
    padding-right: 50px;
    ${tw`w-full`}
`;

export default function UserPage(Component){
    return function UserPageComponent({ title, ...props }) {
        return (
            <>
                <Title title={title} />
                <div tw="flex h-full w-full">
                    <Sidenav />
                    <Content><Component {...props} /></Content>
                </div>
            </>
        );
    }
}