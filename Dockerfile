FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY ai-player.js /usr/share/nginx/html/ai-player.js
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
