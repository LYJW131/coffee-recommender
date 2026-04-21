# Self Hosting Guide

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required:

- `GEMINI_API_KEY`
- `GEMINI_MODEL` (default `gemini-flash-lite-latest`)
- `PORT` (default `3000`)

Optional (custom endpoint):

- `GEMINI_BASE_URL` (default `https://generativelanguage.googleapis.com`)
- `GEMINI_ENDPOINT` (full override; higher priority than `GEMINI_BASE_URL`)

## 3) Build and run with Node

```bash
npm run build
npm run start
```

`npm run start` uses `node --env-file=.env`, so values in `.env` are loaded automatically.

The app runs at `http://127.0.0.1:3000`.

## 4) Run with PM2

Update `cwd` in `ecosystem.config.cjs` to your deploy path, then:

```bash
npm i -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## 5) Run with Docker

```bash
docker build -t liftttttt-frontend .
docker run -d --name liftttttt-frontend \
  -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  -e GEMINI_MODEL=gemini-flash-lite-latest \
  -e PORT=3000 \
  liftttttt-frontend
```
