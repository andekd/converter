import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";


export class PageObjectFunctions {

    protected myIds: any;
    
    
    //Text field functions
    getValueOfTxtField(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));
        return theElement.getAttribute('value');
    }
    setValueOfTxtField(elemmNbr: number, fieldValue: string) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.sendKeys(fieldValue);
    }
    emptyAndSetTextField(elemmNbr: number, fieldValue: string){
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.clear().then(() => {
            theElement.sendKeys(fieldValue);
        })
    }
    clickTxtField(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.click();
    }
    
    //Button function
    clickButton(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.click();
    }

    //Checkbox functions
    isCheckboxChecked(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        return theElement.isSelected();
    }
    clickCheckbox(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.click();
    }

    //Radiobutton functions
    isRadiobtnChecked(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        return theElement.isSelected().then((sel)=>{
            return sel;
        });
    }
    clickRadiobtn(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.click();
    }

    //Dropdown list functions
    getValueOfDropDown(elemmNbr: number){
        let theElement = element(by.id(this.myIds[elemmNbr])).element(by.css('option:checked'));;
        return theElement.getText().then((theText) => {
            let cleanedTxt = theText.trim();
            return cleanedTxt;
        }); 
    }
    setValueOfDropDown(elemmNbr: number, value: string){
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.sendKeys(value); 
        return theElement.getText().then((theText) => {
            //Remove leading and trailing blanks
            let cleanedTxt = theText.trim();
            return cleanedTxt;
        }); 
    }

    //Label function
    getValueOfLabel(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
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

    //get named attribute
    getAttribute(elemmNbr: number, attrName: string) {
        let theElement = element(by.id(this.myIds[elemmNbr]));
        return theElement.getAttribute(attrName);
    }
}
