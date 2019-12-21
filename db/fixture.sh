#!/usr/bin/env bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

rm -f ${DIR}/db-test.sqlite && sqlite3 ${DIR}/db-test.sqlite < ${DIR}/fixture.sql
