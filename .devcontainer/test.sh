#!/bin/sh
npm install -g @nestjs/cli
npm install

# Vérifier l'installation et démarrer PostgreSQL (si ce n'est pas déjà fait)
if ! service postgresql status >/dev/null 2>&1; then
    service postgresql start
fi

# Créer un utilisateur dans la base de données PostgreSQL
psql -U postgres -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';"
psql -U postgres -c "ALTER USER $POSTGRES_USER WITH SUPERUSER;"
psql -U postgres -c "CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"