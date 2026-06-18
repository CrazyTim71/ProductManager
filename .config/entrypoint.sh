#!/bin/sh
set -e

echo "Running database migrations..."
bun prisma migrate deploy

echo "Seeding database..."
bun prisma db seed

echo "Starting application..."
node .output/server/index.mjs
