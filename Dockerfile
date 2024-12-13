FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .. .

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]