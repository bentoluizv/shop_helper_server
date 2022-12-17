FROM node:18
WORKDIR /app/src/
COPY "package.json" .
RUN yarn install --prod
COPY ./dist app/src/dist