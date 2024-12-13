# Utiliser l'image officielle Python
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier requirements.txt
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le contenu de l'application
COPY ./app ./app

# Exposer le port 8000
EXPOSE 8000

# Commande pour lancer l'application avec uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
