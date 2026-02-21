# Build context: repo root (docker-compose context: ..)
# Requires protocol/ and backend/api/ in context.

FROM node:22-alpine

WORKDIR /app

# Copy protocol and backend (preserves ../../protocol path from backend/api)
COPY protocol ./protocol
COPY backend/api ./backend/api

# Build protocol
WORKDIR /app/protocol
RUN npm install && npm run build

# Install and build backend (file:../../protocol resolves to /app/protocol)
WORKDIR /app/backend/api
RUN npm install && npm run build

# Run from backend directory
WORKDIR /app/backend/api
EXPOSE 8080
CMD ["npm", "start"]
