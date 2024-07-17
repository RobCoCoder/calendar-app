import { Input } from "@mui/base";
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider, createTheme, useColorScheme } from "@mui/material";
import { Controller, SubmitHandler, useFieldArray, useForm, useFormContext } from "react-hook-form";
import styled from "styled-components"
import { selectEventLists, selectEventListsNames } from "../../Redux/selectors/EventsSelectors";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store";
import { ReactElement, useEffect, useState } from "react";
import { EventType, createEventTC, fetchEventListsTC, updateEventTC } from "../../Redux/EventsReducer";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    }
});

type Inputs = {
    eventName: string,
    eventList: string,
    description: string,
    URLs: Array<string>
}

type PropsType = {
    event: EventType | null
    backgroundDropperColor: string | null
    setBackgroundDropperColor: (backgroundDropper: string) => void
}

export const EventUpserterForm = (props: PropsType) => {
    const dispatch = useAppDispatch()

    const { 
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            eventName: props.event ? props.event.eventName : "",
            eventList: props.event ? props.event.eventList : ""
        },
    });
    // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    //     control, // control props comes from useForm (optional: if you are using FormProvider)
    //     name: "test", // unique name for your Field Array
    // });

    //state
    const eventLists = useAppSelector((state: RootState) => selectEventLists(state))

    //local state
    const [eventListSelectValue, setEventListSelectValue] = useState(props.event ? props.event.eventList : '')
    const [startDatePickerValue, setStartDatePickerValue] = useState<Dayjs | null>(dayjs().set('year', new Date().getFullYear()).set('month', new Date().getMonth()).set("day", new Date().getDate()))
    const [endDatePickerValue, setEndDatePickerValue] = useState<Dayjs | null>(dayjs().set('year', new Date().getFullYear()).set('month', new Date().getMonth()+1).set("day", new Date().getDate()))
    const [startTimePickerValue, setStartTimePickerValue] = useState<Dayjs | null>(dayjs().set("hour", 15).set("minute", 30))
    const [endTimePickerValue, setEndTimePickerValue] = useState<Dayjs | null>(dayjs().set("hour", 16).set("minute", 15))

    const eventListsMenuItems: ReactElement[] = eventLists.map((listObject) => {
        return <MenuItem sx={{backgroundColor: listObject.accentColor, border: "0.001cm solid rgb(56, 53, 53)", borderRadius: "20px", margin: "10px", transition: "box-shadow 0.5s", ":hover": {backgroundColor: listObject.accentColor ,boxShadow: `0 0.1cm 0.4cm ${listObject.accentColor}`}}} value={listObject.eventList}>{listObject.eventList}</MenuItem>
    }) 

    useEffect(() => {
        dispatch(fetchEventListsTC())
    }, [])

    useEffect(() => {
        if(eventListSelectValue !== ''){
            let accentColor = ""
            eventLists.forEach((obj) => {
                if(obj.eventList === eventListSelectValue)
                    accentColor = obj.accentColor
            })
            props.setBackgroundDropperColor(accentColor)
        }
    }, [eventListSelectValue])

    const onSubmit: SubmitHandler<Inputs> = data => {
        if(!props.event){
            if(startDatePickerValue && startTimePickerValue && endDatePickerValue && endTimePickerValue){
                dispatch(createEventTC(data.eventList, data.eventName, {year: startDatePickerValue.year(), month: startDatePickerValue.month()+1, day: startDatePickerValue.date(), hour: startTimePickerValue.hour(), minute: startTimePickerValue.minute()}, {year: endDatePickerValue.year(), month: endDatePickerValue.month()+1, day: endDatePickerValue.date(), hour: endTimePickerValue.hour(), minute: endTimePickerValue.minute()}))
            }
        }
        else {
            if(startDatePickerValue && startTimePickerValue && endDatePickerValue && endTimePickerValue){
                dispatch(updateEventTC(props.event._id,
                    data.eventList,
                    data.eventName,
                    {year: startDatePickerValue.year(), month: startDatePickerValue.month()+1, day: startDatePickerValue.date(), hour: startTimePickerValue.hour(), minute: startTimePickerValue.minute()}, 
                    {year: endDatePickerValue.year(), month: endDatePickerValue.month()+1, day: endDatePickerValue.date(), hour: endTimePickerValue.hour(), minute: endTimePickerValue.minute()}
                ))
            }
        }
    };

    return (
        <EventCreatorFormContainer id="eventUpserterForm" onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* event list */}
                <FormControl variant="filled" sx={{width: "80%", margin: "0 auto", marginBottom: "25px"}}>
                    <InputLabel id="demo-simple-select-label" sx={{color: "black"}}>Event list</InputLabel>
                    <Select {...register("eventList", {required: true})} 
                        required={true}
                        sx={{ width: "100%",color: "black", backgroundColor: "white", border: "0.01cm solid black", ":hover": {backgroundColor: "white"}, ":visited": {backgroundColor: "white"}, ":active": {backgroundColor: "white"}}}
                        style={{backgroundColor: "white"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Event list"
                        value={eventListSelectValue}
                        onChange={(event: SelectChangeEvent) => {setEventListSelectValue(event.target.value)}}
                        variant="filled"
                        >
                        {eventListsMenuItems}
                    </Select>
                </FormControl>
                {/* event name */}
                <InputField {...register("eventName")} required={true} sx={{borderTopRightRadius: '10px', borderTopLeftRadius: '10px', marginBottom: "30px", border: "0.01cm solid black"}} id="outlined-basic" label="Event name" color="primary" variant="filled"/>
                <StartEndTimeInputContainer>
                    {/* event start date */}
                    <DemoItem label="Event start date" sx={{width: "45%",backgroundColor: "white", border: "0.01cm solid black", borderRadius: "10px", textAlign: "center"}}>
                        <MobileDatePicker defaultValue={dayjs(startDatePickerValue)} sx={{'.MuiPickersToolbar-root': {backgroundColor: props.backgroundDropperColor ? props.backgroundDropperColor : "black"}, backgroundColor: "white", border: "0.01cm solid black", borderRadius: "5px"}} onChange={(newValue) => {debugger; setStartDatePickerValue(newValue)}}/>
                    </DemoItem>
                    {/* event start time */}
                    <DemoItem label="Event start time" sx={{width: "45%",backgroundColor: "white", border: "0.01cm solid black", borderRadius: "10px", textAlign: "center"}}>
                        <MobileTimePicker  ampm={false} defaultValue={dayjs(startTimePickerValue)} sx={{backgroundColor: "white", border: "0.01cm solid black", borderRadius: "5px"}} onChange={(newValue) => setStartTimePickerValue(newValue)}/>
                    </DemoItem>
                </StartEndTimeInputContainer>
                <StartEndTimeInputContainer>
                    {/* event start date */}
                    <DemoItem label="Event end date" sx={{width: "45%",backgroundColor: "white", border: "0.01cm solid black", borderRadius: "10px", textAlign: "center"}}>
                        <MobileDatePicker defaultValue={dayjs(endDatePickerValue)} sx={{backgroundColor: "white", border: "0.01cm solid black", borderRadius: "5px"}} onChange={(newValue) => setEndDatePickerValue(newValue)}/>
                    </DemoItem>
                    {/* event start time */}
                    <DemoItem label="Event end time" sx={{width: "45%",backgroundColor: "white", border: "0.01cm solid black", borderRadius: "10px", textAlign: "center"}}>
                        <MobileTimePicker ampm={false} defaultValue={dayjs(endTimePickerValue)} sx={{backgroundColor: "white", border: "0.01cm solid black", borderRadius: "5px"}} onChange={(newValue) => setEndTimePickerValue(newValue)}/>
                    </DemoItem>
                </StartEndTimeInputContainer>
            </LocalizationProvider>
        </ThemeProvider>
        </EventCreatorFormContainer>
    )
}

const EventCreatorFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 100%;

    z-index: 300;
`

const InputField = styled(TextField)`
    display: block;
    position: relative;
    width: 80%;

    margin: 0 auto;
    background-color: white;
`

const StartEndTimeInputContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin-bottom: 30px;
`