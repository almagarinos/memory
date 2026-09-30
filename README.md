# Memory

Juego familiar, que desafía la memoria, donde encontrar pares de cartas coincidentes. Es el clásico "memorama", con tres niveles de dificultad y un sistema de puntuación basado en la precisión.

El objetivo del proyecto es construir una base sólida, mantenible y fácilmente desplegable en Github Pages, priorizando una arquitectura clara y escalable frente a la complejidad funcional.


## 📈 Versión 1.0.0
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000) ![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)

Esta es una versión estable del proyecto, desarrollada únicamente con tecnologías Front-End nativas: JavaScript, HTML y CSS.

La aplicación está hecha sin frameworks ni dependencias externas y no necesita procesos de compilación ni conexión a Internet.

Actualmente el contenido de las cartas sólo muestra letras mayúsculas del alfabeto inglés (sin la letra eñe).

### Reglas de puntuación 📋

De momento, la puntuación sólo se basa en la relación de aciertos frente a intentos.

- Los errores no restan puntos.
- Las rachas no tienen bonus.
- El tiempo total no influye.

### Funcionalidades pendientes 🧾

Algunas mejoras futuras, para implementar en versiones posteriores, podrían ser:

- Imágenes en las cartas.
- Animaciones avanzadas.
- Sonidos en las transiciones.
- Confetti al completar la partida.
- Persistencia de puntuaciones en `localStorage`.
- Ranking histórico de jugadores por dificultad.
- Torneos entre varios jugadores.
- Estadísticas detalladas.
- Medición del tiempo.
- Modo contrarreloj.


## 🎮 Jugar *online*
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?logo=github&logoColor=white)

Gracias al despliegue en GitHub Pages, se puede jugar aquí:

👉 https://almagarinos.github.io/memory/ 👈


## 💻 Instalación local

![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)

Una vez que descargado este proyecto en un dispositivo local, ya no es necesario tener una conexión a Internet. La base de datos de las ciudades va incluida, no se requiere de consultas a un servidor remoto.

### Clonar repositorio ⬇️

Si se tiene instalado [Git](https://git-scm.com/), sólo hay que usar los siguientes comandos en un terminal, dentro de la ruta del directorio donde se quiera descargar el juego:
```bash
git clone https://github.com/almagarinos/memory   # Descarga el proyecto
memory\index.html                 # Ejecuta el juego en un navegador web
```

### Descargar fichero 🗂️
Se puede obtener todo el proyecto comprimido en [este ZIP](https://github.com/almagarinos/memory/archive/refs/heads/main.zip). Descomprímase su contenido dentro del directorio donde se quiera ubicar el juego, para luego abrir el archivo **index.html** en un navegador web.


## 📂 Estructura del proyecto

```bash
memory/
│
├── assets/
│   │
│   ├── css/                # Estilos propios de la aplicación
│   │   └── styles.css
│   │
│   ├── icon/               # Archivos de favicon, generados en https://favicon.io/
│   │   └── ...
│   │
│   └── js/                 # Archivos de lógica, separando las responsabilidades
│       ├── app.js
│       ├── cards.js
│       ├── scoreboard.js
│       ├── state.js
│       └── ui.js
│
└── index.html              # Punto de entrada de la aplicación
```


## 🕹️ Dinámica del juego

El flujo de la aplicación se repite cíclicamente y consiste en el siguiente:

```bash
    ┌───────────────┐
    │ Elegir nivel  │
┌───┤ de dificultad ├─── ◄────────┐
▲   └───────┬───────┘        ┌────┴─────┐
│           ▼                | Cancelar │
│   ┌───────────────┐        └────┬─────┘
│   │ Jugar partida ├────────► ───┘
▲   │ en ese nivel  ├─── ◄────────┐
│   └───────┬───────┘        ┌────┴─────┐
│           ▼                | Repetir  │
│   ┌───────────────┐        └────┬─────┘
▲   │ Nivel ganado  ├────────► ───┘
│   └───────┬───────┘
│           ▼
│   ┌───────────────┐
└───┤ Volver a menú |
    └───────────────┘
```

### Niveles de dificultad 📊

En cualquier momento se puede cancelar la partida actual y elegir nuevamente el nivel.

| Dificultad | Pares |
|------------|-------|
| Fácil      |     4 |
| Media      |    12 |
| Difícil    |    24 |

### Sistema de puntuación 🏅

La puntuación se calcula únicamente según el porcentaje de pares de cartas coincidentes frente a pares de cartas volteadas.

```text
Puntuación = (aciertos / intentos) * 100 %
```

Por ejemplo, escogiendo el nivel fácil, se pueden obtener distintas puntuaciones, más elevadas cuanto menor sea el número de intentos:

- 4 aciertos / 10 intentos = 40 %
- 4 aciertos / 8 intentos = 50 %
- 4 aciertos / 5 intentos = 80 %