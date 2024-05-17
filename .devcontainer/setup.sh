#!/bin/bash

# Update package lists
apt-get update

# Install dos2unix
apt-get install -y dos2unix

# Convert line endings of setup.sh
dos2unix /workspaces/api-gestion-produits/.devcontainer/setup.sh

# Install PostgreSQL
apt-get install -y postgresql postgresql-contrib

# Install NestJS CLI globally
npm install -g @nestjs/cli

# Install npm packages for the project
npm install

# Start PostgreSQL service
service postgresql start

# Create a PostgreSQL user and database
sudo -u postgres psql -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';"
sudo -u postgres psql -c "ALTER USER $POSTGRES_USER WITH SUPERUSER;"
sudo -u postgres psql -c "CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"