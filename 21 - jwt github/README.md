# Proyecto de Ecomerce con Node.js

Este proyecto implementa un sistema de login y un Ecomerce donde puedes agregar de manera local los productos a un carrito de compra . utilizando Node.js y varias dependencias populares de npm. Los usuarios pueden autenticarse utilizando sus credenciales locales 

## Dependencias

- **bcrypt** (v5.1.1): Librería para el hash de contraseñas.
- **connect-mongo** (v5.1.0): Middleware para conectar Express.js a MongoDB para almacenar sesiones.
- **express** (v4.18.2): Framework web para Node.js.
- **express-handlebars** (v7.1.2): Motor de plantillas para Express.js.
- **mongoose** (v8.0.3): ODM (Object-Document Mapper) para MongoDB.
- **passport** (v0.7.0): Middleware de autenticación para Node.js.
- **passport-github2** (v0.1.12): Estrategia Passport para autenticación OAuth con GitHub.
- **passport-local** (v1.0.0): Estrategia Passport para autenticación local basada en usuario y contraseña.
- **session** (v0.1.0): Middleware de sesión para Express.js.


## Ejecución

Desde la terminal entra en la carpeta 📂  "src" y ejecuta el comando "npm run dev".  
Prodras acceder a la aplicacion web que se encuentra en la http://localhost:8080 por defecto




# Proyecto de E-commerce con Node.js

Este proyecto implementa un sistema de **login** y un **E-commerce** donde los usuarios pueden agregar productos a un carrito de compras de manera local. Utiliza Node.js y varias dependencias populares de npm. Los usuarios pueden autenticarse utilizando sus credenciales locales.

## Dependencias

- **bcrypt** (v5.1.1): Librería para el hash de contraseñas.
- **connect-mongo** (v5.1.0): Middleware para conectar Express.js a MongoDB y almacenar sesiones.
- **express** (v4.18.2): Framework web para Node.js.
- **express-handlebars** (v7.1.2): Motor de plantillas para Express.js.
- **mongoose** (v8.0.3): ODM (Object-Document Mapper) para MongoDB.
- **passport** (v0.7.0): Middleware de autenticación para Node.js.
- **passport-github2** (v0.1.12): Estrategia Passport para autenticación OAuth con GitHub.
- **passport-local** (v1.0.0): Estrategia Passport para autenticación local basada en usuario y contraseña.
- **session** (v0.1.0): Middleware de sesión para Express.js.

## Ejecución

1. Clona este repositorio en tu máquina local.
2. Abre la terminal y navega hasta la carpeta `src`.
3. Ejecuta el siguiente comando para instalar las dependencias:  `npm run dev`
4. inicia la aplicaion con: `npm run dev`
5. Accede a la aplicación web en http://localhost:8080.

## Agregar un Producto (Thunder client)
1. se debera hacer localmente accediendo haciendo un POST a la  url localhost:8080/api/productos
2. agregando un producto por el body (revisar Schema de producto)

## login ![image](https://github.com/Joaquin-Lopezz/AppEcomerce/assets/87286770/ed833248-8f90-4d94-bace-3b11fbcaab95)

## productos  ![image](https://github.com/Joaquin-Lopezz/AppEcomerce/assets/87286770/5dd62fcb-d665-44ce-bbfc-4009d1bc0747)

## perfil ![image](https://github.com/Joaquin-Lopezz/AppEcomerce/assets/87286770/fedcadea-ebcf-4ec8-8e09-a97ed739bbb1)

