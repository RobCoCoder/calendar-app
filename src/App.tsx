import { Navigation } from './components/navigation/Navigation';
import styled from 'styled-components';
import { RootState, store, useAppDispatch, useAppSelector } from './Redux/Store';
import { Provider } from 'react-redux';
import { Month } from './components/monthView/Month';
import { GlobalStyles } from './vars';
import { selectEventUpserterOpenedStatus, selectEventsViewerOpenedStatus, selectListCreatorOpenedStatus, selectViewType } from './Redux/selectors/GlobalSelectors';
import { Day } from './components/dayView/Day';
import { selectCurrentLanguage } from './Redux/selectors/LanguageSelectors';
import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { setMonthsNamesTC, setNavigationTitlesTC, setWeekDaysNamesTC } from './Redux/LanguageDataReducer';
import { ListCreator } from './components/listCreator/ListCreator';
import { EventsViewer } from './components/eventsViewer/EventsViewer';
import { EventUpserter } from './components/eventCreator/EventUpserter';
import { fetchEventListsTC } from './Redux/EventsReducer';

function App() {
  const dispatch: Dispatch<any> = useAppDispatch() 

  //local state
  const [width, setWidth] = useState(window.innerWidth);

  //state
  const currentLanguage: string = useAppSelector((state: RootState) => selectCurrentLanguage(state))
  const viewType = useAppSelector((state: RootState) => selectViewType(state))
  const isEventUpserterOpened = useAppSelector((state: RootState) => selectEventUpserterOpenedStatus(state))
  const isListCreatorOpened = useAppSelector((state: RootState) => selectListCreatorOpenedStatus(state))
  const isEventsViewerOpened = useAppSelector((state: RootState) => selectEventsViewerOpenedStatus(state))

  //dispatch
  const setMonthsNames = (lang: "en" | "fr" | "ru") => {dispatch(setMonthsNamesTC(lang))}
  const setWeekDaysNames = (lang: "en" | "fr" | "ru") => {dispatch(setWeekDaysNamesTC(lang))}
  const setNavigationTitles = (lang: "en" | "fr" | "ru") => {dispatch(setNavigationTitlesTC(lang))}

  useEffect(() => {
    if(currentLanguage !== "en" && currentLanguage !== "fr" && currentLanguage !== "ru"){
        setMonthsNames("en")
        setWeekDaysNames("en")
        setNavigationTitles("en")
    }
    else {
        setMonthsNames(currentLanguage)
        setWeekDaysNames(currentLanguage)
        setNavigationTitles(currentLanguage)
    }
}, [currentLanguage])

  useEffect(() => {
    dispatch(fetchEventListsTC())
  }, [])

  useEffect(() => {
    //used for setting the length of the weekday names
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize);
    }
}, []);

  return (
    <Provider store = {store}>
      <GlobalStyles/>
      <AppContainer>
        <Page>
          {viewType === "month" && <Month width={width}/>}
          {viewType === "day" ?
            <>
              {width < 990 ? 
                <Day isSplitScreen={false}/> 
                :
                <>
                  {isEventUpserterOpened && <SplitScreenContainer><SplitScreen><Day isSplitScreen={true}/></SplitScreen><SplitScreen><EventUpserter isSplitScreen={true}/></SplitScreen></SplitScreenContainer>}
                  {isEventsViewerOpened && <SplitScreenContainer><SplitScreen><Day isSplitScreen={true}/></SplitScreen><SplitScreen><EventsViewer isSplitScreen={true}/></SplitScreen></SplitScreenContainer>}
                  {(!isEventUpserterOpened && !isEventsViewerOpened) ? <Day isSplitScreen={false}/> : <></>}
                </>
              }
            </>
            :
            <>
              {width < 990 ? 
                <>
                  {(isEventUpserterOpened) && <EventUpserter isSplitScreen={false}/>}
                  {(isEventsViewerOpened) && <EventsViewer isSplitScreen={false}/>}
                </>
                :
                <>
                </>
              }
            </>
          }
          {(viewType !== "day" && isEventUpserterOpened) && <EventUpserter isSplitScreen={false}/>}
          {(width < 990 && isListCreatorOpened) && <ListCreator/>}
          {(viewType !== "day" && isEventsViewerOpened) && <EventsViewer isSplitScreen={false}/>}
        </Page>
        <Navigation width={width}/>
      </AppContainer>
    </Provider>
  );
}

export const AppWithProvider = () => {return <Provider store={store}><App/></Provider>}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100vw;
  height: 100vh;

  @media (min-width: 990px){
    flex-direction: row;
  }
`

const Page = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const SplitScreenContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 200;
`

const SplitScreen = styled.div`
  display: block;
  width: calc(50% - 0.01cm);
  height: calc(100%);
  border-left: 0.005cm solid white;
  border-right: 0.005cm solid white;
`

export default App;
