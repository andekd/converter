import { browser } from "protractor";
import { AppPO } from '../../src/app/app.po';
import { appElementIds } from '../../src/app/app.po';
import { TemperaturePO } from '../../src/app/temperature/temperature.po';
import { temperatureElementIds } from '../../src/app/temperature/temperature.po';
import { TemperatureData } from '../testdata/temperaturedata';

describe('Check functionality of temperature view', function () {
    let appPage: AppPO = new AppPO();
    let tempPage: TemperaturePO = new TemperaturePO();
    let browserSleep: number = browser.testSleepTime;
    let valData: TemperatureData = new TemperatureData();

    beforeAll(() => {
        //browser.driver.manage().window().maximize();
        browser.sleep(browserSleep);
        appPage.navigateTo();
    });

    describe('Check that convert functions are correct', function () {

        function checkValues(test, index, testFrom) {
            console.log('Testing with: ' + test[index].celsius + ' degrees ' + testFrom)
            expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(test[index].celsius, 'Celsius not rounded correctly');
            expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(test[index].fahrenheit, 'Fahrenheit not rounded correctly');
            expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(test[index].kelvin, 'Kelvin not rounded correctly');
        }

        it('Show temperature view', () => {
            appPage.clickButton(appElementIds.temperature);
            expect(tempPage.getTitle()).toBe('Temperature Conversions');
        });

        it('Check that accuracy is default 4 decimal', () => {
            expect(tempPage.getValueOfDropDown(temperatureElementIds.accDD)).toBe('four');
        });

        it('Testing conversion from celsius', () => {
            let celsiusTests = valData.temperatureTestData.celsiustests;
            for (let i in celsiusTests) {
                (function (index) {
                    let currentCelsius = celsiusTests[i].celsius;
                    let currentFahrenheit = celsiusTests[i].fahrenheit;
                    let currentKelvin = celsiusTests[i].kelvin;
                    let celsiusErrMsg: string = 'Celsius was not correctly given for: ' + currentCelsius;
                    let fahrenheitErrMsg: string = 'Fahrenheit conversion failed for: ' + currentCelsius;
                    let kelvinErrMsg: string = 'Kelvin conversion failed for: ' + currentCelsius;
                    tempPage.emptyAndSetTextField(temperatureElementIds.celsius, currentCelsius);
                    checkValues(celsiusTests, index, 'celsius');
                    browser.sleep(browserSleep);
                })(i)
            }
        });

        it('Testing conversion from fahrenheit', () => {
            let fahrenheitTests = valData.temperatureTestData.fahrenheittests;
            for (let i in fahrenheitTests) {
                (function (index) {
                    let currentCelsius = fahrenheitTests[i].celsius;
                    let currentFahrenheit = fahrenheitTests[i].fahrenheit;
                    let currentKelvin = fahrenheitTests[i].kelvin;
                    let celsiusErrMsg: string = 'Celsius conversion failed for: ' + currentCelsius;
                    let fahrenheitErrMsg: string = 'Fahrenheit was not correctly given for: ' + currentCelsius;
                    let kelvinErrMsg: string = 'Kelvin conversion failed for: ' + currentCelsius;
                    tempPage.emptyAndSetTextField(temperatureElementIds.fahrenheit, currentFahrenheit);
                    checkValues(fahrenheitTests, index, 'fahrenheit');
                    browser.sleep(browserSleep);
                })(i)
            }
        });

        it('Testing conversion from kelvin', () => {
            let kelvinTests = valData.temperatureTestData.kelvintests;
            for (let i in kelvinTests) {
                (function (index) {
                    let currentCelsius = kelvinTests[i].celsius;
                    let currentFahrenheit = kelvinTests[i].fahrenheit;
                    let currentKelvin = kelvinTests[i].kelvin;
                    let celsiusErrMsg: string = 'Celsius conversion failed for: ' + currentCelsius;
                    let fahrenheitErrMsg: string = 'Fahrenheit conversion failed for: ' + currentCelsius;
                    let kelvinErrMsg: string = 'Kelvin  was not correctly given for: ' + currentCelsius;
                    tempPage.emptyAndSetTextField(temperatureElementIds.fahrenheit, currentFahrenheit);
                    checkValues(kelvinTests, index, 'kelvin');
                    browser.sleep(browserSleep);
                })(i)
            }
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
            let browserWinNbr = 0;
            for (key in accTests) {
                (function (theKey) {
                    console.log('Number of decimals: ' + theKey);
                // for some reason setting of drop down is much faster than setting of check boxes
                // this means that setting of next accuracy will occur before evaluation of current accuracy is done
                // wich ofc means that test will fail (waitForAngular does not work)
                // So here we will open each accuracy test in it's own browsertab, so that each setting has a unique result
                        browser.executeScript('window.open()').then(function () {
                        browserWinNbr++;
                        browser.getAllWindowHandles().then(handles => {
                            browser.switchTo().window(handles[browserWinNbr]); // 0 or 1 to switch between the 2 open windows
                            appPage.navigateTo();
                            appPage.clickButton(appElementIds.temperature);
                            tempPage.emptyAndSetTextField(temperatureElementIds.celsius, accTests.four.celsius);
                            tempPage.setValueOfDropDown(temperatureElementIds.accDD, theKey);
                            checkValues(theKey);
                        });
                    });
                })(key)
            }
            /*
            //Check that no decimals were forgotten
            browser.getAllWindowHandles().then(handles => {
                browser.switchTo().window(handles[0]); // back to default window
                appPage.navigateTo();
            });
            console.log('Back to four');
            tempPage.setValueOfDropDown(temperatureElementIds.accDD, 'four');
            checkValues('four');
            browser.sleep(browserSleep);
            */
            function checkValues(currentKey) {
                expect(tempPage.getValueOfTxtField(temperatureElementIds.celsius)).toBe(accTests[currentKey].celsius, 'Celsius not rounded correctly');
                expect(tempPage.getValueOfTxtField(temperatureElementIds.fahrenheit)).toBe(accTests[currentKey].fahrenheit, 'Celsius not rounded correctly');
                expect(tempPage.getValueOfTxtField(temperatureElementIds.kelvin)).toBe(accTests[currentKey].kelvin, 'Celsius not rounded correctly');
            }
        });
    });
});