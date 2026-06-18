#!/bin/sh
set -e

echo "Running database migrations..."
prisma migrate deploy

echo "Seeding database..."
prisma db seed

echo "Starting application..."
node .output/server/index.mjs
