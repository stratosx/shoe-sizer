FROM node:10

WORKDIR /opt/app
RUN chown -R node:node .

USER node

COPY *.json ./

RUN npm install

COPY --chown=node:node . .

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ENV PORT=8080 \
    PATH="/opt/app/node_modules/.bin:${PATH}"

EXPOSE 8080
ENTRYPOINT [ "bash", "./docker-entrypoint.sh" ]
CMD [ "node", "./bin/www" ]
