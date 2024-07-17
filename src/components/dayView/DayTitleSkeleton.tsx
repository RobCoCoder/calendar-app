import { Skeleton } from "@mui/material"
import styled from "styled-components"

export const DayTitleSkeleton = () => {
    return (
        <TitleSkeleton/>
    )
}

const TitleSkeleton = styled(Skeleton)`
    display: block;
    width: 50%;
    height: 50%;
    aspect-ratio: 1/0.2;
`