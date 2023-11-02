
const {Builder, By, Key, until} = require('./node_modules/selenium-webdriver/index.js');
const readline = require('readline');

const defaultComment = "What is happening in palestine started in 1948 when the zionists fled to palestine, and started stealing palestinians land, doing genocides and many more crimes when the armed resistance hamas (not terrorists) didn't even exist, and now they are trying to kill all the 2 million palestinian, either they're wihth hamas or not, this is not a simple conflict, this is good vs bad, do your research and choose your side";




(async function example() {

    console.log("---------------------- Welcome to instagram comments bot ------------------------");
    console.log("------------------- Made by Fares Mezenner (aka: Tech Torch) --------------------");
    console.log("");
    console.log("Note: Please make sure you have the latest version of chrome installed");
    console.log("");

      
    let correctInput = false;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    function askMethod() {
        
        
        rl.question('In which account you want to automate comments? \n1- An existing account \n2- Let the bot create an account (not available, still under dev) \nyour input:  ', (userInput) => {
            if (userInput == 1) {
                
                rl.close();
                loginMethode();
    
    
            } else if (userInput == 2) {
                console.log("This feature is still under development, please only use the first option for now\n");
                askMethod();

    
    
            } else {
                console.log("Please enter a valid input\n");
                
                askMethod();
                
            }
          });
    }

    askMethod();




})();

const loginMethode = () =>{
    
    let username, password;

    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your username: ', (userInput) => {
        username = userInput;
        rl.question('Enter your password: ', (userInput) => {
            password = userInput;
            rl.close();
            chooseMessageAndStart(username, password);
        });
        
    })
}


const chooseMessageAndStart = (username, password) => {

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function chooseComment() {rl.question('\n Use default comment or custom one? \n1- use default comment:\n ' + defaultComment + '\n\n2- use custom comment.\n your input: ', (userInput) => {
        if (userInput == 1) {
            rl.close();
            start(username, password, defaultComment);
        } else if (userInput == 2) {
            rl.question('\n Enter your comment: ', (userInput) => {
                rl.close();
                start(username, password, userInput);
            });
        } else {
            console.log("Please enter a valid input\n");
            
            chooseComment();
        }
    });}

    chooseComment();

}


const start = async (username, password, comment) => {
    

    


    let driver =  new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.instagram.com/accounts/login/?source=auth_switcher');


        
        // await driver.get('C:\\Users\\gtx\\Documents\\Projects\\instagram script\\test.html');
        const userNameInput = await driver.wait(until.elementLocated(By.xpath('//input[@name="username"]')), 10000);
        await userNameInput.sendKeys(username);
        await driver.findElement(
            By.xpath('//input[@name="password"]')
        ).sendKeys(password, Key.ENTER);

        var loaded = false;
        const interval = setInterval(async () => {
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes("onetap") && !loaded) {
                loaded = true;
                clearInterval(interval);
                loopReels(driver);

            }
        }, 1000);
    } finally {
    }
}




