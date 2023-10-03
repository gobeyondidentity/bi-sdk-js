package src.main.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.virtualauthenticator.HasVirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticatorOptions;

import java.time.Duration;
import java.util.UUID;

import src.main.elements.webauthn_ID;

public class web_Utils {
    public static WebDriver driver;
    public static VirtualAuthenticator virtualAuthenticator;
    public static String random = usingRandomUUID();
    public static WebDriverWait wait;

    public static void startUp(){
        driver = new ChromeDriver();
        virtualAuthenticator = setupVA();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.get(webauthn_ID.URL);
        driver.manage().window().maximize();
    }

    public static void bindCred(){
        driver.findElement(By.xpath(webauthn_ID.bindCredField)).sendKeys(webauthn_ID.fakeUser + random);
        driver.findElement(By.xpath(webauthn_ID.bindCredButton)).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(webauthn_ID.credID)));
    }

    public static void authenticate(){
        driver.findElement(By.xpath(webauthn_ID.signInTab)).click();
        driver.findElement(By.xpath(webauthn_ID.signInButton)).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(webauthn_ID.signInBanner)));
    }

    public static void tearDown(){
        driver.quit();
    }

    //Method to crerate a random string, used for multiple username registration
    public static String usingRandomUUID() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString().replaceAll("[_-]", "");
    }

    //Virtual authenticator setup. Creates a VA that spoofs the webauthn prompts with the payload specified below
    public static VirtualAuthenticator setupVA(){
        VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions();
        options.setTransport(VirtualAuthenticatorOptions.Transport.INTERNAL).setProtocol(VirtualAuthenticatorOptions.Protocol.CTAP2);
        return ((HasVirtualAuthenticator)driver).addVirtualAuthenticator(options);
    }

}
