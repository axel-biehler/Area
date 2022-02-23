FROM node:alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node package.json .
RUN npm install

COPY --chown=node:node . .
USER node

EXPOSE 8081

CMD ["npm", "start"]



