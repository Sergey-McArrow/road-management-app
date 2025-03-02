FROM oven/bun:1

WORKDIR /app

COPY package.json ./
COPY db.json ./
COPY . .

RUN bun install

EXPOSE 3001

CMD ["bun", "run", "start"]
