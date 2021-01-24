import styled from "styled-components";
import { ErrorCircle } from "@styled-icons/boxicons-regular/ErrorCircle";
import { IconMessage } from "./IconMessage";
import { styles } from "../../../styles/globals";

const Icon = styled(ErrorCircle)`${styles.iconMessage}`;

export function ErrorMessage({ message }) {
    return (
        <IconMessage 
            props={{
                backgroundColor: "#FF7A7A",
                textColor: "red"
            }}
            icon={<Icon />}
            message={message}
        />
    );
}