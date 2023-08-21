FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE 4000

RUN npm run build

CMD ["npm", "run", "start:dev"]