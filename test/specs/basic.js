const { studio_userName, studio_password, studio_serverUrl } = require('../../config/config');
const { sbuxUsers } = require('../../config/sbux');

describe('Integrations page', () => {
    it('can create locations', () => {
        browser.url(studio_serverUrl);
        $("#username").setValue( studio_userName );
        $("#password").setValue( studio_password );
        $("//input[@type='submit']").click();
        const key = 'environment';
        const value = 'MBM';

        expect(browser).toHaveTitle('Menuboard Manager® Studio');

        $("#env-selector").click();
        $("//header/fly-out[@id='env-selector']/ul[1]/li[1]").click();
        
        const elem = $("//header/button[2]");
        expect(elem).toHaveText("Content");  

        $("button.active-app").click();

        $("//a[contains(text(),'Integrations')]").click();
        expect(elem).toHaveText("Integrations");  
        // add location
        $("//header/div[3]/button[1]").click();

        const modal = $("//h1[contains(text(),'Add Location')]")
        expect(modal).toHaveText("Add Location");

        const users = sbuxUsers;
        let user = '',
            name = '',
            userNow = '',
            fileName = '';

        for (let i = 0; i < users.length; i++) {
            user = users[i];
            $("//body/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/input[1]").setValue(`${user}`);
            $("//body/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[4]/input[1]").setValue(`${user}.xml`);
            $(`//option[contains(text(),'${user}')]`).click();
            $("#confirmButton").click();
            // add location
            if (i < users.length - 1) {
                $("//header/div[3]/button[1]").click();
            }
        }

        for (let i = 0; i < users.length; i++) {
            user = users[i];
            name = $(`//body/router-element[1]/location-list[1]/main[1]/item-list-view[1]/div[1]/div[2]/div[${i+1}]/div[1]`);
            expect(name).toHaveText(`${user}`);
            userNow = $(`//body/router-element[1]/location-list[1]/main[1]/item-list-view[1]/div[1]/div[2]/div[${i+1}]/div[4]`);
            expect(userNow).toHaveText(`${user}`);
            fileName = $(`//body/router-element[1]/location-list[1]/main[1]/item-list-view[1]/div[1]/div[2]/div[${i+1}]/div[5]`);
            expect(fileName).toHaveText(`${user}.xml`);
        }

        // $("nothing").waitForEnabled(10000);
    });
});
