# OpenJira App

Para ejecutar la aplicación localmente, seguir los siguientes pasos:

1. **Configurar la base de datos:**

    ```bash
    $ docker-compose up -d
    ```

    > Nota: `-d` es un parámetro opcional que indica que el contenedor se ejecutará en segundo plano.

2. **Variablers de entorno**

    Copiar el archivo `.env.template` a `.env` y cambiar los valores de las variables de entorno.

    - MongoDB URL (Base de datos local):

        `MONGO_URL=mongodb://localhost:27018/entriesdb`

3. **Instalación de dependencias**

    `yarn install`

4. **Ejecutar la aplicación**

    `yarn dev`

    > Nota: `yarn dev` ejecuta la aplicación en modo desarrollo.

5. **Información (datos) de pruebas**

    Ejecutar el siguiente endpoint : `http://localhost:3000/api/seed`

    > Nota: Este endpoint se debe ejecutar sólo en el entorno de desarrollo, ya que elimina la colección `entries`.
