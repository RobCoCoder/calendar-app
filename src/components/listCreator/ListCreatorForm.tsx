import styled from "styled-components"
import { SendDeleteButton } from "../buttons/switchButton/SendDeleteButton"
import { Button } from "../buttons/switchButton/Button"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { changeListCreatorOpenedStatusAC } from "../../Redux/GlobalDataReducer"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { ReactElement, useState } from "react"
import { selectEventListColorNames } from "../../Redux/selectors/LanguageSelectors"
import { SubmitButton } from "../buttons/switchButton/SubmitButton"
import classes from "./ListCreatorForm.module.css"
import { createEventListTC } from "../../Redux/EventsReducer"

type Inputs = {
    listName: string
    listColor: string
}

export const ListCreatorForm = () => {
    const dispatch = useAppDispatch()


    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(createEventListTC(data.listName, data.listColor))
        reset()
        dispatch(changeListCreatorOpenedStatusAC(false))
    }

    //local state
    const [eventListColorSelectValue, setEventListColorSelectValue] = useState("")

    //state
    const eventListColorNames = useAppSelector((state: RootState) => selectEventListColorNames(state))

    const closeListCreator = () => {
        dispatch(changeListCreatorOpenedStatusAC(false))
    }

    let menuItems = []
    for(const [key, value] of Object.entries(eventListColorNames)) {
        menuItems.push(<MenuItem sx={{backgroundColor: value.colorCode, border: "0.001cm solid rgb(56, 53, 53)", borderRadius: "20px", margin: "10px", transition: "box-shadow 0.5s", ":hover": {backgroundColor: value.colorCode ,boxShadow: `0 0.1cm 0.4cm ${value.colorCode}`}}} color={value.colorCode} value={value.colorCode}><p style={{filter: "invert(1)", mixBlendMode: "difference"}}>{value.name}</p></MenuItem>)
    }

    return (
        <ListCreatorFormContainer id="listCreatorForm" onSubmit={handleSubmit(onSubmit)} backgroundColor={eventListColorSelectValue}>
            <ListNameInput {...register("listName", {required: true})} type="text" placeholder={errors.listName && errors.listName.type === "required" ? "This is required" : "List name..."} placeholderColor={(errors.listName && errors.listName.type === "required") ? "red" : "gray"}/>
            <FormControl variant="filled" sx={{width: "100%", height: "100%"}}>
                <InputLabel id="demo-simple-select-label" sx={{color: "black"}}>Event list</InputLabel>
                <Select {...register("listColor", {required: true})} 
                    required={true}
                    sx={{ width: "100%", height: "100%",color: "black", backgroundColor: "white", border: "0.01cm solid black", ":hover": {backgroundColor: "white"}, ":visited": {backgroundColor: "white"}, ":active": {backgroundColor: "white"}}}
                    style={{backgroundColor: "white", color: "black"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select colour"
                    value={eventListColorSelectValue}
                    onChange={(event: SelectChangeEvent) => {setEventListColorSelectValue(event.target.value)}}
                    variant="filled"
                    >
                    {menuItems}
                </Select>
            </FormControl>
            <div className={classes.ButtonContainer}>
                <SubmitButton buttonType="add_circle" formName="listCreatorForm" backgroundColor={eventListColorSelectValue !== "" ? eventListColorSelectValue : "black"} color="white" borderColor="black"/>
            </div>
            <div className={classes.ButtonContainer}>
                <Button buttonType="close" action={() => {closeListCreator()}} color="white" backgroundColor={eventListColorSelectValue !== "" ? eventListColorSelectValue : "black"} borderColor="black"/>
            </div>
        </ListCreatorFormContainer>
    )
}

const ListCreatorFormContainer = styled.form<{backgroundColor: string}>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: ${props => props.backgroundColor !== "" ? props.backgroundColor : "black"};

    @media (min-width: 990px){
        border-radius: 10px;
    }
`

const ListNameInput = styled.input<{placeholderColor: "red" | "gray"}>`
    display: block;
    width: 100%;
    height: 100%;

    background: inherit;
    background-clip: text;
    -webkit-background-clip: text;
    color: red;
    filter: invert(1) grayscale(1);
    -webkit-filter: invert(1) grayscale(1);
    font-size: var(--titleFont);
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    outline: none;
    border-radius: 20px;

    &::placeholder {
        color: ${props => props.placeholderColor}
    }
`
