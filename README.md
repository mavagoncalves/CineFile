# CineFile 🎬

> CineFile solves the problem of fragmented movie tracking by providing a centralized dashboard to manage watchlists and ratings across custom, personalized playlists.

CineFile is a full-stack web application built for movie enthusiasts. It acts as a "Spotify for movies," allowing users to dynamically add films, rate them, filter by genre, and curate them into custom-named tabs. 

## Tech Stack
* **Frontend:** React.js, Vite, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose ODM
* **Tooling:** Concurrently (for single-command startup)

## Core Features
* **Smart Auto-Creation:** Type a title and director, and the backend automatically creates the movie document and links it via relational `ObjectId` references.
* **Custom Playlists:** Categorize movies into personalized tabs (e.g., "Romantic movies to cry") that act as instant UI filters.
* **Stacked Filtering:** Filter your dashboard by both Playlist Name and Movie Genre simultaneously.
* **Live Data:** Features an auto-refreshing dashboard powered by a cleanup-safe React `setInterval` hook.
* **Full CRUD:** Create, Read, Update (ratings), and Delete watchlist items directly from the UI.

---

## Quick Setup

Follow these instructions to get the application running locally with a single command.

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v14 or higher)
* A [MongoDB Atlas](https://cloud.mongodb.com/) account (or local MongoDB server)

### 2. Clone the Repository
```bash
git clone https://github.com/mavagoncalves/CineFile.git
cd CineFile
```

### 3. Install Dependencies
This project uses a root `package.json` to manage both the client and server, you can install everything at once from the root directory:
```bash
npm run install-all
```
### 4. Environment Variables Setup
You must configure your local environment variables. Do not hardcode credentials.

1. Navigate to the backend folder.

2. Create a file named exactly .env.

3. Add your MongoDB connection string and port:

```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/CineFile?retryWrites=true&w=majority
```
### 5. Start the Application

```bash
npm run dev
```