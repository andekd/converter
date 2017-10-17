import { browser } from "protractor";
import { AppPO } from '../../src/app/app.po';
import { appElementIds } from '../../src/app/app.po';
import { TemperaturePO } from '../../src/app/temperature/temperature.po';
import { temperatureElementIds } from '../../src/app/temperature/temperature.po';
import { TemperatureData } from '../testdata/temperaturedata';

describe('Check functionality of temperature view', function () {
    let appPage: AppPO = new AppPO();
    let tempPage: TemperaturePO = new TemperaturePO();
    let browserSleep: number = 500;
    let valData: TemperatureData = new TemperatureData();

    beforeAll(() => {
        //browser.driver.manage().window().maximize();
        browser.sleep(browserSleep);
        appPage.navigateTo();
    });

    describe('Check that convert functions are correct', function () {
        xit('should display welcome message', () => {
            appPage.navigateTo();
            expect(appPage.getTitle()).toEqual('Welcome to Converter!');
        });

        it('Show temperature view', () => {
            appPage.clickButton(appElementIds.temperature);
            expect(tempPage.getTitle()).toBe('Temperature Conversions');
        });
        it('Check that accuracy is default 4 decimal', () => {
            expect(tempPage.getValueOfDropDown(temperatureElementIds.accDD)).toBe('four');
            browser.sleep(browserSleep);
        });
        it('Testing conversion from celsius', () => {
            let celsiusTests = valData.temperatureTestData.celsiustests;
            for (let i in celsiusTests) {
                let currentCelsius = celsiusTests[i].celsius;
                let currentFahrenheit = celsiusTests[i].fahrenheit;
                let currentKelvin = celsiusTests[i].kelvin;
                let celsiusErrMsg: string = 'Celsius was not correctly given for: ' + currentCelsius;
                let fahrenheitErrMsg: string = 'Fahrenheit conversion failed for: ' + currentCelsius;
                let kelvinErrMsg: string = 'Kelvin conversion failed for: ' + currentCelsius;
                tempPage.emptyAndSetTextField(temperatureElementIds.celsius, currentCelsius);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(currentCelsius, celsiusErrMsg).then(() => { console.log('Testing with: ' + currentCelsius + ' degrees celsius') });;
                expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(currentFahrenheit, fahrenheitErrMsg);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(currentKelvin, kelvinErrMsg);
            }
            browser.sleep(browserSleep);
        });
        it('Testing conversion from fahrenheit', () => {
            let fahrenheitTests = valData.temperatureTestData.fahrenheittests;
            for (let i in fahrenheitTests) {
                let currentCelsius = fahrenheitTests[i].celsius;
                let currentFahrenheit = fahrenheitTests[i].fahrenheit;
                let currentKelvin = fahrenheitTests[i].kelvin;
                let celsiusErrMsg: string = 'Celsius conversion failed for: ' + currentCelsius;
                let fahrenheitErrMsg: string = 'Fahrenheit was not correctly given for: ' + currentCelsius;
                let kelvinErrMsg: string = 'Kelvin conversion failed for: ' + currentCelsius;
                tempPage.emptyAndSetTextField(temperatureElementIds.fahrenheit, currentFahrenheit);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(currentCelsius, celsiusErrMsg).then(() => { console.log('Testing with: ' + currentFahrenheit + ' degrees fahrenheit') });;
                expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(currentFahrenheit, fahrenheitErrMsg);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(currentKelvin, kelvinErrMsg);
            }
            browser.sleep(browserSleep);
        });
        it('Testing conversion from kelvin', () => {
            let kelvinTests = valData.temperatureTestData.kelvintests;
            for (let i in kelvinTests) {
                let currentCelsius = kelvinTests[i].celsius;
                let currentFahrenheit = kelvinTests[i].fahrenheit;
                let currentKelvin = kelvinTests[i].kelvin;
                let celsiusErrMsg: string = 'Celsius conversion failed for: ' + currentCelsius;
                let fahrenheitErrMsg: string = 'Fahrenheit conversion failed for: ' + currentCelsius;
                let kelvinErrMsg: string = 'Kelvin  was not correctly given for: ' + currentCelsius;
                tempPage.emptyAndSetTextField(temperatureElementIds.fahrenheit, currentFahrenheit);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(currentCelsius, celsiusErrMsg).then(() => { console.log('Testing with: ' + currentKelvin + ' degrees kelvin') });;
                expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(currentFahrenheit, fahrenheitErrMsg);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(currentKelvin, kelvinErrMsg);
            }
            browser.sleep(browserSleep);
        });
    });
    describe('Check that Accuracy selection is working', function () {

        it('Testing accuracy/rounding', () => {

            let accTests = valData.temperatureTestData.decimaltests2;
            tempPage.emptyAndSetTextField(temperatureElementIds.celsius, accTests.four.celsius);
            
            let curCelsius = tempPage.getValueOfTxtField(temperatureElementIds.celsius);
            let curFahrenheit = tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit);
            let curKelvin = tempPage.getValueOfTxtField(temperatureElementIds.kelvin);

            console.log(accTests.four.celsius);
            let key;
            for (key in accTests) {
                (function (theKey){
                    console.log('Number of decimals: ' + theKey);
                    tempPage.setValueOfDropDown(temperatureElementIds.accDD, theKey);
                    checkValues(theKey);
                })(key)
                browser.sleep(900);
            }
            //Check that no decimals were forgotten
            console.log('Back to four');
            tempPage.setValueOfDropDown(temperatureElementIds.accDD, 'four');
            checkValues('four');

            function checkValues(currentKey){
                expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(accTests[currentKey].celsius, 'Celsius not rounded correctly')
                expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(accTests[currentKey].fahrenheit, 'Celsius not rounded correctly')
                expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(accTests[currentKey].kelvin, 'Celsius not rounded correctly')
            }
        });
    });
});