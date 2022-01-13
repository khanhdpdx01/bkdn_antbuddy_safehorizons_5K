# Specify base image
FROM node:12.22.5-alpine
LABEL version="1.0"
# Maintainer information
LABEL maintainer = ["anhle1512001@gmail.com", "khanhdpdx@gmail.com"]

WORKDIR /app

COPY ./backend/package*.json ./

# Copy the front-end project to the app directory
COPY ./backend .

# install project dependencies
# RUN npm install --production
RUN npm install

# run migrate knex migrate database
#RUN npm run migrate:lastest
RUN npm run build
RUN cd dist

EXPOSE 8000

# Back end project run command
CMD ["npm","run","server"]
