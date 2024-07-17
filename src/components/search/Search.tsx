import styled, { keyframes } from "styled-components"
import { SwitchDateButton } from "../buttons/switchButton/SwitchDateButton"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { Dispatch } from "redux"
import { chanegSearchOpenedStatusAC, changeSearchFailedStatusAC, searchDateTC } from "../../Redux/SearchDataReducer"
import { SearchForm } from "./SearchForm/SearchForm"
import { selectSearchIsOpened, selectSearchIsFailed } from "../../Redux/selectors/SearchSelectors"
import { PropsWithChildren, useEffect, useState } from "react"
import { selectEventUpserterOpenedStatus, selectViewType } from "../../Redux/selectors/GlobalSelectors"
import { NotificationIndicator } from "../notificationIndicator/NotificationIndicator"
import { selectIsNotificationSent } from "../../Redux/selectors/NotificationsSelectors"

interface Props extends PropsWithChildren<any>{
    currentLanguage: string
    year: number
    monthName?: string | null,
    dayOfTheMonth?: number
    isSplitScreen?: boolean
 }

type PropsType = {
    currentLanguage: string
    year: number
    monthName?: string | null,
    dayOfTheMonth?: number
    isSplitScreen?: boolean
}

export const Search = ({
    currentLanguage,
    year,
    monthName,
    dayOfTheMonth,
    isSplitScreen = false
}: Props) => {

    //local state
    const [width, setWidth] = useState(window.innerWidth);

    //state
    const isNotificationSent = useAppSelector((state: RootState) => selectIsNotificationSent(state))
    const isEventUpserterOpened = useAppSelector((state: RootState) => selectEventUpserterOpenedStatus(state))
    const isSearchOpened = useAppSelector((state: RootState) => selectSearchIsOpened(state))
    const isSearchFailed = useAppSelector((state: RootState) => selectSearchIsFailed(state))
    // const viewType = useAppSelector((state: RootState) => selectViewType(state))

    const dispatch: Dispatch<any> = useAppDispatch()

    const changeSearchOpenedStatus = () => {
        dispatch(changeSearchFailedStatusAC(false))
        dispatch(chanegSearchOpenedStatusAC(true))
    }
    const searchDate = (year: number, monthName: string) => {
        dispatch(searchDateTC(currentLanguage, year, monthName))
    }

    let title = ""
    if(monthName) title += monthName + ", "
    if(dayOfTheMonth) {
        title = title.slice(0, title.length-2) + " " + dayOfTheMonth + ", "
    }
    title += year

    useEffect(() => {
        //used for knowing when to display calendar along with the form (grater than 900px)
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <SearchContainer>
            {/* <SwitchDateButton direction="back" switchType={viewType} /> */}
            {width < 900 ?
                <>
                    {!isEventUpserterOpened ?
                        <>
                            {!isNotificationSent ? 
                                <>
                                {!isSearchOpened ?
                                    <SearchTitle isFailed={isSearchFailed} onClick={changeSearchOpenedStatus}>{title}</SearchTitle>
                                    :
                                    <SearchForm currentLanguage={currentLanguage} isSplitScreen={isSplitScreen}/>
                                }
                                </>
                                :
                                <NotificationIndicator/>
                            }
                        </>
                        :
                        <>
                            {!isSearchOpened ?
                                <SearchTitle isFailed={isSearchFailed} onClick={changeSearchOpenedStatus}>{title}</SearchTitle>
                                :
                                <SearchForm currentLanguage={currentLanguage} isSplitScreen={isSplitScreen}/>
                            }
                        </>
                    }
                </>   
                :
                <>
                    {!isEventUpserterOpened ?
                        <>
                            {!isNotificationSent ? 
                                <>
                                {!isSearchOpened ?
                                    <SearchTitle isFailed={isSearchFailed} onClick={changeSearchOpenedStatus}>{title}</SearchTitle>
                                    :
                                    <SearchForm currentLanguage={currentLanguage} isSplitScreen={isSplitScreen}/>
                                }
                                </>
                                :
                                <NotificationIndicator/>
                            }
                        </>
                        :
                        <>
                            {!isSearchOpened ?
                                <SearchTitle isFailed={isSearchFailed} onClick={changeSearchOpenedStatus}>{title}</SearchTitle>
                                :
                                <SearchForm currentLanguage={currentLanguage} isSplitScreen={isSplitScreen}/>
                            }
                        </>
                    }
                </> 
            }

            {/* <SwitchDateButton direction="forward" switchType={viewType} /> */}
        </SearchContainer>
    )
}

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    width: 80%;
    height: 100%;
    margin: 0 auto;
`

const SearchTitileFailedAnimation = keyframes`
    // 0%{left: 0; right: 0; background-color: black; color: white;}
    // 20%{left: -40px; background-color: red; color:transparent}
    // 30%{left: 70px;} 
    // 35%{left: -50px;}
    // 55%{left: 30px; right: 0}
    // 70%{right: 0; left: 0;}
    // 100%{right: 0; left: 0;}

    0%{left: 0; right: 0; background-color: black; color: white;}
    20%{left: -80px; background-color: red; color:transparent}
    30%{left: 100px;} 
    35%{left: -50px;}
    55%{left: 40px; right: 0}
    70%{right: 0; left: 0;}
    100%{right: 0; left: 0;}
`
const SearchTitle = styled.h1<{isFailed: boolean}>`
    display: flex;
    position: relative;
    justify-content:center;
    align-items: center;
    min-width: fit-content;
    width: 50%;
    min-height: fit-content;
    height: 80%;

    margin: auto;
    z-index: 200;
    right: 0;
    left: 0;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 50px;
    font-size: var(--titleFont);
    font-weight: 500;
    transition: background-color 0.5s;
    animation-name: ${props => props.isFailed ? SearchTitileFailedAnimation : "none"};
    animation-duration: ${props => props.isFailed ? "1.5s" : "0s"};
    &:hover{
        cursor: pointer;
        background-color: black;
        color: white;
    }

    @media (min-width: 990px){
        width: 25%;
    }
`