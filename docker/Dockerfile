FROM node:14.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY  . .

RUN npm run build:csr && npm run build:ssr && npm run build:server

ENV PORT=3000

EXPOSE $PORT

CMD  ["npm", "run", "start:server:prod"]
