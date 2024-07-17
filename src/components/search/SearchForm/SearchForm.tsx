import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../../Redux/Store"
import { Dispatch } from "redux"
import { chanegSearchOpenedStatusAC, changeSearchFailedStatusAC, searchDateTC } from "../../../Redux/SearchDataReducer"
import styled, { keyframes } from "styled-components"
import { SendDeleteButton } from "../../buttons/switchButton/SendDeleteButton"
import { addNewNotifications } from "../../../Redux/NotificationsReducer"

function isNumeric(str: string) {
    if (typeof str != "string") return false // we only process strings!  
    //@ts-ignore
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

type PropsType = {
    currentLanguage: string
    isSplitScreen: boolean
}

export const SearchForm = (props: PropsType) => {
    const dispatch: Dispatch<any> = useAppDispatch()

    type FormValues = {
        dateInputText: string
    }

    const {
        register: register,
        handleSubmit: handleSubmit,
        formState: {errors},
        reset: reset
    } = useForm<FormValues>()

    const closeSearchForm = () => {
        dispatch(chanegSearchOpenedStatusAC(false))
    } 

    const searchDate = (data: FormValues) => {
        const dateElements = data.dateInputText.split(" ")
        if(dateElements.length === 2){
            if(!isNumeric(dateElements[1]) || Number(dateElements[1]) < 0){
                dispatch(chanegSearchOpenedStatusAC(false))
                dispatch(changeSearchFailedStatusAC(true))
            }
        }
        else if(dateElements.length === 3){
            if(!isNumeric(dateElements[1]) || Number(dateElements[1]) < 0 || !isNumeric(dateElements[2]) || Number(dateElements[2]) < 0){
                dispatch(chanegSearchOpenedStatusAC(false))
                dispatch(changeSearchFailedStatusAC(true))
            }
        }
        else if(dateElements.length > 3){
            dispatch(chanegSearchOpenedStatusAC(false))
            dispatch(addNewNotifications([
                {type: "Error", eventList: null, name: "form error", description: "Provided more than 3 date items. Requires month, day, year in that order, can skip in-between.", URLs: null}
            ]))
        }

        if(dateElements.length === 2){
            const monthName: string = dateElements[0]
            const year: number = Number(dateElements[1])
            dispatch(searchDateTC(props.currentLanguage, year, monthName))
        }
        else if(dateElements.length === 3){
            const monthName: string = dateElements[0]
            const dayOfTheMonth: number = Number(dateElements[1])
            const year: number = Number(dateElements[2])
            dispatch(searchDateTC(props.currentLanguage, year, monthName, dayOfTheMonth))
        }
    }

    return (
        <SearchFormContainer isSplitScreen={props.isSplitScreen}>
            <DateInput type="text" autoFocus {...register("dateInputText")}></DateInput>
            <ButtonsContainer>
                <SendDeleteButton action={"cancel"} onClickFunction={handleSubmit(closeSearchForm)}></SendDeleteButton>
                <SendDeleteButton action={"send"} onClickFunction={handleSubmit(searchDate)}></SendDeleteButton>
            </ButtonsContainer>
        </SearchFormContainer>
    )
}

const searchOpeningAnimation = keyframes`
    0% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 40%;
        min-height: fit-content;
        height: 7%;

        margin: 0 auto;
        z-index: 200;
        right: 0;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        background-color: black;
    }
    15%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 30%;
        min-height: fit-content;
        height: 5%;

        margin: 0 auto;
        z-index: 200;
        right: 0;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    20%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 30%;
        min-height: fit-content;
        height: 5%;

        margin: 0 auto;
        z-index: 200;
        right: 0;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    50% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 50%;
        min-height: fit-content;
        height: 17%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 30px;
        right: 0;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    95% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 45%;
        min-height: fit-content;
        height: 15%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 20px;
        right: 0;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    100%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 45%;
        min-height: fit-content;
        height: 15%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 20px;
        right: 0;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
`
const searchContentsOpeningAnimation = keyframes`
    0% {
        display: block;
        position: absolute;
        visibility: none;
        width: calc(100% - 20px);

        outline: none;
        border: none;
        border-radius: 20px;
        background-color: var(--borderColour);
        
        color: white;
        font-size: var(--titleFont);
    }
    100%{
        display: block;
        position: absolute;
        visibility: visible;
        width: calc(100% - 20px);
        
        outline: none;
        border: none;
        border-radius: 20px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: var(--borderColour);
        
        color: white;
        font-size: var(--titleFont);
    }
    `

    const searchOpeningAnimationDesktop = keyframes`
    0% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 25%;
        min-height: fit-content;
        height: 7%;

        margin: 0 auto;
        z-index: 200;
        right: 60px;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        background-color: black;
    }
    15%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 15%;
        min-height: fit-content;
        height: 5%;

        margin: 0 auto;
        z-index: 200;
        right: 60px;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    20%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 15%;
        min-height: fit-content;
        height: 5%;

        margin: 0 auto;
        z-index: 200;
        right: 60px;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    50% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 35%;
        min-height: fit-content;
        height: 17%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 30px;
        right: 60px;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    95% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 30%;
        min-height: fit-content;
        height: 15%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 20px;
        right: 60px;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    100%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 30%;
        min-height: fit-content;
        height: 15%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 20px;
        right: 60px;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
`

const searchOpeningAnimationDesktop_SplitScreen = keyframes`
    0% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 25%;
        min-height: fit-content;
        height: 7%;

        margin: 0 auto;
        z-index: 200;
        right: 50%;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        background-color: black;
    }
    15%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 15%;
        min-height: fit-content;
        height: 5%;

        margin: 0 auto;
        z-index: 200;
        right: 50%;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    20%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 15%;
        min-height: fit-content;
        height: 5%;

        margin: 0 auto;
        z-index: 200;
        right: 50%;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    50% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        right: 50%;
        min-height: fit-content;
        height: 17%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 30px;
        right: 50%;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    95% {
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        right: 50%;
        min-height: fit-content;
        height: 15%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 20px;
        right: 50%;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
    100%{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        min-width: fit-content;
        width: 30%;
        min-height: fit-content;
        height: 15%;

        margin: 0 auto;
        z-index: 200;
        margin-top: 20px;
        right: 50%;
        left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
`

const SearchFormContainer = styled.form<{isSplitScreen: boolean}>`
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    min-width: fit-content;
    width: 45%;
    min-height: fit-content;
    height: 15%;

    margin: 0 auto;
    z-index: 200;
    margin-top: 20px;
    right: 60px;
    left: 0;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 20px;
    box-shadow: 0cm 0.2cm 0.5cm black;
    background-color: black;
    animation-name: ${searchOpeningAnimation};
    animation-fill-mode: forwards;
    animation-duration: 1s;

    @media(min-width: 990px){
        animation-name: ${props => props.isSplitScreen ? searchOpeningAnimationDesktop_SplitScreen : searchOpeningAnimationDesktop};
        animation-fill-mode: forwards;
        animation-duration: 1s;
    }
`

const DateInput = styled.input`
    display: block;
    position: relative;
    width: 20%;
    height: 50%;

    outline: none;
    border: none;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: var(--borderColour);
    
    color: white;
    font-size: var(--titleFont);
    animation-name: ${searchContentsOpeningAnimation};
    animation-fill-mode: forwards;
    animation-duration: 2s;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: absolute;
    width: 90%;
    height: 50%;
    bottom: 0;

    outline: none;
    border: none;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: var(--titleFont);
`