ARG APACHE_VERSION=""
FROM httpd:${APACHE_VERSION:+${APACHE_VERSION}}

COPY vhosts.conf /usr/local/apache2/conf/vhosts.conf

RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf


RUN echo "Include /usr/local/apache2/conf/vhosts.conf" \
    >> /usr/local/apache2/conf/httpd.conf