FROM node:20
RUN npm install -g @angular/cli
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll"]
