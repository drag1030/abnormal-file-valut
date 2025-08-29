FROM python:3.10-slim

WORKDIR /app

# Install system dependencies (including curl for Docker healthcheck)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip & install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Prepare directories and set permissions
RUN mkdir -p media staticfiles data \
    && chmod -R 777 media staticfiles data

# Collect static files at build time
ENV DJANGO_SETTINGS_MODULE=core.settings
RUN python manage.py collectstatic --noinput || true

# Make start script executable
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 8000

# Start backend using start.sh
CMD ["./start.sh"]
