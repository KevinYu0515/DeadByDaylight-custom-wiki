import time
import json
import pandas as pd
from datetime import datetime
from selenium import webdriver
from bs4 import BeautifulSoup as Soup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

if __name__  == "__main__":

    browser = webdriver.Edge()
    browser2 = webdriver.Edge()
    url = "https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki"
    url2 = "https://192.168.50.203:8080/personal"
    browser.set_page_load_timeout(10)
    browser.set_script_timeout(10)

    try:
        browser.get(url)
        browser2.get(url2)
    except:
        browser.execute_script("window.stop()")

    browser.maximize_window()
    
    WebDriverWait(browser, 30).until(EC.presence_of_element_located((By.CLASS_NAME, 'image')))


    for killer_index in range(1,56,2):
        js = 'document.getElementsByClassName("image")[0].scrollIntoView(false)'
        browser.execute_script(js)
        time.sleep(1)

        category_click = browser.find_elements(By.CLASS_NAME,'image')
        category_click[killer_index].click()
        time.sleep(1)
        name = browser.find_element(By.CLASS_NAME,'infoboxTitle').text
        # co = browser.find_element(By.XPATH,"//a[contains(@href,'charSelect_portrait.png/revision')]")
        # cover.append(co.get_attribute("href"))

        # skills_table =  browser.find_element(By.CLASS_NAME,"wikitable")
        # lnks = skills_table.find_elements(By.XPATH,"//a[contains(@href, '.gif')]")
        # skill_1.append(lnks[0].get_attribute("href"))
        # skill_2.append(lnks[1].get_attribute("href"))
        # skill_3.append(lnks[2].get_attribute("href"))

        
        # weapon_power =  browser.find_elements(By.CLASS_NAME,"floatright")
        # w = weapon_power[1].find_elements(By.TAG_NAME,"a")
        # p = weapon_power[2].find_elements(By.TAG_NAME,"a")
        # for w__ in w:
        #     weapon.append(w__.get_attribute("href"))
        # for p__ in p:
        #     power.append(p__.get_attribute("href"))
        browser.back()
        time.sleep(1)
    
    print("All DONE")

    # select_df = pd.DataFrame(dict)
    # select_df.to_excel("killers.xlsx")
    