# for production mode

# pulling node.js 20.10.0-alpine
FROM node:20.10.0-alpine 

# Sets the current working directory for subsequent instructions.
WORKDIR /prod/user

# copying package.json & package-lock.json to WORKDIR
COPY ./package*.json ./

# installing required packages
RUN npm install

# copy local files to working directory
COPY ./ ./

# building files
RUN npm run build

EXPOSE 5001

# executing command
CMD [ "npm","start" ]
