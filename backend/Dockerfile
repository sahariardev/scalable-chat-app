FROM node:latest

WORKDIR /app

COPY . /app

COPY .dockerignore /app/.dockerignore

RUN npm install

CMD ["npm", "run", "start"]