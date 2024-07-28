# Stage 1: Compile and Build angular codebase
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --force
RUN npm run build --prod


# Stage 2: Serve app with nginx server
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/back-office-front /usr/share/nginx/html



