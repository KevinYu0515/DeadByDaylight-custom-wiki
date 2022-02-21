# deploy.sh

#!/usr/bin/env sh

# 當發生錯誤時終止腳本運行
#set -e

# 打包
npm run build

# 移動至到打包後的dist目錄 
cd dist

git init # 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git add -A
git commit -m 'deploy'

# 部署到遠端 repo，分支為 gh-pages
# 將 dist 資料夾中的內容推送至遠端 repo 的 gh-pages 分支中，並無條件強制地將舊有的內容取代成目前的內容（git push -f)
# git push -f https://github.com/Kevin051596/website-1.0.git master:gh-pages
git push -f https://github.com/Kevin051596/website-1.0.git master:gh-pages
cd -
read -n 1 -p "Press any key to continue..."