const loopReels = async (driver)  => {
    

    await driver.get('https://www.instagram.com/reels/');
    let i =0;
    let noComments = 0;
    const timeout = 30000;
    while (true) {    
        
        const commentButton = (await driver.wait(until.elementsLocated(By.xpath( "//div[contains(@class, 'x6s0dn4') and contains(@class, 'x78zum5') and contains(@class, 'xdt5ytf') and contains(@class, 'xl56j7k')]")), timeout))[6*i + 2 - noComments];
        const childElements = await commentButton.findElements(By.css('*')); // Select all child elements
        const numberOfChildElements = childElements.length;


        if (numberOfChildElements==4) {
            i++;
            noComments++;
            continue;
        }


    // console.log("found comment button");
    await commentButton.click();
    // console.log("clicked comment button");
    
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    let commentDiv;
    try{
        commentDiv = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'x6s0dn4') and contains(@class, 'x78zum5') and contains(@class, 'x6ikm8r') and contains(@class, 'x1rife3k') and contains(@class, 'x1n2onr6') and contains(@class, 'xh8yej3') and contains(@class, 'xxk0z11') and contains(@class, 'x101qyy3')]")
    ), timeout)
    } catch (e) {
        console.log("no comment div found, skipping to next reel");
        
    const frame = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class, 'xutac5l') and contains(@class, 'x1ey2m1c') and contains(@class, 'x78zum5') and contains(@class, 'xds687c') and contains(@class, 'xdt5ytf') and contains(@class, 'x1qughib') and contains(@class, 'x10l6tqk') and contains(@class, 'x17qophe') and contains(@class, 'x13vifvy')]")
    ), timeout
        )
        
        frame.sendKeys(Key.ARROW_DOWN);
        i++;
        continue;
    }

    
    
    // console.log("found comment div");
    await commentDiv.click();
    // console.log("clicked comment div");


    let commentField;
   try { commentField = await driver.wait(until.elementLocated(By.xpath("//p[contains(@class, 'xdj266r') and contains(@class, 'x11i5rnm') and contains(@class, 'xat24cr') and contains(@class, 'x1mh8g0r')]",
    )
    ), timeout)} catch (e) {
        // console.log("no comment field found");
        
    const frame = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class, 'xutac5l') and contains(@class, 'x1ey2m1c') and contains(@class, 'x78zum5') and contains(@class, 'xds687c') and contains(@class, 'xdt5ytf') and contains(@class, 'x1qughib') and contains(@class, 'x10l6tqk') and contains(@class, 'x17qophe') and contains(@class, 'x13vifvy')]")
    ), timeout
        )
        
        frame.sendKeys(Key.ARROW_DOWN);
        i++;
        continue;
    }


    // console.log("found comment field");
    await commentField.click();
    // console.log("clicked comment field");

    await commentField.sendKeys(defaultComment);



    let commentPost;
    try { 
        commentPost = await driver.wait(
        until.elementLocated(By.xpath( "//div[contains(@class, 'x1i10hfl') and contains(@class, 'xjqpnuy') and contains(@class, 'xa49m3k') and contains(@class, 'xqeqjp1') and contains(@class, 'x2hbi6w') and contains(@class, 'xdl72j9') and contains(@class, 'x2lah0s') and contains(@class, 'xe8uvvx') and contains(@class, 'xdj266r') and contains(@class, 'x11i5rnm') and contains(@class, 'xat24cr') and contains(@class, 'x1mh8g0r') and contains(@class, 'x2lwn1j') and contains(@class, 'xeuugli') and contains(@class, 'x1hl2dhg') and contains(@class, 'xggy1nq') and contains(@class, 'x1ja2u2z') and contains(@class, 'x1t137rt') and contains(@class, 'x1q0g3np') and contains(@class, 'x1lku1pv') and contains(@class, 'x1a2a7pz') and contains(@class, 'x6s0dn4') and contains(@class, 'xjyslct') and contains(@class, 'x1ejq31n') and contains(@class, 'xd10rxx') and contains(@class, 'x1sy0etr') and contains(@class, 'x17r0tee') and contains(@class, 'x9f619') and contains(@class, 'x1ypdohk') and contains(@class, 'x1i0vuye') and contains(@class, 'x1f6kntn') and contains(@class, 'xwhw2v2') and contains(@class, 'xl56j7k') and contains(@class, 'x17ydfre') and contains(@class, 'x2b8uid') and contains(@class, 'xlyipyv') and contains(@class, 'x87ps6o') and contains(@class, 'x14atkfc') and contains(@class, 'xcdnw81') and contains(@class, 'xjbqb8w') and contains(@class, 'xm3z3ea') and contains(@class, 'x1x8b98j') and contains(@class, 'x131883w') and contains(@class, 'x16mih1h') and contains(@class, 'x972fbf') and contains(@class, 'x1qhh985') and contains(@class, 'xm0m39n') and contains(@class, 'xt7dq6l') and contains(@class, 'xexx8yu') and contains(@class, 'x4uap5') and contains(@class, 'x18d9i69') and contains(@class, 'xkhd6sd') and contains(@class, 'x1n2onr6') and contains(@class, 'x1n5bzlp') and contains(@class, 'x173jzuc') and contains(@class, 'x1yc6y37') and contains(@class, 'x3nfvp2')]"))
        , timeout);
    } catch (e) {
        console.log("no comment post found, skipping to next reel");
        
    const frame = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class, 'xutac5l') and contains(@class, 'x1ey2m1c') and contains(@class, 'x78zum5') and contains(@class, 'xds687c') and contains(@class, 'xdt5ytf') and contains(@class, 'x1qughib') and contains(@class, 'x10l6tqk') and contains(@class, 'x17qophe') and contains(@class, 'x13vifvy')]")
    ), timeout
        )
        
        frame.sendKeys(Key.ARROW_DOWN);
        i++;
        continue;
    }

    // console.log("found comment post");
    await commentPost.click();
    // console.log("clicked comment post");

    


    const frame = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class, 'xutac5l') and contains(@class, 'x1ey2m1c') and contains(@class, 'x78zum5') and contains(@class, 'xds687c') and contains(@class, 'xdt5ytf') and contains(@class, 'x1qughib') and contains(@class, 'x10l6tqk') and contains(@class, 'x17qophe') and contains(@class, 'x13vifvy')]")
    ), timeout
        )

        console.log("commented on reel number " + i + ", link: " + await driver.getCurrentUrl());
        
        frame.sendKeys(Key.ARROW_DOWN);
        i++;
        await new Promise(resolve => setTimeout(resolve, 1000)); 
  
}


}


