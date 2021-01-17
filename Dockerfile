FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build

ENV CFA_URL="https://ai-api-stag.cofacts.org/"
ENV CFA_ACTION="register"

# for action: start
ENV CFA_API_KEY=""

# for action: start
# the id of model, it will be no longer to use in the future
ENV CFA_ID=""

CMD node dist/index.js