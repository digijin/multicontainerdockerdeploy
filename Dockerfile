FROM node:6.11.2
ADD . /var/app
WORKDIR /var/app
RUN npm i -g yarn
RUN yarn
ENTRYPOINT npm start
ENV PORT 8080
EXPOSE 8080