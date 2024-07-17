import { render, screen } from "@testing-library/react"
import { DayCell } from "./DayCell"

describe("Shows days with correct colour", () => {
    it('Shows current day with another colour', () => {
        render(<DayCell dayNumber={1} isEmpty={false} isCurrentDay={true} hasEvents={false} eventNames={null}/>)
        const dayCell = screen.getByTestId("dayCell")
        expect(dayCell).toHaveStyle({"background-color": "var(--mainColour)"})
    })
    
    it("Shows other days with neutral colour", () => {
        render(<DayCell dayNumber={1} isEmpty={false} isCurrentDay={false} hasEvents={false} eventNames={null}/>)
        const dayCell = screen.getByTestId("dayCell")
        expect(dayCell).toHaveStyle({"background-color": "var(--outlineColour)"})
    })

    it("Shows title with event names", () => {
        render(<DayCell dayNumber={1} isEmpty={false} isCurrentDay={false} hasEvents={true} eventNames={["someEvent"]}/>)
        const dayCell = screen.getByTestId("dayCell")
        expect(dayCell).toHaveAttribute("title", "someEvent\n")
    })
})
