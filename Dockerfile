FROM node:18 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY ./dist .
COPY ./prisma .
EXPOSE 8080
ENV DATABASE_URL=postgres://postgres:postgrespw@postgres:5432
CMD [ "node", "server.js" ]