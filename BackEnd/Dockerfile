<<<<<<< HEAD
FROM node:18-alpine
WORKDIR /usr/app/pomodoro/backend
COPY ["package.json","package-lock.json*","./"]
RUN npm install
COPY . .
RUN npx prisma generate
=======
FROM node:18-alpine
WORKDIR /usr/app/pomodoro/backend
COPY ["package.json","package-lock.json*","./"]
RUN npm install
COPY . .
RUN npx prisma generate
>>>>>>> 4ab4f662493d5cc0bfc71dd032d2a04317da7520
CMD ["npm","run","dev"]