import styled from "styled-components";
import { styles } from "../../../styles/globals";

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

const NewsDisplay = styled.div`
    position: relative;
`;

export function News({ title, urlToImage, description, url, icon }) {
    return (
        <NewsDisplay>
            <Row>  
                <Title>
                    <Link href={url} target="_blank">
                        {title}
                    </Link>
                </Title>
                { icon }
            </Row>  
            <Image src={urlToImage} />
            <Description>{description}</Description>
        </NewsDisplay>
    );
}