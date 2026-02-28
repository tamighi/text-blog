FROM node:24-alpine

WORKDIR /app

COPY ./api/package*.json ./
RUN npm install

COPY ./api/prisma ./
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]
