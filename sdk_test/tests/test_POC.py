import random
import string

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import sdk_test.tests.homepage as hp
import sdk_test.tests.utils as step
import pytest


def test_Create():
    step.setup()
    step.register_Cred()
    step.refresh()

def test_Authenticate():
    step.authenticate()
    step.refresh()

def test_Negative_Bind():
    step.setup()
    step.register_NoCred()
    step.teardown()