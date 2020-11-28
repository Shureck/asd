mkdir uiFROM node:14.13.1-alpine3.12
RUN npm install -g postgraphile@4.7.0
COPY . .
RUN cd pg-relation-tag-plugin && npm i -g && cd ..
RUN npm install -g postgraphile-plugin-connection-filter pg-relation-tag-plugin
EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]
