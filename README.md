# Encryptor — Encriptador de Texto

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)

Aplicación web que encripta y desencripta mensajes con un cifrado de sustitución de vocales. Sin dependencias ni compilación: HTML, CSS y JavaScript puro.

> Challenge **Encriptador de Texto** del programa Oracle Next Education (Alura Latam), Front-end.

![Encryptor](docs/img/demo.png)

<!-- TODO: enlace a la demo (GitHub Pages: Settings → Pages) -->

## Cómo funciona

Cada vocal se reemplaza por una secuencia fija; las demás letras no cambian:

| Letra | Se encripta como |
|---|---|
| `e` | `enter` |
| `i` | `imes` |
| `a` | `ai` |
| `o` | `ober` |
| `u` | `ufat` |

Ejemplo: `hola` → `hoberlai`.

## Características

- **Encriptar y desencriptar** el texto de la caja de entrada con las reglas de la tabla: para desencriptar basta pegar el mensaje encriptado y pulsar el botón.
- **Validación de la entrada:** avisa si el texto está vacío o si tiene mayúsculas, acentos o ñ. Números, signos de puntuación y saltos de línea se aceptan y se dejan igual.
- **Desencriptado en una sola pasada**, de modo que `encriptar` y `desencriptar` son inversos para cualquier texto en minúsculas (comprobado con más de 500.000 cadenas).
- **Botón "Copiar"** que usa la API del portapapeles y muestra una confirmación animada (o un aviso si el navegador no lo permite).
- **Historial** de las últimas 20 operaciones, la más reciente arriba y sin repetidos seguidos; al activar una entrada (clic o Enter) se vuelven a cargar sus textos.
- **Diseño oscuro** adaptable a pantallas pequeñas, con foco visible para teclado y etiquetas accesibles.

## Cómo correrlo

No requiere instalación. Abre `index.html` en el navegador o sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

Luego visita http://localhost:8000.

## Estructura

```
index.html   -> estructura de la página
style.css    -> estilos
script.js    -> reglas de encriptación, validación, copiado e historial
```

## Autor

**Brayant Vásquez Gómez** · [GitHub](https://github.com/iBrayant) · [LinkedIn](https://linkedin.com/in/brayant-vásquez-gómez)

Licencia [MIT](LICENSE).
