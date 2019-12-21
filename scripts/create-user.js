#!/usr/local/bin/node --max-old-space-size=2048
const bcrypt = require('bcryptjs');
const { exec } = require('child_process');
const salt = bcrypt.genSaltSync(10);

const [email, pwd, username] = process.argv.slice(2);

if (!email || !pwd || !username) {
    console.log('You must enter the email, password and username');
} else {
    bcrypt.hash(pwd, salt).then(hash => {
        exec(
            `sqlite3 ${__dirname}/../db/db-test.sqlite "INSERT INTO user (email, password, username) VALUES ('${email}', '${hash}', '${username}')"`
        );
        exec(
            `sqlite3 ${__dirname}/../db/db.sqlite "INSERT INTO user (email, password, username) VALUES ('${email}', '${hash}', '${username}')"`
        );
    });
}
