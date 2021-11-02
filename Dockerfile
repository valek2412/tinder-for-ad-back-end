FROM node:14.17-slim
RUN mkdir /app
WORKDIR /app

COPY . .
RUN yarn install

CMD ["yarn", "prebuild"]
CMD ["yarn", "build"]
CMD ["yarn", "start:prod"]