FROM node:18-alpine
WORKDIR /usr/app/pomodoro/backend
COPY ["package.json","package-lock.json*","./"]
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm","run","dev"]