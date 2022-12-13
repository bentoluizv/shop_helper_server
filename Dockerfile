FROM node:18
WORKDIR /app/src/
COPY "package.json" .
RUN yarn