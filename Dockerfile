FROM nginx:mainline

RUN apt-get update
RUN apt-get install curl git build-essential fail2ban -y

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install --yes nodejs redis-server mariadb-server
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install --yes yarn
RUN service mysql start
RUN service redis-server start

RUN mysqld_safe & until mysqladmin ping; do sleep 1; done && \
    mysql -uroot -e "CREATE DATABASE survey;" && \
    mysql -uroot -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'Mysql123@@';"

WORKDIR /usr/share/nginx/html
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY . .
RUN yarn global add @babel/node @babel/cli @babel/core
EXPOSE 80
RUN service mysql start
RUN service redis-server start

ENV NODE_ENV=production
RUN chmod +x bin/start.sh
CMD ["bin/start.sh"]
