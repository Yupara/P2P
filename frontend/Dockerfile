FROM node:18

WORKDIR /app

COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build
RUN npm install -g serve

EXPOSE 5000
CMD ["serve", "-s", "build"]
