FROM node:21-alpine3.17

EXPOSE 3000

COPY db.json /opt/db.json

RUN yarn global add json-server@0.17.4

CMD ["json-server", "-H", "0.0.0.0", "/opt/db.json"]
