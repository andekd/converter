import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";
import {PageObjectFunctions} from '../../../e2e/pageobjectfunctions';

export enum speedElementIds {
    kph,
    mps,
    mph,
    chkBox
}

export class SpeedPO extends PageObjectFunctions {
    
    constructor() {
        super();
        // Populate element id holder from parent
        this.myIds = speedElementIds;
    }

    getTitle() {
        return element(by.id('speedTitle')).getText();
    }

    getBackGroundColor(){
        //style="background-color: rgb(187, 255, 255)
        let theStyle = this.getAttribute(speedElementIds.kph, 'style');
        return theStyle;
    }
}