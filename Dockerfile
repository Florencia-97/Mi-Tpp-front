# Build stage
FROM node:18.18.2 as builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy and install requirements
COPY package.json package-lock.json /app/
RUN npm install --frozen-lockfile

# Copy source code
COPY public /app/public
COPY src /app/src
COPY .env /app/.env

# Consume environment variables and make production build
RUN export $(grep -v '^#' .env | xargs) && yarn run build

# Production stage
FROM nginx:1.16.0-alpine as production-stage

# Copy js bundle and nginx config
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
