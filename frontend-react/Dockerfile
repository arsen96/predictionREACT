# Utilise l'image officielle de Node.js
FROM node:18

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de React
EXPOSE 3000

# Lancer l'application React
CMD ["npm", "start"]
