FROM node:14.1.0 as builder

# Create app directory
WORKDIR /usr/src/./

# Install app dependencies

COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

FROM node:carbon-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 8080

CMD [ "npm", "start" ]