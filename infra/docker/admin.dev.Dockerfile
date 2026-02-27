FROM node:24-alpine

COPY ./clients/admin/package*.json ./
RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]
