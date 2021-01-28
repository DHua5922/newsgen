import styled from "styled-components";
import { styles } from "../../../styles/globals";
import { Star } from "@styled-icons/boxicons-regular/Star";

const Title = styled.h4`
    ${styles.ellipsisOverflow}
    width: 87%;
`;

const Image = styled.img`
    width: 100%;
    height: 250px;
    margin-top: 10px;
`;

const Description = styled.p`
    ${styles.ellipsisOverflow}
`;

const Link = styled.a`
    color: black !important;
    text-decoration: none;
`;

const Row = styled.div`
    display: flex; 
    justify-content: space-between;
`;

const FavIcon = styled(Star)`
    cursor: pointer;
    height: 3rem;
    display: ${props => props.canShow ? "block" : "none"};
`;

const NewsDisplay = styled.div`
    position: relative;
`;

export function News({ title, urlToImage, description, url, fav }) {
    return (
        <NewsDisplay>
            <Row>  
                <Title>
                    <Link href={url} target="_blank">
                        {title}
                    </Link>
                </Title>
                <FavIcon {...fav} />
            </Row>  
            <Image src={urlToImage} />
            <Description>{description}</Description>
        </NewsDisplay>
    );
}