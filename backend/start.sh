#!/bin/sh
set -e  # Exit immediately if any command fails

# Ensure necessary directories
echo "Preparing directories..."
mkdir -p /app/data /app/media /app/staticfiles
chmod -R 777 /app/data /app/media /app/staticfiles

# Apply database migrations
echo "Applying migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

# Start Gunicorn server
echo "Starting Gunicorn..."
gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120
