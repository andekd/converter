import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";


export class PageObjectFunctions {

    protected theElemMap: Map<string, WebElement> = null;
    protected myIds: any;
    
    
    //Text field functions
    getValueOfTxtField(fieldName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        let theElement = elementMap.get(fieldName);
        return theElement.getAttribute('value');
    }
    setValueOfTxtField(fieldName: string, fieldValue: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        let theElement = elementMap.get(fieldName);
        theElement.sendKeys(fieldValue);
    }
    emptyAndSetTextField(fieldName: string, fieldValue: string, elementMap: Map<string, WebElement> = this.theElemMap){
        let theElement = elementMap.get(fieldName);
        theElement.clear().then(() => {
            theElement.sendKeys(fieldValue);
        })
    }

    //Button function
    clickButton(buttonName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        let theElement = elementMap.get(buttonName);
        theElement.click();
        for (let item in this.myIds) {
            if (isNaN(Number(item))) {
                console.log(item);
            }
        }
        console.log('check if enum');
        console.log(this.myIds[0]);
    }

    //Checkbox functions
    isCheckboxChecked(chkboxName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        let theElement = elementMap.get(chkboxName);
        theElement.isDisplayed
        return theElement.isSelected();
    }
    clickCheckbox(chkboxName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        let theElement = elementMap.get(chkboxName);
        theElement.click();
    }

    //Radiobutton functions
    isRadiobtnChecked(radiobtnName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        let theElement = elementMap.get(radiobtnName);
        return theElement.isSelected().then((sel)=>{
            return sel;
        });
    }
    clickRadiobtn(radiobtnName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        // To fix type incompability between code and runtime a dummy untyped map is needed
        let anonMap = new Map();
        // Make the typed elemMap untyped, in runtime the parsed element is not a WebElemen but a promise that resolves to WebElement
        anonMap = elementMap;
        let theElement = anonMap.get(radiobtnName);
        //Need to click on paren element, probably because that the parent element shades the radiobutton element      
        theElement.element(by.xpath("..")).click();
    }

    //Dropdown list functions
    getValueOfDropDown(dropDownName: string, elementMap: Map<string, WebElement> = this.theElemMap){
        // To fix type incompability between code and runtime a dummy untyped map is needed
        let anonMap = new Map();
        // Make the typed elemMap untyped, in runtime the parsed element is not a WebElemen but a promise that resolves to WebElement
        anonMap = elementMap;
        let theElement = anonMap.get(dropDownName).element(by.css('option:checked'));
        return theElement.getText(); 
    }
    setValueOfDropDown(dropDownName: string, value: string, elementMap: Map<string, WebElement> = this.theElemMap){
        let theElement = elementMap.get(dropDownName);
        theElement.sendKeys(value); 
    }

    //Label function
    getValueOfLabel(fieldName: string, elementMap: Map<string, WebElement> = this.theElemMap) {
        //console.log('Labelnamn: ' + fieldName);
        // To fix type incompability between code and runtime a dummy untyped map is needed
        let anonMap = new Map();
        // Make the typed elemMap untyped, in runtime the parsed element is not a WebElemen but a promise that resolves to WebElement
        anonMap = elementMap;
        let theElement = anonMap.get(fieldName).element(by.xpath('following-sibling::p'));
        return theElement.isDisplayed().then(function(syns){
            if (syns) {
                //console.log('Label visible');
                let txt = theElement.getText();
                //console.log('elementtxt: ' + txt);
                return txt;
            } else {
                return 'not visible';
            }
        });
    }
}
