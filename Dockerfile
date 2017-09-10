FROM mhart/alpine-node:8
ADD dist /var/app
ADD package.json /var/app
ADD yarn.lock /var/app
ADD node_modules /var/app/node_modules
WORKDIR /var/app
RUN yarn
RUN npm rebuild
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "start"]