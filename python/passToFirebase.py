import os
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By

def scroll(pos, delay):
    js = 'window.scrollTo({top: %d, behavior: "smooth"})' % pos
    browser.execute_script(js)
    time.sleep(delay)

def inner_scroll(element, pos, delay):
    js = 'document.querySelector("{0}").scrollTop={1}'.format(element, pos)
    browser.execute_script(js)
    time.sleep(delay)

def scroll_to_element(element, delay):
    js = 'document.querySelector("%s").scrollIntoView(false)' % element
    browser.execute_script(js)
    time.sleep(delay)

def operation_keys(element, browser, by: str, value: str):
    if element is not None :
        item = browser.find_element(by, "%s" % value)
        item.send_keys(element)

if __name__  == "__main__":
    with open('python/killers.json' ,encoding="utf-8") as f:
        data = json.load(f)

    edge_options = webdriver.EdgeOptions()
    edge_options.add_argument('-disable-gpu')
    edge_options.add_argument('log-level=3')
    url = "https://deadbydaylightrecords.firebaseapp.com/login"
    browser = webdriver.Edge("python/msedgedriver.exe", options=edge_options)
    browser.maximize_window()

    try:
        browser.get(url)
    except:
        browser.execute_script("window.stop()")

    email = (browser.find_elements(By.CSS_SELECTOR, "input"))[0]
    password = (browser.find_elements(By.CSS_SELECTOR, "input"))[1]
    submit = (browser.find_elements(By.CSS_SELECTOR, "input"))[2]
    email.send_keys("test@test.com")
    password.send_keys("770936avm")
    submit.click()
    time.sleep(3)

    for i in range(0, 30):

        scroll_to_element("button", 1)
        create_button = browser.find_element(By.CSS_SELECTOR, "button")
        create_button.click()
        time.sleep(1)

        dialog = browser.find_element(By.CLASS_NAME, "p-dialog-content")
        rank = (dialog.find_elements(By.CSS_SELECTOR, "div"))[0]
        rank.click()
        time.sleep(1)
        rank_selector = (browser.find_elements(By.CLASS_NAME, "p-dropdown-item"))[1]
        rank_selector.click()

        difficult = (dialog.find_elements(By.CSS_SELECTOR, "div"))[3]
        difficult.click()
        time.sleep(1)
        difficult_selector = (browser.find_elements(By.CLASS_NAME, "p-dropdown-item"))[1]
        difficult_selector.click()

        name = (dialog.find_elements(By.CSS_SELECTOR, "input"))[1]
        name.send_keys(data[i]['killer_name'])

        path = "C:/Users/marve/OneDrive/桌面/website-2.0/python/img/cover/" + data[i]['killer_name'] + '.jpg'
        upload = dialog.find_element(By.XPATH, "//input[@type='file']")
        upload.send_keys(path)

        submit = (dialog.find_elements(By.CSS_SELECTOR, "button"))[1]
        submit.click()
        time.sleep(1)

        scroll_to_element("[data-role='%s']" % data[i]['killer_name'], 1)
        section = browser.find_element(By.CSS_SELECTOR, "section")
        role = section.find_element(By.XPATH, "//div[@data-role='%s']" % data[i]['killer_name'])
        role.click()
        time.sleep(1)

        buttonGroup = browser.find_element(By.CLASS_NAME, "buttonGroup")
        settings_toggle = (buttonGroup.find_elements(By.TAG_NAME, "button"))[1]
        settings_toggle.click()
        time.sleep(1)
        settings_selectors = browser.find_element(By.CLASS_NAME, "p-tieredmenu")
        settings_selector = (settings_selectors.find_elements(By.TAG_NAME, "li"))[0]
        settings_selector.click()
        time.sleep(1)

        dialog = browser.find_element(By.CLASS_NAME, "p-dialog-content")
        confirm = dialog.find_elements(By.TAG_NAME, "button")
        switch = dialog.find_elements(By.CLASS_NAME, "p-inputswitch")
        switch[0].click()
        switch[1].click()

        scroll_to_element("[placeholder='Real Name']", 0.5)
        operation_keys(data[i]['realName'], dialog, By.XPATH, "//input[@placeholder='Real Name']")
        confirm[0].click()  

        scroll_to_element("[placeholder='Movement Speed']", 0.5)
        operation_keys(data[i]['speed'], dialog, By.XPATH, "//textarea[@placeholder='Movement Speed']")
        confirm[1].click()

        scroll_to_element("[placeholder='Altnative Movement Speed']", 0.5)
        operation_keys(data[i]['alternative_speed'], dialog, By.XPATH, "//textarea[@placeholder='Altnative Movement Speed']")
        confirm[2].click()

        scroll_to_element("[placeholder='Terror Radius']", 0.5)
        operation_keys(data[i]['terror'], dialog, By.XPATH, "//textarea[@placeholder='Terror Radius']")
        confirm[3].click()

        scroll_to_element("[placeholder='Altnative Terror Radius']", 0.5)
        operation_keys(data[i]['alternative_terror'], dialog, By.XPATH, "//textarea[@placeholder='Altnative Terror Radius']")
        confirm[4].click()

        scroll_to_element(".p-dropdown-trigger", 0.5)
        height_toggle = dialog.find_elements(By.CLASS_NAME, "p-dropdown-trigger")
        height_toggle[0].click()
        height_selectors = browser.find_elements(By.CLASS_NAME, "p-dropdown-item")
        if data[i]['height'] == 'Tall':
            height_selectors[0].click()
        elif data[i]['height'] == 'Average':
            height_selectors[1].click()
        elif data[i]['height'] == 'Short':
            height_selectors[2].click()
        confirm[5].click()

        scroll_to_element("[placeholder='Weapon']", 0.5)
        operation_keys(data[i]['weapon'], dialog, By.XPATH, "//input[@placeholder='Weapon']")
        confirm[7].click()

        scroll_to_element("[placeholder='Power']", 0.5)
        operation_keys(data[i]['power'], dialog, By.XPATH, "//input[@placeholder='Power']")
        confirm[8].click()

        inner_scroll(".p-dialog-content", 800, 0.5)
        path = ""
        perks = dialog.find_element(By.XPATH, "//input[@data-type='perks']")
        for j in range(0, len(data[i]['perk_names'])):
            if j != 0: path += "\n"
            cnt = '/' + str(data[i]['perk_names'][j]).replace('"', "").replace(':', "")
            path += "C:/Users/marve/OneDrive/桌面/website-2.0/python/img/perks/" +  data[i]['killer_name']  + cnt + '.gif'
        perks.send_keys(path)
        confirm[10].click()

        inner_scroll(".p-dialog-content", 1000, 0.5)
        path = ""
        add_ones = dialog.find_element(By.XPATH, "//input[@data-type='add-ones']")
        for j in range(0, len(data[i]['add_ones_name'])):
            if j != 0: path += "\n"
            cnt = '/' + str(data[i]['add_ones_name'][j]).replace('"', "").replace(':', "")
            path += "C:/Users/marve/OneDrive/桌面/website-2.0/python/img/add-ones/" +  data[i]['killer_name']  + cnt + '.jpg'
            print(path)
        add_ones.send_keys(path)
        confirm[14].click()

        complete = browser.find_element(By.XPATH, "//button[@data-type='complete']")
        complete.click()
        time.sleep(1)

    print("ALL DONE")
    browser.close()
    