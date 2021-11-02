FROM node:14.17-slim
RUN mkdir /app
WORKDIR /app

RUN apt-get update \
  && apt-get install -y apt-transport-https \
  && apt-get install -y wget gnupg \


RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

COPY . .
RUN yarn install

CMD ["yarn", "start"]