# base image
FROM oven/bun:latest

# set workdir
WORKDIR /app

## copy files
COPY package.json package.json
COPY bun.lockb bun.lockb

#install dependencies
RUN bun install

# copy source code
COPY src src
COPY tsconfig.json tsconfig.json

CMD ["bun", "start:dev"]
