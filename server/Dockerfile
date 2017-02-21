FROM frolvlad/alpine-scala

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN ./sbt compile

EXPOSE 8080

CMD ["./sbt", "; seed-db; ~jetty:start"]
