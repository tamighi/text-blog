FROM node:24-alpine

WORKDIR /app/site

COPY ./clients/site/package*.json ./
RUN npm ci

COPY ./clients/site ./
COPY ./clients/shared ../shared

CMD ["sh", "-lc", "npm run build && cp -r dist/* /out/"]
