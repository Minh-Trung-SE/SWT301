
const { WebDriver, Builder, Browser, By, Key } = require('selenium-webdriver');
let testCase = {
    case_1: {
        name: 1,
        passed: "UNTESTED",
        error: "UNTESTED"
    },
    case_2: {
        name: 2,
        passed: "UNTESTED",
        error: "UNTESTED"
    },
    case_3: {
        name: 3,
        passed: "UNTESTED",
        error: "UNTESTED"
    }
}

const example = async () => {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {
        await driver.get('http://127.0.0.1:5500');

        //INPUT test case
        const tasks = [
            "Prepare the Selenium topic demo.",
            "Do homework.",
            "Team meeting."
        ]

        //TEST CASE 1: Test add new task feature.
        
        //Add 3 new task
        console.log('TEST CASE 1: Execute');
        for(const index in tasks){

            //Go to input 
            await driver.findElement(By.id('item')).sendKeys(tasks[index], Key.ENTER);
            //Get current added task
            const taskContent = await driver.findElement(By.css("#todo li")).getAttribute('innerText');

            console.log(`Task Added: ${taskContent}`);
            //Waiting display 2s to observe result
            await driver.sleep(2000)
            //Compare check condition current task added has same content input
            if(taskContent !== tasks[index]){
                testCase.case_1.passed = "NOT PASED";
                testCase.case_1.error = `Input task: ${task[index]} || Output: ${taskContent}`
                break;
            }
            //Check condtion affter done inputed.
            if(index == (tasks.length - 1)){
                const numberTaskElements = await driver.findElements(By.css("#todo li"));
                if(numberTaskElements.length == 3){
                    testCase.case_1.passed = "PASSED"
                    testCase.case_1.error = "NO ERROR"
                }else{
                    testCase.case_1.passed = 'NOT PASSED';
                    testCase.case_1.error = `INPUT: ${tasks.length} tasks OUTPUT: ${numberTaskElements.length} tasks added success.`
                }
            }
        }
        
        console.log('\nTEST CASE 2: Execute');  
        if(testCase.case_1.passed === "PASSED"){
            //Chose top task on the list tasks to mark done status
            const markDoneTaskElement = await driver.findElement(By.css('#todo li:first-child'));
            //Get content of task mark done
            const markDoneTaskElementContent = await markDoneTaskElement.getAttribute('innerText');
            //Click mark done toggle
            await markDoneTaskElement.findElement(By.css('button:last-child')).click()
            console.log(`Mark done task: ${markDoneTaskElementContent}`);
            await driver.sleep(5000)
            
            //Get number remain tasks uncompleted mark
            const remainTaskElements = await driver.findElements(By.css("#todo li"));
            //Get number tasks is completed mark
            const numberDoneTaskElements = await driver.findElements(By.css("#completed li"));

            if(remainTaskElements.length == (tasks.length - 1) && numberDoneTaskElements.length === 1){
                const currentContentTaskMarkDone = await driver.findElement(By.css("#completed li")).getAttribute('innerText');
                if(currentContentTaskMarkDone === markDoneTaskElementContent){
                    testCase.case_2.passed = 'PASSED'
                    testCase.case_2.error = "NO ERROR"
                }else{
                    testCase.case_2.passed = 'NOT PASSED'
                    testCase.case_2.error = 
                    `The content of the task marked as complete is not the same as the content of the task in the completed section.\n
                    The content of the task marked complete: ${markDoneTaskElementContent}\n
                    The content of the task is in the completed section: ${currentContentTaskMarkDone}`
                }
            }else{
                testCase.case_2.passed = 'NOT PASSED'
                testCase.case_2.error = 
                `The number task undone: ${remainTaskElements}\n
                The number tasks mark done: ${markDoneTaskElement}`;
            }
        }else{
            testCase.case_2.passed = 'NOT PASSED';
            testCase.case_2.error = 'Test case 1 NOT PASSED';
        }

        console.log('\nTEST CASE 3: Execute');  
        if(testCase.case_2.passed === "PASSED"){
            //Chose top task on the list tasks to mark done status
            const removeTaskElement = await driver.findElement(By.css('#todo li:first-child'));
            //Get content of task mark done
            const removeTaskContent = await removeTaskElement.getAttribute('innerText');
            console.log(`Task "${removeTaskContent}" will be remove after 2s...`);
            await driver.sleep(2000);
            //Click mark done toggle
            await removeTaskElement.findElement(By.css('button:first-child')).click()
            console.log(`Task "${removeTaskContent}" removed`);
            await driver.sleep(2000);
            
            //Get number remain tasks uncompleted mark
            const remainTaskElements = await driver.findElements(By.css("#todo li"));

            if(remainTaskElements.length == (tasks.length - 2)){
                //Get number tasks is completed mark
                const remainTaskContent = await driver.findElement(By.css("#todo li")).getAttribute('innerText');
                if(remainTaskContent != removeTaskContent){
                    testCase.case_3.passed = 'PASSED'
                    testCase.case_2.error = "NO ERROR"
                }else{
                    testCase.case_3.passed = 'NOT PASSED'
                    testCase.case_3.error = `Remove task ${removeTaskContent} failed!`
                }
            }
        }else{
            testCase.case_3.passed = 'NOT PASSED'
            testCase.case_3.error = `Test case 2 NOT PASSED`
        }

        await driver.sleep(4000);
    } catch (e) {
        console.log(e);
    } finally {
        console.table(testCase)
        await driver.quit();
    }
}

example()