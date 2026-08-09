#!/bin/sh
set -e

npm run docker:migrate

exec "$@"
