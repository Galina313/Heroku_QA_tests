import { describe } from "mocha";
import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import assert from "assert";


describe('Heroku Tests', async () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.manage().window().maximize();
    });

  afterEach(async () => {
    await driver.quit();
});


  it('Add and remove elements', async function() {
    await driver.get("http://the-internet.herokuapp.com/add_remove_elements/");
    await driver.findElement(By.xpath("//button[text()='Add Element']")).click();
    
    await driver.findElement(By.xpath("//button[text()='Add Element']")).click();
    const elements = await driver.findElements(By.css('.added-manually'));
    expect(elements.length).to.equal(2);

    await driver.findElement(By.xpath("//button[text()='Delete']")).click();
    const checkelements = await driver.findElements(By.className('added-manually'));
    expect(checkelements.length).to.equal(1);
  }); 


  it('Checked and unchecked checkboxes', async () => {
    await driver.get("https://the-internet.herokuapp.com/checkboxes");
    const checkboxes = await driver.findElements(By.css('input[type="checkbox"]'));
    const isFirstCheckboxSelected = await checkboxes[0].isSelected();
    expect(isFirstCheckboxSelected).to.be.false;

    await checkboxes[0].click();
    const firstCheckboxChecked = await checkboxes[0].isSelected();
    expect(firstCheckboxChecked).to.be.true;

    const secondCheckbox = driver.findElement(By.css('input[type="checkbox"]:nth-of-type(2)'));
    const isSecondCheckboxSelected = await checkboxes[1].isSelected();
    expect(isSecondCheckboxSelected).to.be.true;

    await checkboxes[1].click();
    const secondCheckboxChecked = await checkboxes[1].isSelected();
    expect(secondCheckboxChecked).to.be.false;
  });
  

  it('Selection Dropdown options', async () => {
    await driver.get("http://the-internet.herokuapp.com/dropdown");
    const dropdown = await driver.findElement(By.css('#dropdown'));
    const options = await dropdown.findElements(By.css('option'));
    await driver.findElement(By.id('dropdown')).click();
    expect(options.length).to.be.greaterThan(0);
    
    await dropdown.click();
    const option1 = await driver.findElement(By.css('option[value="1"]'));
    await option1.click();
    expect(await option1.isSelected()).to.be.true;

    await dropdown.click();
    const option2 = await driver.findElement(By.css('option[value="2"]'));
    await option2.click();
    expect(await option2.isSelected()).to.be.true;
    });


  it('Input values_1', async () => {
    await driver.get("http://the-internet.herokuapp.com/inputs");
    const input = await driver.findElement(By.css('input[type="number"]'));
    await input.click();
    await input.sendKeys('12345');

    await input.sendKeys(Key.ARROW_UP);
    const value_UP = await input.getAttribute('value');
    expect(value_UP).to.equal('12346');

    await input.sendKeys(Key.ARROW_DOWN);
    const value_DOWN = await input.getAttribute('value');
    expect(value_DOWN).to.equal('12345');
  });
   
      

  it('Input values_2', async () => {
    await driver.get("http://the-internet.herokuapp.com/inputs");
    const input = await driver.findElement(By.css('input[type="number"]'));
    await input.click();
    await input.sendKeys('-');

    await input.sendKeys(Key.ARROW_UP);
    const value_UP = await input.getAttribute('value');
    expect(value_UP).to.equal('1');

    await input.sendKeys(Key.ARROW_DOWN);
    const value_DOWN = await input.getAttribute('value');
    expect(value_DOWN).to.equal('0');
  });
   

  it('Data Tables', async () => {
    await driver.get("http://the-internet.herokuapp.com/tables");
    const conwayEmail = await driver.findElement(By.xpath('//table[1]/tbody/tr[4]/td[3]')).getText();
    expect(conwayEmail).to.equal('tconway@earthlink.net');
      
    const bachFrank = await driver.findElement(By.xpath("//table[1]/tbody/tr[3]/td[4]")).getText();
    expect(bachFrank).to.equal("$100.00");
           
    const name = await driver.findElement(By.xpath("//table[@id='table1']/tbody/tr[1]/td[2]"));
    const nameText = await name.getText();
    expect(nameText).to.equal("John");
  }); 
    
    
  it('Contex Menu', async () => {;
    await driver.get("https://the-internet.herokuapp.com/context_menu");
    const element = await driver.findElement(By.id("hot-spot"));
    const actions = driver.actions({async: true});
    await actions.contextClick(element).perform();
        
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).to.equal("You selected a context menu");
    await alert.accept();
      }); 
      

it('iFrame check', async () => {
  await driver.get("http://the-internet.herokuapp.com/frames");
  await driver.findElement(By.linkText("iFrame")).click();
  
  await driver.wait(until.elementLocated(By.id('mce_0_ifr')), 5000);
  const iframe = await driver.findElement(By.id('mce_0_ifr'));
  await driver.switchTo().frame(iframe);
  
  const iframetext = await driver.findElement(By.css("#tinymce p")).getText();
  expect(iframetext).to.equal("Your content goes here.");
  await driver.switchTo().defaultContent();
});
})



  
    
       