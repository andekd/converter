import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";
import {PageObjectFunctions} from '../../../e2e/pageobjectfunctions';

export enum weigthElementIds {
    kilograms,
    pounds,
    stones
}

export class WeigthPO extends PageObjectFunctions {
    
    constructor() {
        super();
        this.myIds = weigthElementIds;
    }

    getTitle() {
        return element(by.id('weigthTitle')).getText();
    }
}