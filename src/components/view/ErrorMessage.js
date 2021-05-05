import { styled } from "twin.macro";
import { ErrorCircle } from "@styled-icons/boxicons-regular/ErrorCircle";
import { IconMessage } from "./IconMessage";
import { styles } from "../../../styles/globals";

const Icon = styled(ErrorCircle)`${styles.iconMessage}`;
const msgProps = {
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