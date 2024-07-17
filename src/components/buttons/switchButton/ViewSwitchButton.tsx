import styled from "styled-components"
import { useAppDispatch } from "../../../Redux/Store"
import { setViewTypeAC } from "../../../Redux/GlobalDataReducer"
import { changeViewSwitchOpenedStatusAC } from "../../../Redux/NavigationDataReducer"

type PropsType = {
    viewType: "day" | "month" | "year" //the view type that the button will set to
}

export const ViewSwitchButton = (props: PropsType) => {
    const dispatch = useAppDispatch()

    //dispatch
    const setViewType = () => {
        dispatch(setViewTypeAC(props.viewType))
        dispatch(changeViewSwitchOpenedStatusAC(false))
    }

    return (
        <ViewSwitchButtonContainer onClick={setViewType}>
            {props.viewType[0].toUpperCase() + props.viewType.slice(1, props.viewType.length)}
        </ViewSwitchButtonContainer>
    )
}

const ViewSwitchButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 80%;

    border-radius: 10px;
    background-color: white;
    font-size: var(--defaultFontSize);

    &:hover{
        cursor: pointer;
    }

    @media (min-width: 990px){
        background-color: black;
        color: white;
    }
`