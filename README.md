# Descripción

## Correr en dev

1. Clonar el repositorio.
2. Crea una copia del ```.env.template```, renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```yarn```
4. Levantar la base de datos ```docker compose up -d``` 
5. Correr las migraciones de Prisma ```yarn prisma migrate dev```
6. Ejecutar seed ```yarn seed```
7. Correr el proyecto ```yarn dev```