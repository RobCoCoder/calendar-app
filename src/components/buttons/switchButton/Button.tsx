import styled from "styled-components"

type PropsType = {
    buttonType: "close" | "add_circle"
    color: string
    backgroundColor: string
    borderColor: string
    action: () => void
}

export const Button = (props: PropsType) => {
    return (
        <ButtonContainer style={{backgroundColor: props.backgroundColor, color: props.color, borderColor: props.borderColor}} onClick={props.action}>
            <span className="material-symbols-outlined">{props.buttonType}</span>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1/1;

    border: var(--buttonBorder);
    border-radius: 100%;
    &:hover{
        cursor: pointer;
    }
`