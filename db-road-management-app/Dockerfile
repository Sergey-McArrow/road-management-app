FROM oven/bun:1

WORKDIR /app

COPY package.json ./
COPY db.json ./

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun", "run", "start"]
