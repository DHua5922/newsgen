import styled from "styled-components";
import { styles } from "../../../styles/globals";

const Title = styled.h4`
    ${styles.ellipsisOverflow}
    text-align: center;`;

const Image = styled.img`
    width: 100%;
    height: 250px;`;

const Description = styled.p`
    ${styles.ellipsisOverflow}`;

const Link = styled.a`
    color: black !important;
    text-decoration: none !important;
`;

export function News({ title, urlToImage, description, url }) {
    return (
        <Link href={url} target="_blank">
            <Title>{title}</Title>
            <Image src={urlToImage} />
            <Description>{description}</Description>
        </Link>
    );
}