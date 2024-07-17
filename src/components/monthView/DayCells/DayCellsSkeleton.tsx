import "react-loading-skeleton/dist/skeleton.css";
import { ReactElement } from "react"
import styled from "styled-components"
import { Skeleton } from "@mui/material";

type PropsType = {
    amount: number
}

export const DayCellsSkeleton = (props: PropsType) => {

    let dayCells: Array<ReactElement> = []
    for(let i = 0; i < props.amount; i++){
        dayCells.push(
        <DayCellContainer>
            <Cell />
        </DayCellContainer>)
    }
    
    return (
        <>
            {dayCells}
        </>
    )
}

const DayCellContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 14%;
    aspect-ratio: 1/1;
    &:hover{
        cursor: pointer;
    }
`

const Cell = styled(Skeleton)`
    display: inline;
    width: calc(71.43%);
    aspect-ratio: 1/1.5;
    margin: none;
    padding: none;
    border-radius: 10px;
    animation: wave;
`