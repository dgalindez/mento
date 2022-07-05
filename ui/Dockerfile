FROM node:18
RUN mkdir -p /ui
WORKDIR /ui
COPY . /ui
RUN yarn install
EXPOSE 3001
CMD [ "yarn", "start" ]
