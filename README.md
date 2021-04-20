# catalogFront

Aplicación web para gestionar la venta y administración de productos en inventarios 

## Tabla de contenido

1. [Configuración inicial](#configuracion-inicial)
   1. [Motivación](#motivacion)
      1. [Levantando el proyecto](#levantando-el-proyecto)
      2. [Composición del proyecto](#composicion-del-proyecto)
   2. [Docker y docker compose](#docker-y-docker-compose)
      1. [Instalacion de docker](#instalacion-de-docker)
         1. [Ubuntu 16](#ubuntu-16)
         2. [Ubuntu 18](#ubuntu-18)
         3. [Instalación de docker compose](#instalacion-de-docker-compose)
2. [Trabajar en modo desarrollo](#trabajar-en-modo-desarrollo)

## Configuración inicial

### Motivación

Este proyecto se desarrolló a medida de cumplir con un challenge el cual consiste en desarrollar una mejor herramienta para el departamento de Tienda ya que se requiere de una aplicación que le permita mantener actualizado su catálogo de productos.

#### Levantando el proyecto

para correr el proyecto en desarollo basta con hacer clone del proyecto, npm install y levantarlo con npm start

```bash
git clone https://github.com/josefm09/catalogFront.git
cd catalogFront
npm install
npm start
```

NOTA - tambien es necesario agregar un archivo .env que contenga lo siguiente

```javaScript
PORT=("Numero del puerto para levantar aplicación")
```

#### Composición del proyecto

la estructura principal de la carpeta del proyecto el la siguiente

```bash
-public
-src (condigo fuente)
--component (carpeta con los componente o pantallas del sistema)
--services (carpeta con las rutas para consumir servicios)
--App.js (archivo donde hacemos el ruteo)
--http-common.js (configuracion de la coneccion axios)
--index.js (archivo principal del proyecto)
--serviceWorker.js (service worker)
```

## Docker y docker compose

Este es un paso recomendado pero alternativo, ya que el proyecto también se puede ejecutar sin la ventana acoplable

#### Instalación de docker

Para más información revisa la [guia de instalación](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

##### Ubuntu 16

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get update

apt-cache policy docker-ce

sudo apt-get install -y docker-ce
```

##### Ubuntu 18

```bash
sudo apt-get install -y docker.io

# Para verificar que docker está correctamente instalado
sudo systemctl status docker

# Intalación de docker compose 
# la versión se debe tomar de [aquí](https://github.com/docker/compose/releases)
sudo curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# la versión se debe tomar de [aquí](https://github.com/docker/compose/releases)
sudo docker-compose --version
```

#### Instalación de docker compose

Documentación de instalación oficial [aquí](https://docs.docker.com/compose/install/)

```bash
# Descargar los archivos en bin
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Proveer los accesos correspondientes
sudo chmod +x /usr/local/bin/docker-compose

# Revisar la instalación
docker-compose --version
```

## Trabajar en modo desarrollo

Este comando construirá una nueva imagen donde el código se agregará en un volumen para permitir su fácil edición.

```bash
docker-compose up --build -d
```

Cada vez que se ejecute este comando, se creará una nueva imagen desde cero, para reutilizar las imágenes construidas previamente ejecute sin el --buid flag

### Detener los contenedores que están corriendo

```bash
docker-compose down -v
```