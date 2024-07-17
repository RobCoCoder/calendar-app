import styled, { keyframes } from "styled-components"
import { ListCreatorForm } from "./ListCreatorForm"
import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { setEventListColorNamesTC } from "../../Redux/LanguageDataReducer"
import { selectCurrentLanguage } from "../../Redux/selectors/LanguageSelectors"

export const ListCreator = () => {
    const dispatch = useAppDispatch()

    //state
    const currentLanguage = useAppSelector((state: RootState) => selectCurrentLanguage(state))

    useEffect(() => {
        if(currentLanguage !== "en" && currentLanguage !== "fr" && currentLanguage !== "ru"){
            dispatch(setEventListColorNamesTC("en"))   
        }
        else dispatch(setEventListColorNamesTC(currentLanguage))
    }, [])

    return (
        <ListCreatorContainer>
            <ListCreatorForm></ListCreatorForm>
        </ListCreatorContainer>
    )
}

const listCreatorOpeningAnimation = keyframes`
    0% {top: 0px}
    50% {top: 50px}
    100%{top: 40px}
`
const ListCreatorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 90%;
    height: 50px;
    top: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 2px;
    z-index: 200;
    background-color: black;
    border: 0.001cm solid rgb(56, 53, 53);
    border-radius: 20px;
    box-shadow: 0cm 0.2cm 0.5cm black;
    animation-name: ${listCreatorOpeningAnimation};
    animation-duration: 0.5s;

    @media (min-width: 990px){
        position: relative;
        top: 0px;
        width: 100%;
        height: 100%;
        padding: 0px;
        border-radius: 10px;
        animation: none;
    }
`

