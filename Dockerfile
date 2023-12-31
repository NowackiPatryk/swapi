FROM node:19

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]