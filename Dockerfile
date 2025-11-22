# Node base para desenvolvimento
FROM node:20 AS dev
WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install yarn@1.22.22 --save-dev \
    && npx yarn install --frozen-lockfile

COPY . .

# Node base para produção (faz o build)
FROM node:20 AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install yarn@1.22.22 --save-dev \
    && npx yarn install --frozen-lockfile

COPY . .
RUN npx yarn build

# Nginx para servir produção
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
