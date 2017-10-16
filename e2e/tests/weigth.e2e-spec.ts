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

    describe('Check that presentation of the convert functions are correct', function () {
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
            weigthPage.setValueOfTxtField(weigthElementIds.kilograms, '1');
            let kiloTests = valData.weigthTestData.kilotests;
            for (let i in kiloTests) {
                let currentKilo = kiloTests[i].kilo;
                let currentPound = kiloTests[i].pound;
                let currentStone = kiloTests[i].stone;
                let kiloErrMsg: string = 'Kilo was not correctly given for: ' + currentKilo + ' kilos';
                let poundErrMsg: string = 'Pound conversion failed for: ' + currentKilo + ' kilos';
                let stoneErrMsg: string = 'Stone conversion failed for: ' + currentKilo + ' kilos';
                weigthPage.emptyAndSetTextField(weigthElementIds.kilograms, currentKilo);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.kilograms)).toBe(currentKilo).then(()=>{console.log('Testing with: ' + currentKilo + ' kilo')});;
                expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(currentPound, poundErrMsg);
                expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg);
            }
            browser.sleep(browserSleep);
        });
        it('Testing conversion from Pounds', () => {
            weigthPage.setValueOfTxtField(weigthElementIds.kilograms, '1');
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
                expect(weigthPage.getValueOfTxtField(weigthElementIds.pounds)).toBe(currentPound, poundErrMsg).then(()=>{console.log('Testing with: ' + currentPound + ' pounds')});
                expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg);
            }
            browser.sleep(browserSleep);
        });
        it('Testing conversion from Stones', () => {
            weigthPage.setValueOfTxtField(weigthElementIds.kilograms, '1');
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
                expect(weigthPage.getValueOfTxtField(weigthElementIds.stones)).toBe(currentStone, stoneErrMsg).then(()=>{console.log('Testing with: ' + currentStone + ' stones')});
            }
            browser.sleep(browserSleep);
        });
    })
})