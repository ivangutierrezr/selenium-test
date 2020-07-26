const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = webdriver;
const driver = new Builder().forBrowser("chrome").build();

async function testLogin(username, password) {
    /* let driver = chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build()); */
    await driver.get("http://localhost:8080/#/");
    await driver.findElement(By.id("username")).sendKeys(username, Key.TAB);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("password")).sendKeys(password, Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("botonLogin")).click();
    });
    /* await driver.findElement(By.css("#password")).sendKeys("admin", Key.RETURN);
    await driver.findElement(By.css("#botonLogin")).click(); */
    /* let currentUrl = driver.getCurrentUrl()
    console.log(currentUrl) */
    await driver.wait(until.elementLocated(By.className('confirm')), 10000);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.css(".confirm")).click();
    });
    
    await driver.sleep(2500).then(function() {
        try {
            comprobarURLLogin()
        } catch (error) {
            console.log(error)
        }
    });
    
    /* await driver.findElement(By.css(".confirm")).click(); */
    /* await driver.switchTo().alert().accept(); */

    /* .navigate()
        .to("http://path.to.test.app/")
        .then(() => driver.findElement(By.css(".autocomplete")))
        .then(element => element.getAttribute("value"))
        .then(value => console.log(value)); */
}

async function comprobarURLLogin() {
    let paginaActual = await driver.getCurrentUrl()
    if (paginaActual == "http://localhost:8080/#/") {
        console.log("Inicio de sesión fallido")
        testLogin("123456", "admin");
    } else {
        console.log("Inicio de sesión exitoso")
    }
    console.log(paginaActual)
}

testLogin("123456", "adsadasdasd");