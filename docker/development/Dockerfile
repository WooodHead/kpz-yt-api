FROM node:lts-alpine

COPY ["./docker/wait-for", "/"]

RUN apk add --no-cache git
RUN apk add --no-cache dos2unix
RUN dos2unix /wait-for

RUN npm install -g npm

WORKDIR /app