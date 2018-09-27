FROM nginx:alpine

RUN apk add --no-cache bash

ADD dist/my-env/ /var/www/portal/
RUN sh -c 'chmod 777 -R /var/www/portal'

ADD start.sh /start.sh
RUN sh -c 'chmod +x  /start.sh'

ADD default.conf /etc/nginx/conf.d/default.conf
ADD nginx.conf  /etc/nginx/nginx.conf

ENTRYPOINT ["./start.sh"]