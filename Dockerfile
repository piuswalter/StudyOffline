FROM node:14.14-alpine
ENV NODE_ENV=production

WORKDIR /tmp

COPY backend .
COPY frontend .

RUN cd   frontend && npm ci && npm run build
RUN cd ../backend && npm ci && npm run build

RUN cd .. && mkdir /app && cp -r backend/dist/src /app/

WORKDIR /app
RUN rm -r /tmp/backend /tmp/frontend

CMD ["node", "./src/app.js"]
