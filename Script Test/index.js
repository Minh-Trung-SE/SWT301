const { WebElement } = require('selenium-webdriver');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
let testCase = {
    firstCase: 'NOT PASSED',
    secondCase: 'NOT PASSED',
    thirdCase: 'NOT PASSED'
}

const example = async () => {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {
        await driver.get('http://127.0.0.1:5500');

        const tasks = [
            "Automation test add-task fearture.",
            "Automation test done-task fearture.",
            "Automation test remove-task fearture."
        ]

        tasks.forEach( async (task) => {
            await driver.findElement(By.id('item')).sendKeys(task, Key.ENTER);
        });

        testCase.firstCase = "PASSED";
        await driver.sleep(1000);

        await driver.findElement(By.css('#todo li:first-child button:first-child')).click();
        testCase.secondCase = "PASSED";
        await driver.sleep(1000);

        await driver.findElement(By.css('#todo li:first-child button:last-child')).click();
        testCase.thirdCase = "PASSED";
        
        await driver.sleep(4000);
        // const newTaskAdded = await driver.findElement(By.css('#todo li:first-child span')).getAttribute('innerHTML');
    }catch(e) {
        console.log(e);
    }finally{
        console.table(testCase)
        await driver.quit();
    }
}

example()