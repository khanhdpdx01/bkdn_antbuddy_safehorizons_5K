# Specify base image
FROM node:12.22.5-alpine as dependencies
LABEL version="1.0"
# Maintainer information
LABEL maintainer = ["anhle1512001@gmail.com", "khanhdpdx@gmail.com"]

WORKDIR /app

COPY ./backend/package*.json ./
COPY ./backend/.env ./

RUN npm install

COPY ./backend .
# Packing purpose: to run under nginx
RUN npm run build

# run migrate knex migrate database
#RUN npm run migrate:lastest
# RUN npm run build
# COPY --from=builder /app/dist ./
# COPY --from=dependencies /app/.env .
# RUN cd dist
EXPOSE 8000

# Back end project run command
CMD ["npm","run","server"]
