# Business card and blog using typescript, React, server-side rendering, KoaJS, SQLite

## Preparation 

       ./db/fixture.sh
       ./db/full.sh 
       npm i
       npm run build
       
### You need to create user for editing blog

Execute command with arguments in this order (email, password, username)

    node ./scripts/create-user.js email@email.com password name

Fixture has a tester user (`i@shagg.ru`, `testerPassword123`, `tester`).

It must be removed from production database 

## To run app
    npm start
    
Application will run on 3080 port

## To run tests

    npm t
