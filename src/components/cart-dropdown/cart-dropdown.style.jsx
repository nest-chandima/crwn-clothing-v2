import styled from "styled-components";
import { BaseButton,InvertedButton, GoogleSignInButton } from "../button/button.style";

export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    ${BaseButton},
    ${InvertedButton}, 
    ${GoogleSignInButton}{
        margin: auto;
        /* font-size: 12px;
        width: 80%; */
    }
`
export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`
export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: auto;
`

