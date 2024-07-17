import { compose } from "redux";
import { withDaysAmount } from "../../../hoc/withDaysAmount";
import { withFirstLastWeekDayOfMonth } from "../../../hoc/withFirstLastWeekDayOfMonth";
import { DayCells } from "./DayCells";

const DayCellsContainer = compose<React.ComponentType>(withDaysAmount, withFirstLastWeekDayOfMonth)(DayCells)
export default DayCellsContainer