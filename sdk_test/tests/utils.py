import random
import string

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import sdk_test.tests.homepage as hp


driver = webdriver.Firefox()
wait = WebDriverWait(driver, 10)


def setup():
    driver.maximize_window()
    driver.get(hp.ROLLING_URL)


def teardown():
    driver.close()


def refresh():
    driver.refresh()


def register_Cred():
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.SIGNUP_FIELD)))
    driver.find_element(By.XPATH, hp.SIGNUP_FIELD).send_keys(random.choices(string.ascii_lowercase, k=5) + ["Ceres"])
    driver.find_element(By.XPATH, hp.CREATE_BUTTON).click()
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.NEW_CRED)))
    id = driver.find_element(By.XPATH, hp.NEW_CRED).text.strip('/"')
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.NEW_CRED2)))
    id1 = driver.find_element(By.XPATH, hp.NEW_CRED2).text
    assert id == id1


def register_NoCred():
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.SIGNUP_FIELD)))
    driver.find_element(By.XPATH, hp.CREATE_BUTTON).click()
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.NO_CRED)))


def authenticate():
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.AUTH_TAB)))
    driver.find_element(By.XPATH, hp.AUTH_TAB).click()
    driver.find_element(By.XPATH, hp.AUTH_BUTTON).click()
    wait.until(EC.visibility_of_element_located((By.XPATH, hp.AUTHENTICATED)))
