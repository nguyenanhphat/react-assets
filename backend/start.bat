npm i -g pm2
pm2 ls
pm2 stop api --silent
pm2 delete api --silent
pm2 start app.js --name "api"
