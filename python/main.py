import os
import shutil

cmd = 'python python/auto_catch.py'
os.system(cmd)
cmd = 'python python/passToFirebase.py'
os.system(cmd)

path = "python/img"
if os.path.isdir(path):
    shutil.rmtree(path)