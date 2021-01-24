import styled from "styled-components";
import { CheckCircle } from "@styled-icons/boxicons-regular/CheckCircle";
import { styles } from "../../../styles/globals";
import { IconMessage } from "./IconMessage";

const Icon = styled(CheckCircle)`${styles.iconMessage}`;

export function SuccessMessage({ message }) {
    return (
        <IconMessage 
            props={{
                backgroundColor: "#62FF83",
                textColor: "green"
            }}
            icon={<Icon />}
            message={message}
        />
    );
}