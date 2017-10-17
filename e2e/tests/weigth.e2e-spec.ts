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
        it('should display welcome message', () => {
            appPage.navigateTo();
            expect(appPage.getTitle()).toEqual('Welcome to Converter!');
        });

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
                let currentKilo = kiloTests[i].kilo;
                let currentPound = kiloTests[i].pound;
                let currentStone = kiloTests[i].stone;
                let kiloErrMsg: string = 'Kilo was not correctly given for: ' + currentKilo + ' kilos';
                let poundErrMsg: string = 'Pound conversion failed for: ' + currentKilo + ' kilos';
                let stoneErrMsg: string = 'Stone conversion failed for: ' + currentKilo + ' kilos';
                weigthPage.emptyAndSetTextField(weigthElementIds.kilograms, currentKilo);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(currentKilo).then(() => { console.log('Testing with: ' + currentKilo + ' kilo') });;
                expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(currentPound, poundErrMsg);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg);
            }
            browser.sleep(browserSleep);
        });
        it('Testing conversion from Pounds', () => {
            let poundTests = valData.weigthTestData.poundtests;
            for (let i in poundTests) {
                let currentKilo = poundTests[i].kilo;
                let currentPound = poundTests[i].pound;
                let currentStone = poundTests[i].stone;
                let kiloErrMsg: string = 'Kilo conversion failed for: ' + currentPound + ' pounds';
                let poundErrMsg: string = 'Pound was not correctly given for: ' + currentPound + ' pounds';
                let stoneErrMsg: string = 'Stone conversion failed for: ' + currentPound + ' pounds';
                weigthPage.emptyAndSetTextField(weigthElementIds.pounds, currentPound);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(currentKilo);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(currentPound, poundErrMsg).then(() => { console.log('Testing with: ' + currentPound + ' pounds') });
                expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg);
            }
            browser.sleep(browserSleep);
        });
        it('Testing conversion from Stones', () => {
            let stoneTests = valData.weigthTestData.stonetests;
            for (let i in stoneTests) {
                let currentKilo = stoneTests[i].kilo;
                let currentPound = stoneTests[i].pound;
                let currentStone = stoneTests[i].stone;
                let kiloErrMsg: string = 'Kilo conversion failed for: : ' + currentStone + ' stones';
                let poundErrMsg: string = 'Pound conversion failed for: ' + currentStone + ' stones';
                let stoneErrMsg: string = 'Stone was not correctly given for: : ' + currentStone + ' stones';
                weigthPage.emptyAndSetTextField(weigthElementIds.stones, currentStone);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(currentKilo);;
                expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(currentPound, poundErrMsg);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg).then(() => { console.log('Testing with: ' + currentStone + ' stones') });
            }
            browser.sleep(browserSleep);
        });
    });

    describe('Check that Accuracy selection is working', function () {

        it('Testing accuracy/rounding', () => {
            let accTests = valData.weigthTestData.decimaltests;
            weigthPage.emptyAndSetTextField(weigthElementIds.kilograms, accTests.kilo4);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(accTests.kilo4).then(() => { console.log('Testing with 4 decimals') });
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(accTests.pound4, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(accTests.stone4, 'Stones not rounded correctly');

            weigthPage.clickRadiobtn(weigthElementIds.three_decimals);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(accTests.kilo3).then(() => { console.log('Testing with 3 decimals') });
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(accTests.pound3, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(accTests.stone3, 'Stones not rounded correctly');

            weigthPage.clickRadiobtn(weigthElementIds.two_decimals);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(accTests.kilo2).then(() => { console.log('Testing with 2 decimals') });
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(accTests.pound2, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(accTests.stone2, 'Stones not rounded correctly');

            weigthPage.clickRadiobtn(weigthElementIds.three_decimals);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(accTests.kilo3).then(() => { console.log('Testing back to 3 decimals') });
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(accTests.pound3, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(accTests.stone3, 'Stones not rounded correctly');

            weigthPage.clickRadiobtn(weigthElementIds.four_decimals);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(accTests.kilo4).then(() => { console.log('Testing back to 4 decimals') });
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(accTests.pound4, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(accTests.stone4, 'Stones not rounded correctly');

            weigthPage.clickRadiobtn(weigthElementIds.two_decimals);
            expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(accTests.kilo2).then(() => { console.log('Testing from 4 to 2 decimals') });
            expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(accTests.pound2, 'Pounds not rounded correctly');
            expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(accTests.stone2, 'Stones not rounded correctly');
        });
        xit('Checking radio button functions', () => {
            expect(weigthPage.isRadiobtnChecked(weigthElementIds.four_decimals)).toBeTruthy();
            weigthPage.clickRadiobtn(weigthElementIds.three_decimals);
            expect(weigthPage.isRadiobtnChecked(weigthElementIds.three_decimals)).toBeTruthy();
            weigthPage.clickRadiobtn(weigthElementIds.two_decimals);
            expect(weigthPage.isRadiobtnChecked(weigthElementIds.two_decimals)).toBeTruthy();
            weigthPage.clickRadiobtn(weigthElementIds.four_decimals);
            expect(weigthPage.isRadiobtnChecked(weigthElementIds.four_decimals)).toBeTruthy();
        });

    })
})