FROM nginx:alpine

# Force rebuild: v2 - readiness tab with bulk mobilize
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY index.html /usr/share/nginx/html/index.html
COPY ai-player.js /usr/share/nginx/html/ai-player.js

EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
