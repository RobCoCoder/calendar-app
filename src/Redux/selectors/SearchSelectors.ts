import { RootState } from "../Store";

export const selectSearchIsOpened = (state: RootState) => {
    return state.search.isSearchOpened
}

export const selectSearchIsFetching = (state: RootState) => {
    return state.search.isFetching
}

export const selectSearchIsFailed = (state: RootState) => {
    return state.search.isFailed
}