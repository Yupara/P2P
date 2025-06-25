FROM nginx:1.24

WORKDIR /app

# Копируем папку public с твоим index.html в папку, которую nginx отдаёт как root
COPY public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
