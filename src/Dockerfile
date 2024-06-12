FROM node:alpine
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY /src/next.config.mjs .
COPY /src/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs /src/.next/standalone ./
COPY --chown=nextjs:nodejs /src/.next/static ./.next/static
COPY --chown=nextjs:nodejs /src/public ./public

CMD node server.js