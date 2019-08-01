FROM jlot/node-angular:10.16.0
MAINTAINER lottier.jm@gmail.com

USER root

ARG ELEONORE_PATH=/eleonoreboard
WORKDIR $ELEONORE_PATH
COPY . $ELEONORE_PATH
RUN useradd -m eleonoreboard; cd $ELEONORE_PATH

USER eleonoreboard

EXPOSE 8080

CMD ["ng", "serve", "--host=0.0.0.0", "--port=8080", "--disable-host-check"]
