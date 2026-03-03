# ── Stage 1: Builder ──────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# ── Stage 2: Production ───────────────────────────────
FROM node:18-alpine AS production

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser  -S nodeuser -u 1001

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/src ./src
RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', \
    (r) => r.statusCode===200 ? process.exit(0) : process.exit(1))"

ENV NODE_ENV=production
CMD ["node", "src/app.js"]
