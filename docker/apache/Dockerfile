ARG APACHE_VERSION=""
FROM httpd:${APACHE_VERSION:+${APACHE_VERSION}-}alpine

RUN apk update; \
    apk upgrade;

# Enable mod_rewrite for images with apache
RUN if command -v a2enmod >/dev/null 2>&1; then \
        a2enmod rewrite headers \
    ;fi

# Copy apache vhost file to proxy php requests to php-fpm container
COPY vhosts.conf /usr/local/apache2/conf/vhosts.conf
RUN echo "Include /usr/local/apache2/conf/vhosts.conf" \
    >> /usr/local/apache2/conf/httpd.conf