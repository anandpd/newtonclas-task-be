FROM node:15
WORKDIR /app
COPY package.json ./
RUN npm i
ARG NODE_ENV
COPY ./ ./
ENV PORT=3030
EXPOSE $PORT
CMD [ "npm", "start" ]