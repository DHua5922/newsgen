import styled from "styled-components";
import { ErrorCircle } from "@styled-icons/boxicons-regular/ErrorCircle";
import { IconMessage } from "./IconMessage";
import { styles } from "../../../styles/globals";

const Icon = styled(ErrorCircle)`${styles.iconMessage}`;
const msgProps = {
    backgroundColor: "#FF7A7A",
    textColor: "red",
};

export function ErrorMessage({ props=msgProps, icon=<Icon />, message="" }) {
    return (
        <IconMessage 
            props={props}
            icon={icon}
            message={message}
        />
    );
}