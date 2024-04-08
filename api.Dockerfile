FROM node:21-alpine

WORKDIR /usr/src/app

COPY api .

RUN npm install

EXPOSE 1234

CMD ["npm","start"]
