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
ARG NEXT_PUBLIC_DOCS_URL=
# No default. src/lib/site.ts refuses to build without a valid URL here, so a
# build that forgets to pass this fails at `npm run build` instead of
# shipping a login link hardcoded to the wrong environment.
ARG NEXT_PUBLIC_APP_URL=

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_DOCS_URL=${NEXT_PUBLIC_DOCS_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

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
