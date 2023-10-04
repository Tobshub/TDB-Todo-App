FROM golang:latest

RUN apt-get update && apt-get install -y nodejs npm

RUN go version
RUN node -v
RUN npm -v

RUN go install github.com/tobshub/tobsdb/cmd/tdb@v1.1.4

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app .

RUN npm run build

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD [ "/start.sh" ]
