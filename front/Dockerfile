FROM node:alpine
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node package.json .
RUN npm install

COPY --chown=node:node . .
USER node

EXPOSE 3000

CMD ["npm", "start"]



