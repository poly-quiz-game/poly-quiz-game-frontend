import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ButtonTab = styled(NavLink)`
    display: inline-block;
    vertical-align: top;
    min-width: 12px;
    height: 42px;
    line-height: 42px;
    width: auto;
    font-size: 1rem;
    text-decoration: none;
    outline: 0px;
    box-shadow: none;
    background: transparent;
    max-width: 20rem;
    border-image: initial;
    color: rgb(110, 110, 110);
    border-bottom: 0px inset rgb(81, 45, 168);
    letter-spacing: 0.2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0px 0.5rem 2rem;
    margin-right: 1rem;
    border-top: none;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    cursor: pointer;
    &.active {
        color: #1890ff;
        border-bottom: 2px inset #1890ff;
    }

`;
