FROM oven/bun:1

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json ./

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun", "run", "start"]
