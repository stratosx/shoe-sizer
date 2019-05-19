#!/bin/bash
set -e

printf "Starting Docker container in $NODE_ENV...\n"
printf "Waiting for PG DB to come up...\n";
until node ./bin/wait-for-pg.js
do
  sleep 1;
done
if [ -n "$DB_RESET" ]; then
  printf "\n* Rolling back Database Migrations *\n"
  ./node_modules/.bin/knex migrate:rollback
fi
if [ -n "$DB_MIGRATE" ]; then
  printf "\n* Running Database Migrations *\n"
  ./node_modules/.bin/knex migrate:latest
fi
if [ -n "$DB_SEED" ]; then
  printf "\n* Seeding Database *\n"
  ./node_modules/.bin/knex seed:run
fi
printf "\n* Starting Application *\n\n"
exec "$@"
