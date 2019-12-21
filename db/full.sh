#!/usr/bin/env bash
SCRIPTS=$( cd "$( dirname "${BASH_SOURCE[0]}" )/../scripts" && pwd )
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

echo "This script DROPS and create new GENERAL database from fixture"

${SCRIPTS}/confirm.sh $1 && rm -f ${DIR}/db.sqlite && sqlite3 ${DIR}/db.sqlite < ${DIR}/fixture.sql && chmod 777 ${DIR}/db.sqlite

