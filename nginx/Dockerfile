FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /certificates/TestDNSLocal.crt /etc/nginx/ssl/TestDNSLocal.crt
COPY /certificates/TestDNSLocal.key /etc/nginx/ssl/TestDNSLocal.key