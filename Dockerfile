# Étape 1 : Utiliser une image officielle Node.js
FROM node:20-alpine

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le code dans le conteneur
COPY . .

# Étape 6 : Exposer le port sur lequel l'application s'exécute
EXPOSE 4000

# Étape 7 : Démarrer l'application
CMD ["node", "app.js"]
