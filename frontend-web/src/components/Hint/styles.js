import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";


const Wrapper = styled.div`
    display: inline-block;
    background: transparent;
    width: auto;
    margin: 0px !important;

    .icon {
        vertical-align: text-top;
        color: #888;
    }
`;

export const IconStyled = (props) => {
    return <Wrapper><Icon {...props} styled={{margin: 0}}></Icon></Wrapper>
}