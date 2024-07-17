import styled, { keyframes } from "styled-components"
import { GlobalStyles } from "../../vars"
import { NavButton } from "../buttons/switchButton/NavButton"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { selectIsViewSwitchOpened } from "../../Redux/selectors/NavigationSelectors"
import { changeViewSwitchOpenedStatusAC } from "../../Redux/NavigationDataReducer"
import { ViewSwitch } from "./ViewSwitch/ViewSwitch"
import { selectCurrentLanguage, selectNavigationTitles } from "../../Redux/selectors/LanguageSelectors"
import { useEffect } from "react"
import { setNavigationTitlesTC } from "../../Redux/LanguageDataReducer"
import { changeEventUpserterOpenedStatusAC, changeEventsViewerOpenedStatusAC, changeListCreatorOpenedStatusAC } from "../../Redux/GlobalDataReducer"
import { Button } from "../buttons/switchButton/Button"
import { selectEventUpserterOpenedStatus, selectEventsViewerOpenedStatus, selectListCreatorOpenedStatus } from "../../Redux/selectors/GlobalSelectors"
import { chanegSearchOpenedStatusAC } from "../../Redux/SearchDataReducer"
import { setSelectedEventAC } from "../../Redux/EventsReducer"
import { ListCreator } from "../listCreator/ListCreator"


type PropsType = {
    width: number
}
export const Navigation = (props: PropsType) => {
    const dispatch = useAppDispatch()

    //state
    const isViewSwitchOpened: boolean = useAppSelector((state: RootState) => selectIsViewSwitchOpened(state))
    const isEventUpserterOpened = useAppSelector((state: RootState) => selectEventUpserterOpenedStatus(state))
    const isListCreatorOpened = useAppSelector((state: RootState) => selectListCreatorOpenedStatus(state))
    const isEventsViewerOpened = useAppSelector((state: RootState) => selectEventsViewerOpenedStatus(state))
    const navigationTitles = useAppSelector((state: RootState) => selectNavigationTitles(state))

    //dispatch
    const openViewSwitcher = () => {
        dispatch(changeViewSwitchOpenedStatusAC(true))
        dispatch(changeListCreatorOpenedStatusAC(false))
    }
    const openEventUpserter = () => {
        dispatch(changeEventUpserterOpenedStatusAC(!isEventUpserterOpened))
        dispatch(setSelectedEventAC(null))
        dispatch(changeListCreatorOpenedStatusAC(false))
        dispatch(chanegSearchOpenedStatusAC(false))
        dispatch(changeEventsViewerOpenedStatusAC(false))
    }
    const changeListCreatorOpenedStatus = () => {
        dispatch(changeListCreatorOpenedStatusAC(!isListCreatorOpened))
        dispatch(changeViewSwitchOpenedStatusAC(false))
        dispatch(changeEventUpserterOpenedStatusAC(false))
        dispatch(chanegSearchOpenedStatusAC(false))
        dispatch(changeEventsViewerOpenedStatusAC(false))
    }
    const changeEventsViewerOpenedStatus = () => {
        dispatch(changeEventsViewerOpenedStatusAC(!isEventsViewerOpened))
        dispatch(changeEventUpserterOpenedStatusAC(false))
        dispatch(changeListCreatorOpenedStatusAC(false))
        dispatch(chanegSearchOpenedStatusAC(false))
    }
    const returnNavigationBack = () => {
        if(isListCreatorOpened)
            dispatch(changeListCreatorOpenedStatusAC(false))
        if(isViewSwitchOpened)
            dispatch(changeViewSwitchOpenedStatusAC(false))
    }

    return (
        <NavigationContainer>
            {props.width < 990 &&
                <>
                    {!isViewSwitchOpened ?
                        <Buttons>
                            <NavButton buttonType="calendar_view_month" title={navigationTitles.viewSwitch} action={openViewSwitcher}></NavButton>
                            <NavButton buttonType="event_list" title={navigationTitles.createList} action={changeEventsViewerOpenedStatus}></NavButton>
                            <NavButton buttonType="edit_calendar" title={navigationTitles.createEvent} action={openEventUpserter}></NavButton>
                            <NavButton buttonType="list_alt_add" title={navigationTitles.createList} action={changeListCreatorOpenedStatus}></NavButton>
                        </Buttons>    
                        :
                        <FieldsContainer>
                            <Field>
                                {isViewSwitchOpened && <ViewSwitch/>}
                                <Button buttonType="close" action={returnNavigationBack} color="black" backgroundColor="white" borderColor="black"/>
                            </Field>
                        </FieldsContainer>
                    }
                </>
            }
            {props.width >= 990 &&
                <>
                    <Buttons>
                        <NavButton buttonType="calendar_view_month" title={navigationTitles.viewSwitch} action={openViewSwitcher}></NavButton>
                        <NavButton buttonType="event_list" title={navigationTitles.createList} action={changeEventsViewerOpenedStatus}></NavButton>
                        <NavButton buttonType="edit_calendar" title={navigationTitles.createEvent} action={openEventUpserter}></NavButton>
                        <NavButton buttonType="list_alt_add" title={navigationTitles.createList} action={changeListCreatorOpenedStatus}></NavButton>
                    </Buttons>    
                    {(isViewSwitchOpened || isListCreatorOpened) && 
                        <FieldsContainer>
                            <Field>
                                {isViewSwitchOpened && 
                                    <ViewSwitchContainer>
                                        <ViewSwitch/>
                                        <Button buttonType="close" action={returnNavigationBack} color="black" backgroundColor="white" borderColor="black"/>
                                    </ViewSwitchContainer>
                                }
                            </Field>
                            <Field/>
                            <Field/>
                            <Field>
                                {isListCreatorOpened &&
                                    <ListCreator/>
                                }
                            </Field>
                        </FieldsContainer>
                    }
                </>
            }
        </NavigationContainer>
    )
}

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 100%;
    height: 8%;
    min-height: 60px;
    background-color: var(--mainColour);

    @media (min-width: 990px){
        width: 60px;
        height: 100%;
        flex-direction: column;
        flex-wrap: nowrap;
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    bottom: 0px;

    @media (min-width: 990px){
        flex-direction: column;
        flex-wrap: nowrap;
    }
`

const fieldOpeningAnimationDesktop = keyframes`
    0% {margin-left: 100%;}
    50% {margin-left: -10%;}
    100%{margin-left: 0px}
`

const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;


    @media (min-width: 990px){
        display: flex;
        position: fixed;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        width: 30%;
        height: 100%;
        right: 60px;
        z-index: 200;
    }
`

const Field = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    bottom: 0px;
    padding: 5px;


    @media (min-width: 990px){
        width: calc(100% - 10px);
        height: calc(10% - 10px);
        border-radius: 10px;
    }
`

const ViewSwitchContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    padding: 5px;
    background-color: black;
    border-radius: 10px;
    box-shadow: 0cm 0.2cm 0.5cm black;
`
