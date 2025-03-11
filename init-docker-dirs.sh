#!/bin/bash

# Create directories for Docker volumes
mkdir -p docker-data
mkdir -p docker-data/postgres
mkdir -p docker-data/minio

# Set proper permissions
chmod 777 docker-data/postgres
chmod 777 docker-data/minio
