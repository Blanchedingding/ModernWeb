FROM node
MAINTAINER dingding <17212010004@fudan.edu.cn>

RUN mkdir -p /app
WORKDIR /app

ADD ./app.js /app/
ADD ./package.json /app/

ADD ./bin /app/bin
ADD ./node_modules /app/node_modules
ADD ./public /app/public
ADD ./routes /app/routes
ADD ./views /app/views

# RUN npm install
CMD [ "npm", "start" ]

EXPOSE 3000