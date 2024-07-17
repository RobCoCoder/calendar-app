import zIndex from "@mui/material/styles/zIndex"
import styled from "styled-components"

type PropsType = {
    formName: string 
    color: string,
    backgroundColor: string,
    borderColor: string,
    buttonType: "add_circle"
}

export const SubmitButton = (props: PropsType) => {
    return (
        <ButtonContainer backgroundColor={props.backgroundColor} color={props.color} borderColor={props.borderColor}>
            <span className="material-symbols-outlined">{props.buttonType}
                <Input type="submit" form={props.formName} value={0}/>
            </span>
        </ButtonContainer>
    )   
}

const ButtonContainer = styled.div<{backgroundColor: string, color: string, borderColor: string}>`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1/1;

    border: var(--buttonBorder);
    border-color: ${props => props.borderColor};
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    border-radius: 100%;
`

const Input = styled.input`
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    color: transparent;
    border: none;
    border-radius: 100%;
    background-color: transparent;

    &:hover{
        cursor: pointer;
    }
`