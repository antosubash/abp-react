FROM node:alpine
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY /apps/abp/next.config.js .
COPY /apps/abp/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs /apps/abp/.next/standalone ./
COPY --chown=nextjs:nodejs /apps/abp/.next/static ./apps/abp/.next/static
COPY --chown=nextjs:nodejs /apps/abp/public ./apps/abp/public

CMD node apps/abp/server.js