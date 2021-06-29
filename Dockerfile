FROM node:14.6.0


RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    build-essential


RUN mkdir /mern


ADD ./app /mern


WORKDIR /mern


RUN yarn install
RUN cd /mern/client && yarn install && yarn run build


EXPOSE 5000


ENV NODE_ENV=production


CMD ["node", "server.js"]
