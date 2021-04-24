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

[![Express](https://img.shields.io/badge/-Express-000000?logo=Express)](https://expressjs.com/)
[![Angular](https://img.shields.io/badge/-Angular-dd0031?logo=Angular)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/-Node.js-333333?logo=Node.js)](https://nodejs.org/)
[![IndexedDB](https://img.shields.io/badge/-IndexedDB-cccccc?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAxLjE1IDEyMi44OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAxLjE1IDEyMi44OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTE4LjAzLDI3LjE5YzguMjYsMi43NiwxOS43Niw0LjQ2LDMyLjUzLDQuNDZjMTIuNzcsMCwyNC4yNy0xLjcxLDMyLjUzLTQuNDZjNy4yNS0yLjQyLDExLjc0LTUuMzUsMTEuNzQtOC4yMiBjMC0yLjg3LTQuNDgtNS44LTExLjc0LTguMjJDNzQuODMsOCw2My4zMyw2LjI5LDUwLjU2LDYuMjljLTEyLjc3LDAtMjQuMjcsMS43MS0zMi41Myw0LjQ2QzIuNjUsMTUuODksMi4yMiwyMS45MSwxOC4wMywyNy4xOSBMMTguMDMsMjcuMTl6IE05NC44NCw4NS41OWMtMi41OCwxLjc3LTUuODcsMy4zMi05Ljc2LDQuNjJjLTguOSwyLjk3LTIxLjExLDQuODEtMzQuNTIsNC44MWMtMTMuNDEsMC0yNS42Mi0xLjg0LTM0LjUyLTQuODEgYy0zLjg0LTEuMjgtNy4xMS0yLjgyLTkuNjgtNC41NXYxOC44NWMwLjU3LDIuNjcsNC45Miw1LjM3LDExLjY3LDcuNjJjOC4yNiwyLjc2LDE5Ljc2LDQuNDYsMzIuNTMsNC40NnMyNC4yNy0xLjcxLDMyLjUzLTQuNDYgYzUuMDEtMS42Nyw4LjY5LTMuNTksMTAuNS01LjU1YzEuNDktMS42MiwxLjI1LTIuNjksMS4yNS00LjY0Vjg1LjU5TDk0Ljg0LDg1LjU5eiBNMCwxOC45N0MwLDEzLjEsNi4xMyw4LjEyLDE2LjA0LDQuODEgQzI0Ljk0LDEuODQsMzcuMTUsMCw1MC41NiwwYzEzLjQxLDAsMjUuNjIsMS44NCwzNC41Miw0LjgxYzkuMDIsMy4wMSwxNC45MSw3LjQxLDE1Ljg5LDEyLjYxYzAuMTIsMC4zMywwLjE4LDAuNjksMC4xOCwxLjA2djg2Ljc0IGMwLDYuMDEtMTEuNDksMTEuMzMtMTYuMDcsMTIuODZjLTguOSwyLjk3LTIxLjExLDQuODEtMzQuNTIsNC44MWMtMTMuNDEsMC0yNS42Mi0xLjg0LTM0LjUyLTQuODEgYy00LjY5LTEuNTctMTUuOTctNi43MS0xNS45Ny0xMi44NmMwLTAuNzIsMC0xLjMyLDAtMi4wMUMwLjA3LDc1LjEyLDAsNDcuMDQsMCwxOC45N0wwLDE4Ljk3eiBNNi4zNiw3Ni42NCBjMC41NywyLjY3LDQuOTIsNS4zNywxMS42Nyw3LjYyYzguMjYsMi43NiwxOS43Niw0LjQ2LDMyLjUzLDQuNDZzMjQuMjctMS43MSwzMi41My00LjQ2YzcuMjUtMi40MiwxMS43NC01LjM1LDExLjc0LTguMjJoMC4wMyBWNTcuNzNjLTIuNTgsMS43Ny01Ljg5LDMuMzItOS43OCw0LjYyYy04LjksMi45Ny0yMS4xMSw0LjgxLTM0LjUyLDQuODFjLTEzLjQxLDAtMjUuNjItMS44NC0zNC41Mi00LjgxIGMtMy44NC0xLjI4LTcuMTEtMi44Mi05LjY4LTQuNTVWNzYuNjRMNi4zNiw3Ni42NHogTTYuMzYsNDguNzhjMC41NywyLjY3LDQuOTIsNS4zNywxMS42Nyw3LjYyYzguMjYsMi43NiwxOS43Niw0LjQ2LDMyLjUzLDQuNDYgczI0LjI3LTEuNzEsMzIuNTMtNC40NmM3LjI1LTIuNDIsMTEuNzQtNS4zNSwxMS43NC04LjIyaDAuMDNWMjguNTJjLTIuNTgsMS43Ny01Ljg5LDMuMzItOS43OCw0LjYyIGMtOC45LDIuOTctMjEuMTEsNC44MS0zNC41Miw0LjgxYy0xMy40MSwwLTI1LjYyLTEuODQtMzQuNTItNC44MWMtMy44NC0xLjI4LTcuMTEtMi44Mi05LjY4LTQuNTVWNDguNzhMNi4zNiw0OC43OHoiLz48L2c+PC9zdmc+)](https://developer.mozilla.org/de/docs/Web/API/IndexedDB_API)

- [Express](https://expressjs.com/) - The web framework used at the backend
- [Angular](https://angular.io/) - The web framework used at the frontend
- [Node.js](https://nodejs.org/en/) - The backend power
- [IndexedDB](https://developer.mozilla.org/de/docs/Web/API/IndexedDB_API) - The database to store your flashcards

## 📜 License

[![GitHub license](https://img.shields.io/github/license/piuswalter/StudyOffline)](https://github.com/piuswalter/StudyOffline/blob/main/LICENSE.md)

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
