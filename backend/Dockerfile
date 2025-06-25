FROM nginx:1.24

# Копируем содержимое папки public в папку, которую nginx раздаёт как root
COPY public/nginx/html/

# Копируем кастомный nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
