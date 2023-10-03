package src.main.tests;

import org.testng.annotations.Test;
import src.main.utils.web_Utils;

public class webauthn_POC {

    @Test
    public static void test_Bind_Cred(){
        web_Utils.startUp();
        web_Utils.bindCred();
        web_Utils.authenticate();
        web_Utils.tearDown();
    }

}
