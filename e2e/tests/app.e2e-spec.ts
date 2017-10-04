import { browser } from "protractor";
import { AppPO } from '../../src/app/app.po';
import { appElementIds } from '../../src/app/app.po';
import { SpeedPO } from '../../src/app/speed/speed.po';
import { speedElementIds } from '../../src/app/speed/speed.po';
import { TemperaturePO } from '../../src/app/temperature/temperature.po';
import { temperatureElementIds } from '../../src/app/temperature/temperature.po';
import { WeigthPO } from '../../src/app/weigth/weigth.po';
import { weigthElementIds } from '../../src/app/weigth/weigth.po';

describe('Check detail view presentation', function () {
    let appPage: AppPO = new AppPO();
    let speedPage: SpeedPO = new SpeedPO();
    let tempPage: SpeedPO = new TemperaturePO();
    let weigthPage: SpeedPO = new WeigthPO();
    

    beforeAll(() => {
        //browser.driver.manage().window().maximize();
        browser.sleep(500);
    });

    describe('Check that presentation of the convert functions are correct', function () {
        it('should display welcome message', () => {
            appPage.navigateTo();
            expect(appPage.getTitle()).toEqual('Welcome to Converter!');
          });
        
          it('Check that weigth is default at start', () => {
            appPage.navigateTo();
            expect(weigthPage.getTitle()).toBe('Weigth Conversions');
            browser.sleep(3000);
        });
        it('Check that speed conversions is shown after clicking speed button', () => {
            appPage.navigateTo();
            appPage.clickButton(appElementIds.speed);
            expect(speedPage.getTitle()).toBe('Speed Conversions');
            browser.sleep(3000);
        });
        it('Check that temperature conversions is shown after clicking temperature button', () => {
            appPage.navigateTo();
            appPage.clickButton(appElementIds.temperature);
            expect(tempPage.getTitle()).toBe('Temperature Conversions');
            browser.sleep(3000);
        });
        it('Check that weigth conversions is shown after clicking weigth button', () => {
            appPage.navigateTo();
            appPage.clickButton(appElementIds.weigth);
            expect(weigthPage.getTitle()).toBe('Weigth Conversions');
            browser.sleep(3000);
        });
    })
})