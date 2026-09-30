import { getRequiredElement } from "./util/uiUtil";

var pointText = getRequiredElement("points");

export function updatePointDisplay(pointTotal : string){
    pointText.textContent = pointTotal;
}