import { styled } from "twin.macro";
import { CheckCircle } from "@styled-icons/boxicons-regular/CheckCircle";
import { styles } from "../../../styles/globals";
import { IconMessage } from "./IconMessage";

const Icon = styled(CheckCircle)`${styles.iconMessage}`;
const msgProps = {
    backgroundColor: "#62FF83",
    textColor: "green"
};

export function SuccessMessage({ props=msgProps, icon=<Icon />, message="" }) {
    return (
        <IconMessage 
            props={props}
            icon={icon}
            message={message}
        />
    );
}