FROM node:24-alpine

COPY ./clients/admin/package*.json .
RUN npm ci

COPY ./clients/admin .
COPY ./clients/shared ../shared

CMD ["sh", "-lc", "npm run build && cp -r dist/* /out/"]
