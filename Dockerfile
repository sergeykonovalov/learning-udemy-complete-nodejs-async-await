FROM node
COPY . /opt/app
WORKDIR /opt/app
CMD ["node", "app.promises.js"]