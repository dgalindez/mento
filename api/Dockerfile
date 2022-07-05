FROM node:18
RUN mkdir -p /api
WORKDIR /api
COPY . /api
RUN yarn install
EXPOSE 3000
CMD [ "yarn", "start" ]
