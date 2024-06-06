# 📦 Product Management API

![NestJS](https://img.shields.io/badge/NestJS-7E1E9C?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Gestion Produits est une application permettant de gérer des produits, construite avec NestJS et PostgreSQL.

## 🚀 Fonctionnalités

- Ajouter, modifier et supprimer des produits
- Lister les produits
- Recherche de produits par nom ou catégorie
- Authentification et autorisation des utilisateurs

## 🛠️ Prérequis

- Docker
- Visual Studio Code avec l'extension Remote - Containers
- Un fichier `.env` configuré avec les variables nécessaires :

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
```

## 🐳 Configuration du Conteneur de Développement

1. **Installer Docker**: [Get Docker](https://www.docker.com/get-started)
2. **Installer l'extension Remote - Containers**: [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## 📦 Installation

Clonez le repository et ouvrez-le dans Visual Studio Code.

```sh
git clone https://github.com/MSPR-PayeTonKawa/gestionProduits.git
cd api-gestion-produits
```

Ouvrez le projet dans Visual Studio Code.

```sh
code .
```

Ouvrez la palette de commandes (Ctrl+Shift+P) et sélectionnez `Remote-Containers: Reopen in Container`.

## 📜 Scripts

### `.devcontainer/setup.sh`

```sh
#!/bin/bash

# Update package lists
apt-get update

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
```

### `devcontainer.json`

```json
{
  "name": "Gestion Produits",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye",
  "forwardPorts": [5432, 3000],
  "runArgs": ["--env-file", ".env"],
  "postCreateCommand": "bash .devcontainer/setup.sh",
  "remoteUser": "root"
}
```

## 📖 Utilisation

Vous pouvez lancer l'application avec :

```sh
docker compose  up db-produits  -d
npm run start
```

L'application sera disponible sur `http://localhost:3000`.

## 🔧 Développement

Pour lancer les tests, utilisez :

```sh
npm run test
```

Pour vérifier la couverture de test, utilisez :

```sh
npm run test:cov
```

---

Fait avec ❤️ par [AkaTordu](https://github.com/AkaTordu)