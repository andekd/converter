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
    });

    describe('Check that convert functions are correct', function () {
        it('should display welcome message', () => {
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
                expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(currentCelsius).then(() => { console.log('Testing with: ' + currentCelsius + ' degrees celsius') });;
                expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(currentFahrenheit, fahrenheitErrMsg);
                expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(currentKelvin, kelvinErrMsg);
            }
            browser.sleep(browserSleep);
        });

    });
});