#!/bin/sh
set -e

echo "Running database migrations..."
prisma migrate deploy

prisma db seed

echo "Starting application..."
node .output/server/index.mjs