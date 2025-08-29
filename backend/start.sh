#!/bin/sh
set -e

echo "Preparing directories..."
mkdir -p /app/data /app/media /app/staticfiles
chmod -R 777 /app/data /app/media /app/staticfiles

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Starting Gunicorn..."
gunicorn core.wsgi:application \
  --bind 0.0.0.0:$PORT \
  --workers 3 \
  --timeout 120
