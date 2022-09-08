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
    url = "https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki"
    browser.set_page_load_timeout(10)
    browser.set_script_timeout(10)

    try:
        browser.get(url)
    except:
        browser.execute_script("window.stop()")

    browser.maximize_window()
    
    WebDriverWait(browser, 30).until(EC.presence_of_element_located((By.CLASS_NAME, 'image')))

    titleName = []
    skill_1s = []
    skill_2s = []
    skill_3s = []
    skill_1_names = []
    skill_2_names = []
    skill_3_names = []
    covers = []
    # bg = []
    names = []
    weapons = []
    powers = []
    moves = []
    terrors = []
    heights = []
    altMoves = []

    

    for killer_index in range(1,56,2):
        soup = Soup(browser.page_source,"lxml")
        js = 'document.getElementsByClassName("image")[0].scrollIntoView(false)'
        browser.execute_script(js)
        time.sleep(1)

        category_click = browser.find_elements(By.CLASS_NAME,'image')
        category_click[killer_index].click()
        time.sleep(1)

        # "\033[2;31;43m name_pass \033[0;0m"
        # 抓取殺手名稱
        name = browser.find_element(By.CLASS_NAME,'infoboxTitle').text
        titleName.append(name)

        # 抓取殺手人像封面圖
        cover = browser.find_element(By.XPATH,"//a[contains(@href,'charSelect_portrait.png/revision')]").get_attribute("href")
        covers.append(cover)

        # 抓取殺手背景介紹
        # bgInfor = browser.find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'i').text
        # bg.append(bgInfor)

        # 抓取殺手技能圖
        # 抓取殺手技能名稱
        skills_table =  browser.find_element(By.CLASS_NAME,"wikitable")
        lnks = skills_table.find_elements(By.XPATH,"//a[contains(@href, '.gif')]")
        print(lnks[0])

        with open('skills.png', 'wb') as file:
            file.write(lnks[0].screenshot_as_png)

        # skill_1 = lnks[0].get_attribute("href")
        # skill_1_name = lnks[0].get_attribute("title")
        # skill_2 = lnks[1].get_attribute("href")
        # skill_2_name = lnks[1].get_attribute("title")
        # skill_3 = lnks[2].get_attribute("href")
        # skill_3_name = lnks[2].get_attribute("title")

        # skill_1s.append(skill_1)
        # skill_1_names.append(skill_1_name)
        # skill_2s.append(skill_2)
        # skill_2_names.append(skill_2_name)
        # skill_3s.append(skill_3)
        # skill_3_names.append(skill_3_name)

        # 抓取殺手武器名稱
        # 抓取殺手能力名稱
        # 抓取殺手身高
        # 抓取殺手速度
        altm = None
        infor = browser.find_element(By.CLASS_NAME,"infoboxtable").find_elements(By.TAG_NAME,"td")
        for i, data in enumerate(infor):
            if(data.text == "Name"):
                n = infor[i+1].text
            elif(data.text == "Weapon"):
                w = infor[i+1].text
            elif(data.text == "Power"):
                p = infor[i+1].text
            elif(data.text == "Movement Speed") :
                m = infor[i+1].text
            elif(data.text == "Alternate Movement speed"):
                altm = infor[i+1].text
            elif(data.text == "Terror Radius"):
                t = infor[i+1].text
            elif(data.text == "Height") :
                h = infor[i+1].text
                break
        names.append(n)
        weapons.append(w)
        powers.append(p)
        moves.append(m)
        altMoves.append(altm)
        terrors.append(t)
        heights.append(h)

        browser.back()
        time.sleep(1)
    
    print("All DONE")

    dict = {
        "TitleName": titleName,
        "Cover": covers,
        "Skill_1": skill_1s,
        "Skill_2": skill_2s,
        "Skill_3": skill_3s,
        "Skill_1_name": skill_1_names,
        "Skill_2_name": skill_2_names,
        "Skill_3_name": skill_3_names,
        "Name": names,
        "Weapon": weapons,
        "Power": powers,
        "Movement Speed": moves,
        "Alternate Movement speed": altMoves,
        "Terror Radius": terrors,
        "Height": heights
    }

    select_df = pd.DataFrame(dict)
    select_df.to_excel("killersData.xlsx")
    