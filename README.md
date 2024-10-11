# Chat

## Description

Ce projet est une application de chat en temps réel qui permet aux utilisateurs de communiquer instantanément dans des salles de chat. Développée avec React pour le front-end et Express.js pour le back-end, elle utilise Socket.IO pour les communications en temps réel. Le déploiement est facilité par Docker, avec le front-end servi par Apache et le back-end gérant les connexions WebSocket pour une interaction fluide et rapide.

## Prérequis

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Récupérez les fichiers du projet :

2. Modifiez les addresses IP dans les fichiers `front/src/App.js` et `back/server.js` pour correspondre à votre configuration réseau.

3. Placez-vous à la racine du projet :

```bash
cd Chat
```

4. Lancez les conteneurs Docker :

```bash
docker-compose up
```

5. Ouvrez votre navigateur et rendez-vous à l'adresse de votre serveur au port 666 pour accéder à l'application.

## Utilisation

1. Entrez un nom d'utilisateur et choisissez une salle de chat. (Pour l'instant il n'y a qu'une seule salle de chat et tout le monde s'appelle Charlie.)

2. Commencez à discuter avec les autres utilisateurs connectés.

3. Pour quitter la salle de chat, cliquez sur le bouton "Se déconnecter". (Ca ne fonctionne pas encore)

## Structure du projet

- `front/` : Contient les fichiers du front-end de l'application.
- `back/` : Contient les fichiers du back-end de l'application.
- `docker-compose.yml` : Fichier de configuration Docker Compose pour lancer les conteneurs.
- `README.md` : Fichier de description du projet.