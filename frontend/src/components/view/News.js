import tw, { styled } from "twin.macro";

const ellipsisOverflow = tw`
    overflow-ellipsis 
    overflow-hidden 
    whitespace-nowrap
`;
const Title = styled.h4`${ellipsisOverflow}`;
const Description = styled.p`${ellipsisOverflow}`;

const Image = styled.img`
    height: 250px;
    ${tw`my-2 w-full`}
`;

const NewsDisplay = styled.div`
    ${tw`flex w-full px-10`}
`;
const NewsContainer = styled.div`${tw`w-full`}`
const Icon = styled.i`${tw`ml-3`}`;

export function News({ title, urlToImage, description, url, icon }) {
    return (
        <NewsDisplay>
            <NewsContainer>
                <Title>
                    <a href={url} target="_blank">
                        {title}
                    </a>
                </Title>
                <Image src={urlToImage} />
                <Description>{description}</Description>
            </NewsContainer>
            <Icon>{icon}</Icon>
        </NewsDisplay>
    );
}