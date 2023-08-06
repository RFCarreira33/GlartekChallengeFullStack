# GlartekChallengeFullStack

This project consists of a backend developed in [Golang](https://go.dev/) providing a REST API to retrieve weather information from [OpenWeatherAPI](https://openweathermap.org/) for cities such as Leiria, Lisboa, Coimbra, Porto, and Faro. The frontend, built with [React](https://react.dev/), displays widgets for each city with up-to-date weather data and a 48 hour forecast, updated at least every 30 minutes.

## Technologies

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [Go](https://go.dev/)
- [Gin](https://gin-gonic.com/)

### Local Setup

This project uses `.env` files but for the sake of convenience I've included them in the repository. Just rename them from `.env.example` to `.env` and you're good to go.

**Note**: If you decide to change the `.env` files make sure both hosts and ports match.

```bash
git clone https://github.com/RFCarreira33/GlartekChallengeFullStack
## Backend (API)
cd api
go run main.go

## Frontend
cd frontend
npm i
npm run dev
```

#### Login Credentials

No **database** was used for this project, so the login credentials are hardcoded, and because of that **JWT** tokens don't have an expiration date.

Login credentials:

> - Username: glartek
> - Password: password123
