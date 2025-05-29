# Aplicación Web Registro de Usuario

## Descripción

Esta aplicación web permite registrar nuevos usuarios en una base de datos, los cuales luego son mostrados en la página principal.
Esta aplicación ha sido desarrollada como una "prueba de admisión" para formar parte del bootcamp de TrainIT.

## Tecnologías utilizadas

- Frontend: React js, Vite, Tailwind CSS
- Backend: Python, Flask, SQLAlchemy

## Cómo correr esta aplicación?

1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Ejecutar el frontend con `npm run dev`
4. Ejecutar el backend con `python app.py`

## Proceso de desarrollo

Inicialmente se planeó una estructura simple con separación clara entre frontend y backend.
En relación con la estructura del proyecto se decidió, por ser una aplicación pequeña y sencilla, no utilizar un Context (se hubiera utilizado Flux para eso), sino que sólo se usó el localStorage para almacenar los datos del usuario.
Se aplica el CRUD de la siguiente forma:

1. Create: a través del endpoint /register se crea nuevos usuarios
2. Read: a través del endpoint /users se muestran todos los usuarios, en este caso con nombre, apellido, correo y número telefónico.
3. Update: a través del endpoint /updateUser se pueden modificar los datos del usuario logueado, con excepción de su correo (con el cual hace login) y su RUT que sería su número de identificación personal.
4. Delete: a través del endpoint /deleteUser es posible eliminar un usuario de la base de datos. Esto no es recomendable para llevar a producción ya que, borraría datos de la base de datos, lo cual haría que esta no cumpliera con los principios ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad). Lo que se recomienda para ejecutar en la práctica es usar el endpoint /deactivateUser el cual le dará al usuario el carácter de "inactivo", con lo cual ya no será mostrado en la página principal.
