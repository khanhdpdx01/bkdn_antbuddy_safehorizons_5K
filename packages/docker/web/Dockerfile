# Specify base image
FROM node:12.22.5-alpine as dependencies
LABEL version="1.0"
# Maintainer information
LABEL maintainer = ["anhle1512001@gmail.com", "khanhdpdx@gmail.com"]

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./frontend/package*.json ./

# install project dependencies
RUN npm install --frozen-lockfile

FROM node:12.22.5-alpine as builder

WORKDIR /app
# Copy the front-end project to the app directory
COPY ./frontend .

COPY --from=dependencies /app/node_modules ./node_modules

# Packing purpose: to run under nginx
RUN npm run build

FROM node:12.22.5-alpine as runner

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Front end project run command
# CMD ["npm","run","start"]
CMD ["node_modules/.bin/next", "start"]
