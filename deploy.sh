# deploy.sh

#!/usr/bin/env sh

# 當發生錯誤時終止腳本運行
#set -e

npm run build
npm run deploy

cd -
read -n 1 -p "Press any key to continue..."
