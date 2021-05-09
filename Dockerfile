FROM node:12

WORKDIR /code

COPY . /code

RUN yarn

ARG decrement

EXPOSE 8080