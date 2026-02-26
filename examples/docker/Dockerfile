# Use a lightweight, modern Python base image
FROM python:3.12-slim

# Install system dependencies required for the PostgreSQL driver
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Install uv for blazingly fast package installations
RUN pip install uv

# Set our working directory inside the container
WORKDIR /app

# Copy over the requirements and install them globally within the container
COPY requirements.txt .
RUN uv pip install --system -r requirements.txt

# The CMD is handled by docker-compose (tail -f /dev/null to keep it awake)
