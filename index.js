const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = webdriver;
const driver = new Builder().forBrowser('chrome').build();

async function testLogin(username, password) {
    await driver.get('http://localhost:8080/#/');
    await driver.findElement(By.id('username')).sendKeys(username, Key.TAB);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('password')).sendKeys(password, Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('botonLogin')).click();
    });
    await driver.wait(until.elementLocated(By.className('confirm')), 10000);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.css('.confirm')).click();
    });
    
    await driver.sleep(2500).then(function() {
        try {
            comprobarURLLogin()
        } catch (error) {
            console.log(error)
        }
    });
}

async function comprobarURLLogin() {
    let paginaActual = await driver.getCurrentUrl()
    if (paginaActual == 'http://localhost:8080/#/') {
        console.log('Inicio de sesión fallido')
        await driver.findElement(By.id('username')).clear();
        await driver.sleep(2500).then(function() {
            testLogin('123456', 'admin');
        });
    } else {
        console.log('Inicio de sesión exitoso')
        await driver.sleep(2500).then(function() {
            agregarProducto();
        });
        
    }
}

async function agregarProducto() {
    await driver.findElement(By.id('agregarProducto')).click();
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('nombreNuevoProducto')).sendKeys('Alicate', Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('descripcionNuevoProducto')).sendKeys('Alicate rojo marca gato', Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('botonCancelarNuevoProducto')).click();
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('agregarProducto')).click();
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('nombreNuevoProducto')).sendKeys('Destornillador', Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('descripcionNuevoProducto')).sendKeys('Destornillador rojo marca coquito', Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id('botonGuardarNuevoProducto')).click();
    });
    await driver.wait(until.elementLocated(By.className('confirm')), 10000);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.css('.confirm')).click();
    });
    await driver.sleep(2500).then(function() {
        testAgregarCompraProducto();
    });
}

async function testAgregarCompraProducto() {
    await driver.wait(until.elementsLocated(By.name('botonAgregarCompra')), 10000);
    let botonoesAgregar = await driver.findElements(By.name('botonAgregarCompra'))
    let idBotonAgregar = "botonAgregarCompra" + (botonoesAgregar.length - 1)
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id(idBotonAgregar)).click();
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("cantidadCompraProducto")).sendKeys(150, Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("precioCompraProducto")).sendKeys(8400, Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("botonGuardarCompraProducto")).click();
    });
    await driver.wait(until.elementLocated(By.className('confirm')), 10000);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.css('.confirm')).click();
    });
    await driver.sleep(2500).then(function() {
        testEditarProducto();
    });
}
async function testEditarProducto() {
    await driver.wait(until.elementsLocated(By.name('botonEditarProducto')), 10000);
    let botonoesAgregar = await driver.findElements(By.name('botonEditarProducto'))
    let idBotonAgregar = "botonEditarProducto" + (botonoesAgregar.length - 1)
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id(idBotonAgregar)).click();
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("nombreNuevoProducto")).sendKeys(" Rojo", Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("precioNuevoProducto")).click();
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("precioNuevoProducto")).sendKeys(11000, Key.TAB);
    });
    await driver.sleep(2500).then(function() {
        driver.findElement(By.id("botonGuardarEditarProducto")).click();
    });
    await driver.wait(until.elementLocated(By.className('confirm')), 10000);
    await driver.sleep(2500).then(function() {
        driver.findElement(By.css('.confirm')).click();
    });
    await driver.sleep(4000).then(function() {
        driver.quit()
    });
    await driver.sleep(1000).then(function() {
        driver.close()
    });

}

testLogin('123456', 'adsadasdasd');