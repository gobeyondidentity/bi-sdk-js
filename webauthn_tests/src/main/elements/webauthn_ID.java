package src.main.elements;

//Locators and element IDs for webauthn test pages
public class webauthn_ID {
    //Fields
    public static String bindCredField= "//input[@id='bindCredInput']";

    //Buttons
    public static String bindCredButton= "//button[@id='bindCredButton']";
    public static String signInTab = "//button[@id='tab-tab-signin']";
    public static String signInButton ="//a[@id='authCredButton']";

    //Fake User
    public static String fakeUser = "CeresFaunya";

    //URL
    public static String URL = "https://bi-sdk-js-rolling.vercel.app";

    //Credential
    public static String credID = "//*[@id=\"bindCredResultDiv\"]/pre/code/span[3]";

    //Banners
    public static String signInBanner = "//span[@class='header_signedInText__HDhnn']";


}
