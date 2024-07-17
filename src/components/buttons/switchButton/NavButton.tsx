import styled from "styled-components"

type PropsType = {
    buttonType: "calendar_view_month" | "edit_calendar" | "list_alt_add" | "event_list"
    title: string
    action: () => void
}

export const NavButton = (props: PropsType) => {
    return (
        <ButtonContainer title={props.title} onClick={props.action}>
            <span className="material-symbols-outlined">{props.buttonType}</span>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 80%;
    aspect-ratio: 1/1;

    background-color: white;
    color: black;
    border: var(--buttonBorder);
    border-radius: 100%;
    &:hover{
        cursor: pointer;
    }

    @media (min-width: 990px){
        width: 80%;
        height: auto;
    }
`