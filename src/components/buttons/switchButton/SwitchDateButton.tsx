import styled from "styled-components"
import { useAppDispatch } from "../../../Redux/Store"
import { Dispatch } from "redux"
import { switchDayAC, switchMonthAC } from "../../../Redux/DatesReducer"

type PropsType = {
     /**
     * The type of date switching: switching months, days or years
     */
    switchType: "day" | "month" | "year" 
    direction: "back" | "forward"
}

export const SwitchDateButton = (props: PropsType) => {
    const dispatch: Dispatch = useAppDispatch();

    //dispatch
    const switcher = () => {
        if(props.switchType === "month")
            dispatch(switchMonthAC(props.direction))
        else if (props.switchType === "day")
            dispatch(switchDayAC(props.direction))
    }

    return (
        <ButtonContainer onClick={switcher}>
            <span className="material-symbols-outlined">{`arrow_${props.direction}`}</span>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1/1;

    background-color: white;
    color: black;
    border: var(--buttonBorder);
    border-radius: 100%;
    &:hover{
        cursor: pointer;
    }
`