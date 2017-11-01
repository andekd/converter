import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";
import {PageObjectFunctions} from '../../../e2e/pageobjectfunctions';

export enum temperatureElementIds {
    celsius,
    fahrenheit,
    kelvin,
    accDD
}

export class TemperaturePO extends PageObjectFunctions {
    
    constructor() {
        super();
        // Populate element id holder from parent
        this.myIds = temperatureElementIds;
    }

    getTitle() {
        return element(by.id('temperatureTitle')).getText();
    }
}