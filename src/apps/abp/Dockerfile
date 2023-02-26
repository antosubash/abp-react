FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm dlx turbo prune --scope=abp-react --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

 
# Build the project
COPY --from=builder /app/out/full/ .
RUN corepack enable
RUN pnpm install
RUN pnpm turbo run build --scope=abp-react
 
FROM node:alpine AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/abp/next.config.js .
COPY --from=installer /app/apps/abp/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/abp/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/abp/.next/static ./apps/abp-react/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/abp/public ./apps/abp-react/public
 
CMD node apps/abp/server.js