import { RootState } from "../Store";

export const selectIsViewSwitchOpened = (state: RootState) => {
    return state.navigationData.isViewSwitchOpened
}