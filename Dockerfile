FROM node:15.10-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install -g pm2
RUN npm install --production --silent
# Change the env variables to actual you need
ENV DS_SOC_PORT=8099
ENV TBS_ADDR=ws://tbs:8098
# This port must be equals to DS_SOC_PORT variable
EXPOSE 8099
# Do not change this port, it is listening the express app
EXPOSE 3000
CMD ["npm", "start"]
