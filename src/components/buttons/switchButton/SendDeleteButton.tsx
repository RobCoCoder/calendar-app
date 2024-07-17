import { Dispatch } from "redux";
import { useAppDispatch } from "../../../Redux/Store";
import { switchMonthAC } from "../../../Redux/DatesReducer";
import styled from "styled-components";

type PropsType = {
    action: "cancel" | "send",
    onClickFunction: () => void
}

export const SendDeleteButton = (props: PropsType) => {
    return (
        <ButtonContainer onClick={props.onClickFunction}>
            <span className="material-symbols-outlined">{props.action}</span>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    heigth:100%;
    aspect-ratio: 1/1;

    background-color: black;
    color: white;
    border: none;
    border-radius: 100%;
    &:hover{
        cursor: pointer;
    }
`
