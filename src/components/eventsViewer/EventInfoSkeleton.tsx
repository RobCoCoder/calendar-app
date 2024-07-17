import { Skeleton } from "@mui/material"
import styled from "styled-components"

export const EventInfoSkeleton = () => {
    return (
        <EventInfoSkeletonContainer variant="rounded" width={"calc(95% - 10px)"} height={"200px"} sx={{borderRadius: "20px", backgroundColor: "rgba(155, 159, 167, 0.41)"}} >
        </EventInfoSkeletonContainer>
    )
}

const EventInfoSkeletonContainer = styled(Skeleton)`
    display: flex; 
    flex-direction: column;
    padding: 5px;
`