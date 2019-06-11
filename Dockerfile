FROM node:10-alpine

RUN mkdir -p /app

# invalidate cache
RUN uptime

COPY . /app

WORKDIR /app

RUN npm install && cd client && npm install && npm run true

ENV MATERIA_MODE production

EXPOSE 8080
CMD ["npm", "start"]