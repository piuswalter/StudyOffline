FROM node:16-alpine
ENV NODE_ENV=development

WORKDIR /tmp

COPY backend/ ./backend
COPY frontend/ ./frontend

RUN cd frontend && npm ci && npm run build
RUN cd backend && npm ci && npm run build

RUN mkdir /app && \
    cp -r backend/dist/src/ /app/src && \
    cp -rf frontend/dist/frontend/ /app/src/

WORKDIR /app
RUN rm -r /tmp/backend /tmp/frontend

ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm ci && npm cache clean --force

CMD ["node", "./src/app.js"]
