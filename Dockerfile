FROM node:14.17-slim
RUN mkdir /app
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn prebuild
RUN yarn build

CMD ["yarn", "start:prod"]