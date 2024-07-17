import styled from "styled-components"
import { useAppDispatch } from "../../../../Redux/Store"
import { selectDayAC } from "../../../../Redux/DatesReducer"
import { setViewTypeAC } from "../../../../Redux/GlobalDataReducer"

type PropsType = {
    dayNumber: number | null
    isEmpty: boolean
    isCurrentDay: boolean
    hasEvents: boolean
    eventNames: Array<string> | null
}

export const DayCell = (props: PropsType) => {
    const dispatch = useAppDispatch()
    
    let content: string = ""
    if(props.eventNames){
        props.eventNames.forEach((name) => {
            content += name + "\n"
        })
    }

    //dispatch
    const selectDay = () => {
        if(!props.isEmpty && typeof props.dayNumber === "number"){
            //becase dayNumber exists if isEmpty is false
            dispatch(setViewTypeAC("day"))
            dispatch(selectDayAC(props.dayNumber))
        }
    }

    return (
        <DayCellContainer isEmpty={props.isEmpty}>
            <Cell onClick = {selectDay} data-testid="dayCell" isCurrentDay={props.isCurrentDay} title={props.hasEvents ? content : ""}>
                <DayNumber hasEvents={props.hasEvents}>{props.dayNumber}</DayNumber>
            </Cell>
        </DayCellContainer>
    )
}

const DayCellContainer = styled.div<{isEmpty: boolean}>`
    display: flex;
    visibility: ${props => props.isEmpty ? "hidden" : "visible"};
    justify-content: center;
    align-items: center;
    width: 14%;
    aspect-ratio: 1/1;
    &:hover{
        cursor: pointer;
    }
    
    @media (min-width: 990px){
        aspect-ratio: unset;
        width: 14%;
        height: 100%;
    }
`

const Cell = styled.div<{isCurrentDay: boolean}>`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: calc(71.43%);
    aspect-ratio: 1/1;

    background-color: ${props => props.isCurrentDay ? "var(--mainColour)" : "var(--outlineColour)"};
    color: ${props => props.isCurrentDay ? "white" : "black"};
    border-radius: 10px;
    font-size: var(--titeFont);

    @media (min-width: 990px){
        width: 65%;
        aspect-ratio: 1/1;
        margin: 10px;
    }
`

const DayNumber = styled.p<{hasEvents: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    font-size: var(--defaultFont);
    
    background-color: ${props => props.hasEvents ? "var(--secondaryColour)" : "transparent"};
    border-radius: 50px;
`