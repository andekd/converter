import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";
import {PageObjectFunctions} from '../../e2e/pageobjectfunctions';

export enum appElementIds {
    title,
    weigth,
    temperature,
    speed
}

export class AppPO extends PageObjectFunctions {
    
    constructor() {
        super();
        // Populate element id holder from parent
        this.myIds = appElementIds;
    }
    navigateTo(){
        return browser.get(browser.baseUrl);
    }

    getTitle() {
        return element(by.css('app-root h1')).getText();
    }
}