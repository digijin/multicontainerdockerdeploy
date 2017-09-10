FROM mhart/alpine-node:8
COPY dist /var/app
ADD package.json /var/app
ADD yarn.lock /var/app
ADD node_modules /var/app/node_modules
# RUN yarn
RUN npm rebuild
WORKDIR /var/app
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "start"]