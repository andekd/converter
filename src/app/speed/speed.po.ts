import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";
import {PageObjectFunctions} from '../../../e2e/pageobjectfunctions';

export enum speedElementIds {
    kph,
    mps,
    mph
}

export class SpeedPO extends PageObjectFunctions {
    
    constructor() {
        super();
        this.myIds = speedElementIds;
    }

    getTitle() {
        return element(by.id('speedTitle')).getText();
    }
}