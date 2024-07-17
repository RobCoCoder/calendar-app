import styled from "styled-components"
import { ViewSwitchButton } from "../../buttons/switchButton/ViewSwitchButton"

export const ViewSwitch = () => {
    return (
        <ViewSwitchContainer>
            <ViewSwitchButton viewType="day"/>
            <ViewSwitchButton viewType="month"/>
            <ViewSwitchButton viewType="year"/>
        </ViewSwitchContainer>
    )
}

const ViewSwitchContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 100px;
    width: 80%;
    height: 100%;

    border-radius: 10px;
    background-color: black;

    @media (min-width: 990px){
        background-color: white;
        color: black;
    }
`