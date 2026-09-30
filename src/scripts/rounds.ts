import { getRequiredElement } from "./util/uiUtil";

var roundText = getRequiredElement("rounds");

export function updateRoundDisplay(round : number, roundTotal : number){
    roundText.textContent = round + "/" + roundTotal;
}