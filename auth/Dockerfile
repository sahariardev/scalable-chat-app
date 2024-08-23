FROM --platform=linux/amd64 node:lts-alpine3.19

WORKDIR /app

COPY . /app

COPY .dockerignore /app/.dockerignore

RUN npm install


CMD ["npm", "run", "start"]