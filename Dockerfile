# =============================================================================
# Stage 1: Build Next.js app
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# prisma.config.ts resolves DATABASE_URL eagerly even for `prisma generate`
# (which never opens a connection) — a placeholder is enough at build time.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://precia.site

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

RUN npm run build

# =============================================================================
# Stage 2: Runtime image
# =============================================================================
FROM node:20-alpine AS runtime

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci --omit=dev --ignore-scripts

# Generated Prisma client (skipped above via --ignore-scripts) comes from the builder stage.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
