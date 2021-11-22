FROM node:14.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3000

EXPOSE $PORT

CMD  ["node", "server.js"]
