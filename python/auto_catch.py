import os
import time
import json
import shutil
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def downloadImg(img_url: str, img_url_dic: dict, keywords: str, folder: str, types: str):
    try:
        if img_url != None and not img_url in img_url_dic:
                img_url_dic[img_url] = '' 
                if keywords.find('"') or keywords.find(':'):  
                    keywords = keywords.replace('"', "")
                    keywords = keywords.replace(':', "")
                filename = keywords + '.' + types
                print(filename)
                r = requests.get(img_url)
                path = 'python/img/' + folder
                if not os.path.isdir(path):
                    os.makedirs(path)
                path = 'python/img/' + folder + '/' + filename
                with open(path, 'wb') as outfile:
                    outfile.write(r.content)
    except OSError:
        print("OSError")
        browser.close()

def packing_output(data: list):
    select_df = pd.DataFrame(data, columns = ['killer_name', 'killer_cover', 'realName', 'weapon', 'power', 'speed', 'alternative_speed', 'terror', 'alternative_terror', 'height', 'perk_names','add_ones_name'])
    result = json.loads(select_df.to_json(orient = 'records'))
    if os.path.exists('python\killers.json'):
        os.remove('python\killers.json')
    with open('python\killers.json', 'w', encoding='UTF-8') as f:
        json.dump(result, f, ensure_ascii= False)

if __name__  == "__main__":
    edge_options = webdriver.EdgeOptions()
    edge_options.add_argument('-disable-gpu')
    edge_options.add_argument('log-level=3')
    browser = webdriver.Edge("python/msedgedriver.exe", options=edge_options)
    url = "https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki"
    browser.set_page_load_timeout(20)
    browser.set_script_timeout(20)
    browser.maximize_window()

    try:
        browser.get(url)
    except:
        browser.execute_script("window.stop()")
    
    WebDriverWait(browser, 30).until(EC.presence_of_element_located((By.CLASS_NAME, 'image')))

    killers = []
    for killer_index in range(1,60,2):
        cover_pictures_dic = {}
        skills_pictures_dic = {}
        add_ones_pictures_dic = {}
        js = 'document.getElementsByClassName("image")[0].scrollIntoView(false)'
        browser.execute_script(js)
        time.sleep(1)

        category_click = browser.find_elements(By.CLASS_NAME,'image')
        category_click[killer_index].click()
        time.sleep(3)

        obj = []
        add_ones_names = []
        add_ones_pictures = []
        skill_names = []
        skill_pictures = []

        # "\033[2;31;43m name_pass \033[0;0m"
        # 抓取名稱
        killer_name = browser.find_element(By.CLASS_NAME,'infoboxTitle').text
        obj.append(killer_name)
        
        # 抓取封面圖
        cover = browser.find_element(By.XPATH,"//a[contains(@href,'charSelect_portrait.png/revision')]").get_attribute("href")
        downloadImg(cover, cover_pictures_dic, killer_name, "cover", "jpg")
        obj.append(cover)

        # 抓取武器名稱、能力名稱、身高、速度
        values = ["Name", "Weapon", "Power", "Movement Speed", "Alternate Movement speed", "Terror Radius", "Alternative Terror Radius", "Height"]
        infor = browser.find_element(By.CLASS_NAME,"infoboxtable").find_elements(By.TAG_NAME,"td")
        child_values = [None] * 8
        for i, data in enumerate(infor):
            if data.text in values :
                child_values[values.index(data.text)] = infor[i+1].text
        obj.extend(child_values)

        # 抓取技能圖、技能名稱
        wikitables = browser.find_elements(By.CLASS_NAME, 'wikitable')
        lnks = wikitables[0].find_elements(By.XPATH,"//a[contains(@href, '.gif')]")

        for i in range(0, 3):
            skill_picture = lnks[i].get_attribute("href")
            skill_name = lnks[i].get_attribute("title")
            downloadImg(skill_picture, skills_pictures_dic, skill_name, "perks/" + killer_name, "gif")
            skill_names.append(skill_name)
        obj.append(skill_names)

        #抓取附加品圖片和名稱
        special_cases = [1, 9, 21, 37, 49]
        wikitable = wikitables[2] if killer_index in special_cases else wikitables[1]
        add_ones_block = wikitable.find_elements(By.TAG_NAME, 'tr')

        for index, ones in enumerate(add_ones_block):
            if index == 0: continue
            picture = ones.find_element(By.TAG_NAME, 'img').get_attribute('data-src')
            name = ones.find_element(By.TAG_NAME, 'img').get_attribute('alt')
            downloadImg(picture, add_ones_pictures_dic, name, "add-ones/" + killer_name, "jpg")
            add_ones_names.append(name)
        obj.append(add_ones_names)
        killers.append(obj)

        browser.back()
        time.sleep(3)
        print("===========================================================")
    
    packing_output(killers)
    print("All DONE")
    browser.close()