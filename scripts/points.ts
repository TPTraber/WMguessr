import { getRequiredElement } from "./util/uiUtil";

var pointText = getRequiredElement("points");

function updatePointDisplay(pointTotal : string){
    pointText.textContent = pointTotal;
}