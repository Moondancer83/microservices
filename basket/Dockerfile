FROM node:carbon-jessie AS base
WORKDIR /app
COPY basket/src/ ./
EXPOSE 80

FROM base AS dev
RUN npm i -g nodemon
CMD [ "npm", "run", "watch" ]

FROM base AS prod
CMD [ "npm", "start" ]