FROM node:10

WORKDIR /opt/shoe-sizer
RUN chown -R node:node .

USER node

COPY *.json ./

RUN npm install

COPY --chown=node:node . .

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ENV PORT=8080 \
    PATH="/opt/web/node_modules/.bin:${PATH}"

EXPOSE 8080

CMD [ "node", "./bin/www" ]
