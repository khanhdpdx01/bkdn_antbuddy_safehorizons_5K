# ========================Top: npm package bottom: nginx run========================
# nginx mirror image
FROM nginx:1.15.3-alpine as production-stage

# Maintainer information
LABEL maintainer = ["anhle1512001@gmail.com", "khanhdpdx@gmail.com"]

# Remove the default.conf file and nginx configuration file of nginx container
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# Copy the nginx.conf file of the host to the / etc/nginx folder of the nginx container
COPY ./docker/nginx/nginx.conf /etc/nginx

# Copy the file generated after the package of the front-end vue project and run it under nginx
# COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
# EXPOSE 443

# Running nginx in the foreground by using the method of daemon off to ensure that the image does not exit
CMD ["nginx", "-g", "daemon off;"]