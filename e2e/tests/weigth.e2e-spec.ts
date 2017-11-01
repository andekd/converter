import { browser } from "protractor";
import { AppPO } from '../../src/app/app.po';
import { appElementIds } from '../../src/app/app.po';
import { WeigthPO } from '../../src/app/weigth/weigth.po';
import { weigthElementIds } from '../../src/app/weigth/weigth.po';
import { WeigthData } from '../testdata/weigthdata';

describe('Check functionality of weigth view', function () {
    let appPage: AppPO = new AppPO();
    let weigthPage: WeigthPO = new WeigthPO();
    let browserSleep: number = 500;
    let valData: WeigthData = new WeigthData();

    beforeAll(() => {
        //browser.driver.manage().window().maximize();
        browser.sleep(browserSleep);
    });

    describe('Check that convert functions are correct', function () {

        function checkResults(test, index) {
            let currentKilo = test[index].kilo;
            let currentPound = test[index].pound;
            let currentStone = test[index].stone;
            let kiloErrMsg: string = 'Kilo conversion failed for: ' + currentKilo + ' kilos';
            let poundErrMsg: string = 'Pound conversion failed for: ' + currentKilo + ' kilos';
            let stoneErrMsg: string = 'Stone conversion failed for: ' + currentKilo + ' kilos';
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(currentKilo)
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(currentPound, poundErrMsg);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg);
        }

        it('Check that weigth is default at start', () => {
            expect(weigthPage.getTitle()).toBe('Weigth Conversions');
            browser.sleep(browserSleep);
        });
        
        it('Check that accuracy is default 4 decimal', () => {
            expect(weigthPage.isRadiobtnChecked(weigthElementIds.four_decimals)).toBeTruthy();
            browser.sleep(browserSleep);
        });

        it('Testing conversion from kilos', () => {
            let kiloTests = valData.weigthTestData.kilotests;
            for (let i in kiloTests) {
                (function (index) {
                    console.log('Testing with: ' + kiloTests[i].kilo + ' kilo')
                    weigthPage.emptyAndSetTextField(weigthElementIds.kilograms, kiloTests[i].kilo);
                    checkResults(kiloTests, index);
                })(i)
            }
            browser.sleep(browserSleep);
        });


        it('Testing conversion from Pounds', () => {
            let poundTests = valData.weigthTestData.poundtests;
            for (let i in poundTests) {
                (function (index) {
                    console.log('Testing with: ' + poundTests[i].pound + ' pounds')
                    weigthPage.emptyAndSetTextField(weigthElementIds.pounds, poundTests[i].pound);
                    checkResults(poundTests, index);
                })(i)
            }
            browser.sleep(browserSleep);
        });
        
        it('Testing conversion from Stones', () => {
            let stoneTests = valData.weigthTestData.stonetests;
            for (let i in stoneTests) {
                (function (index) {
                    console.log('Testing with: ' + stoneTests[i].stone + ' stones')
                    weigthPage.emptyAndSetTextField(weigthElementIds.stones, stoneTests[i].stone);
                checkResults(stoneTests, index);
            })(i)
            }
            browser.sleep(browserSleep);
        });
    });

    describe('Check that Accuracy selection is working', function () {

        function checkResults(expKilo, expPound, expStone, nbrOfDecimals: number) {
            console.log('Testing with ' + nbrOfDecimals + ' decimals');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(expKilo, 'Kilograms not rounded correctly')
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(expPound, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(expStone, 'Stones not rounded correctly');
        }

        it('Testing accuracy/rounding', () => {
            let accTests = valData.weigthTestData.decimaltests;
            weigthPage.emptyAndSetTextField(weigthElementIds.kilograms, accTests.kilo4);
            checkResults(accTests.kilo4, accTests.pound4, accTests.stone4, 4);

            weigthPage.clickRadiobtn(weigthElementIds.three_decimals);
            checkResults(accTests.kilo3, accTests.pound3, accTests.stone3, 3);
            
            weigthPage.clickRadiobtn(weigthElementIds.two_decimals);
            checkResults(accTests.kilo2, accTests.pound2, accTests.stone2, 2);
            
            weigthPage.clickRadiobtn(weigthElementIds.three_decimals);
            checkResults(accTests.kilo3, accTests.pound3, accTests.stone3, 3);
            
            weigthPage.clickRadiobtn(weigthElementIds.four_decimals);
            checkResults(accTests.kilo4, accTests.pound4, accTests.stone4, 4);
            
            weigthPage.clickRadiobtn(weigthElementIds.two_decimals);
            checkResults(accTests.kilo2, accTests.pound2, accTests.stone2, 2);
        });
    })
})