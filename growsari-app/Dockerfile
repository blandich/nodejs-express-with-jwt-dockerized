FROM node:14
WORKDIR /growsari-app
COPY ./package.json .
RUN rm -rf node_modules package-lock.json
RUN npm install
COPY . .
CMD npm start