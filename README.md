<div align="center">
    <a href="#"><img src="https://raw.githubusercontent.com/piuswalter/StudyOffline/main/logo.png" alt="StudyOffline" width="200"></a>
    <br />
    <h1>StudyOffline</h1>
    <small>Built with ❤️ and 🍺 by
        <a href="https://github.com/p-fruck">Philipp</a>,
        <a href="https://github.com/piuswalter">Pius</a> and
        <a href="https://github.com/piuswalter/StudyOffline/graphs/contributors">contributors</a>
    </small>
</div>

---

[![GitHub license](https://img.shields.io/github/license/piuswalter/StudyOffline)](https://github.com/piuswalter/StudyOffline/blob/main/LICENSE.md)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/piuswalter/StudyOffline/development)
[![GitHub issues](https://img.shields.io/github/issues/piuswalter/StudyOffline)](https://github.com/piuswalter/StudyOffline/issues)
![Lines of code](https://img.shields.io/tokei/lines/github/piuswalter/StudyOffline)
![GitHub language count](https://img.shields.io/github/languages/count/piuswalter/StudyOffline)

StudyOffline is an open source tool that allows you to download the flashcards you have created on StudySmarter and study them offline.

In addition, StudyOffline is a PWA (Progressive Web App) with which you can also learn your flashcards on any smartphone.

## ⚒️ Setup your own StudyOffline instance

[![Deploy with Docker](https://img.shields.io/badge/deploy%20with-docker-0db7ed)]()
[![CI/CD](https://github.com/piuswalter/StudyOffline/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/piuswalter/StudyOffline/actions/workflows/docker-publish.yml)

At the moment we do not have published StudyOffline to any container registry yet but you can easily build it by hand.

The requirement is that Docker is installed.

To do this, you just need to run

`docker build https://github.com/piuswalter/StudyOffline.git#main -t studyoffline --no-cache`

Now your container is built and can be started with

`docker run -p 3000:3000 --name studyoffline -d studyoffline`

You can access StudyOffline in your browser on `https://localhost:3000/`.

## ⚙️ Built with latest technologies

- [Express](https://expressjs.com/) - The web framework used at the backend
- [Angular](https://angular.io/) - The web framework used at the frontend
- [Node.js](https://nodejs.org/en/) - The backend power
- [IndexedDB](https://developer.mozilla.org/de/docs/Web/API/IndexedDB_API) - The database to store your flashcards

## 📜 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
