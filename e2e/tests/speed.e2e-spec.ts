import { browser } from "protractor";
import { AppPO } from '../../src/app/app.po';
import { appElementIds } from '../../src/app/app.po';
import { SpeedPO } from '../../src/app/speed/speed.po';
import { speedElementIds } from '../../src/app/speed/speed.po';
import { SpeedData } from '../testdata/speeddata';

describe('Check functionality of speed view', function () {
    let appPage: AppPO = new AppPO();
    let speedPage: SpeedPO = new SpeedPO();
    let valData: SpeedData = new SpeedData();
    let browserSleep: number = browser.testSleepTime;

    beforeAll(() => {
        //browser.driver.manage().window().maximize();
        browser.sleep(browserSleep);
        appPage.navigateTo();
    });

    describe('Check that convert functions are correct', function () {

        function checkResults(test, index, errMsg) {
            let currentKph = test[index].kph;
            let currentMps = test[index].mps;
            let currentMph = test[index].mph;
            expect(speedPage.getValueOfTxtField(speedElementIds.kph)).toBe(currentKph, errMsg);
            expect(speedPage.getValueOfTxtField(speedElementIds.mps)).toBe(currentMps, errMsg);
            expect(speedPage.getValueOfTxtField(speedElementIds.mph)).toBe(currentMph, errMsg);
        }

        it('Check that speed title is shown upon selection', () => {
            appPage.clickButton(appElementIds.speed);
            expect(speedPage.getTitle()).toBe('Speed Conversions');
            browser.sleep(browserSleep);
        });

        it('Testing conversion from km/h', () => {
            let kpsTests = valData.speedTestData.kph;

            for (let i in kpsTests) {
                (function (index) {
                    console.log('Testing with: ' + kpsTests[i].kph + ' km/h')
                    let kphErrMsg: string = 'Km/s conversion failed for: ' + kpsTests[i].kph + ' km/s';
                    speedPage.emptyAndSetTextField(speedElementIds.kph, kpsTests[i].kph);
                    checkResults(kpsTests, index, kphErrMsg);
                })(i)
                browser.sleep(browserSleep);
            }
        });

        it('Testing conversion from m/s', () => {
            let mpsTests = valData.speedTestData.mps;
            for (let i in mpsTests) {
                (function (index) {
                    console.log('Testing with: ' + mpsTests[i].mps + ' m/s')
                    let mpsErrMsg: string = 'Meter/s conversion failed for: ' + mpsTests[i].mps + ' m/s';
                    speedPage.emptyAndSetTextField(speedElementIds.mps, mpsTests[i].mps);
                    checkResults(mpsTests, index, mpsErrMsg);
                    browser.sleep(browserSleep);
                })(i)
            }
        });

        it('Testing conversion from mph', () => {
            let mphTests = valData.speedTestData.mph;
            for (let i in mphTests) {
                (function (index) {
                    console.log('Testing with: ' + mphTests[i].mph + ' mph')
                    let mphErrMsg: string = 'Miles/h conversion failed for: ' + mphTests[i].mph + ' mph';
                    speedPage.emptyAndSetTextField(speedElementIds.mph, mphTests[i].mph);
                    checkResults(mphTests, index, mphErrMsg);
                })(i)
                browser.sleep(browserSleep);
            }
        });
    });

    describe('Check that background color changes', function () {

        it('Set and check background color', () => {
            let colTests = valData.speedTestData.colortests;
            //check default background
            expect(speedPage.getBackGroundColor()).toBe('background-color: rgb(187, 255, 255);');
            // click checkbox to change background color
            speedPage.clickCheckbox(speedElementIds.chkBox);
            expect(speedPage.getBackGroundColor()).toBe('background-color: rgb(255, 136, 136);');
            browser.sleep(browserSleep);
        });
    })
})