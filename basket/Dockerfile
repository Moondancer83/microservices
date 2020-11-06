FROM node:carbon-jessie AS base
WORKDIR /app
# Realetive to docker-compose.yml/build.context
COPY basket/src/ ./
EXPOSE 80

FROM base AS dev
RUN npm i -g nodemon
CMD [ "npm", "run", "watch" ]

FROM base AS prod
CMD [ "npm", "start" ]