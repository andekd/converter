import { browser, element, by, ElementArrayFinder, protractor } from 'protractor';
import WebElement = webdriver.WebElement;
import * as webdriver from "selenium-webdriver";


export class PageObjectFunctions {

    protected myIds: any;
    
    
    //Text field functions
    getValueOfTxtField(elemmNbr: number) {
        let theElement = element(by.id(this.myIds[elemmNbr]));;
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
        //Need to click on paren element, probably because that the parent element shades the radiobutton element      
        theElement.element(by.xpath("..")).click();
    }

    //Dropdown list functions
    getValueOfDropDown(elemmNbr: number){
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        return theElement.getText(); 
    }
    setValueOfDropDown(elemmNbr: number, value: string){
        let theElement = element(by.id(this.myIds[elemmNbr]));;
        theElement.sendKeys(value); 
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
}
