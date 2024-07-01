# CODER HOUSE

# Proyecto de Ecomerce con Node.js

Este proyecto de E-commerce desarrollado en Node.js incluye un sistema de autenticación que permite a los usuarios iniciar sesión utilizando credenciales locales o mediante GitHub. Los usuarios registrados pueden agregar productos a un carrito de compras y proceder con la compra, generando automáticamente un ticket que se envía por correo electrónico a través de Gmail. Además, para la gestión de productos, se requiere acceso de administrador para editar y añadir nuevos productos.

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
- **socket-io** (v4.7.5): chat online con los usuarios
- **nodemailer** (v6.9.14): para manejar el envio de ticket mediante Gmail




## Ejecución

1. Clona este repositorio en tu máquina local.
2. Abre la terminal y navega hasta la carpeta `src`.
3. Ejecuta el siguiente comando para instalar las dependencias:  `npm run dev`
4. inicia la aplicaion con: `npm run dev`
5. Accede a la aplicación web en http://localhost:3000.


## USUARIOS

## login ![image](https://github.com/Joaquin-Lopezz/AppEcomerce/assets/87286770/ed833248-8f90-4d94-bace-3b11fbcaab95)

## productos  ![image](https://github.com/Joaquin-Lopezz/AppEcomerce/assets/87286770/5dd62fcb-d665-44ce-bbfc-4009d1bc0747)

## perfil ![image](https://github.com/Joaquin-Lopezz/coderHouse/assets/87286770/3eb8e8fe-5a46-4252-92d5-760b05fb74cc)

## ADMIN

## agregar producto ![image](https://github.com/Joaquin-Lopezz/coderHouse/assets/87286770/051ebaa3-ffe9-40b7-b417-8e32d7d07252)

## edit producto ![image](https://github.com/Joaquin-Lopezz/coderHouse/assets/87286770/b6120e05-d5b9-4e63-a889-d91d9444a5a5)
