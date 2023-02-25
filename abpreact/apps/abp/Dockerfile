# 1. Generate a sparse/partial monorepo with a pruned lockfile for a target workspace. https://turborepo.org/docs/reference/command-line-reference#turbo-prune---scopetarget

# Refer to this original https://github.com/vercel/turborepo/blob/main/examples/with-docker/apps/web/Dockerfile

FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

COPY . .
RUN corepack enable
# will remove `turbo@latest` to `turbo` after stable release of 1.4.7
RUN pnpm dlx turbo@latest prune --scope=abp-react --docker


# 2. Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app

# Build the project and its dependencies
ENV NEXT_TELEMETRY_DISABLED 1

# set your APP_NAME
ENV APP_NAME=abp-react

COPY .gitignore .gitignore
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN corepack enable
RUN pnpm install

COPY --from=deps /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=$APP_NAME...

# 3. Production image, copy all the files and run next
FROM node:alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

# set your APP_NAME
ENV APP_NAME=abp-react

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# comment out below if you don't have public folder
COPY --from=builder /app/apps/$APP_NAME/public public

COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD node apps/$APP_NAME/server.js