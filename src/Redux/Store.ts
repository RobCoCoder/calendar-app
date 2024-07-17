import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { LanguageDataReducer } from "./LanguageDataReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { DatesReducer } from "./DatesReducer";
import { SearchDataReducer } from "./SearchDataReducer";
import { EventsReducer } from "./EventsReducer";
import { GlobalDatareducer } from "./GlobalDataReducer";
import { NavigationDataReducer } from "./NavigationDataReducer";
import { NotificationsReducer } from "./NotificationsReducer";

const reducer = combineReducers({
    globalData: GlobalDatareducer,
    languageData: LanguageDataReducer,
    navigationData: NavigationDataReducer,
    notifications: NotificationsReducer,
    dates: DatesReducer,
    search: SearchDataReducer,
    events: EventsReducer
})

export const store = configureStore({ reducer })

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore