import React from "react";

import { Popup } from "semantic-ui-react";
import hints from "./hints.js";
import {IconStyled} from "./styles.js";

const Hint = ({
    icon,
    hint,
}) => {
    return (
        <Popup content={hints[hint]} trigger={<IconStyled size='small' name={icon || 'info'} center />} />
    )
}

export default Hint;