FROM node:24-alpine

COPY ./clients/site/package*.json ./
RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "--port", "5174"]
