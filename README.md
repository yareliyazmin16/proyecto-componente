

```markdown
Actividad: Librería de Componentes Visuales - Cronómetro con Ventana de Aviso
**Instituto Tecnológico de Oaxaca
** Ingeniería en Sistemas Computacionales 
**Nombre de la Alumna:** Yareli Yazmin Pacheco Aragón
**Semestre:** Sexto Semestre
** Grupo: 7SC 
**Materia:** Programación Web




### **Nombre:** Cronómetro de Sesión Activa con Ventana de Aviso (Modal)
Este proyecto es un componente visual interactivo y reutilizable diseñado para controlar y mostrar en pantalla cuánto tiempo lleva un usuario dentro de cualquier página web.

A diferencia de las funciones que solo calculan datos por detrás, este componente se puede ver y usar directamente en la interfaz. El problema principal que resuelve es el aviso de inactividad o límites de tiempo. Al pasar ciertos minutos, el componente cambia de color y bloquea la pantalla con una ventana gris que le avisa al usuario que ya pasó su tiempo límite. 

Esto sirve para muchas cosas en la vida real, por ejemplo:
* **Páginas de bancos:** Para avisar que se va a cerrar tu cuenta si la dejas abierta.
* **Tiendas en línea:** Para decirte que tus productos guardados en el carrito van a expirar.
* **Plataformas de exámenes o tareas:** Para que el alumno vea cuántos minutos le quedan y no se le cierre la página por sorpresa.


## 2. Cómo están organizados los  archivos (Estructura)



```text
proyecto-componente/
├── css/
│   ├── componente.css   # Solo los estilos del cronómetro y de la ventana de aviso 
│   └── pagina.css       # Los estilos normales de fondo y cajas del ejemplo
├── js/
│   └── componente.js    # La lógica de los segundos, minutos y botones en JavaScript
└── index.html           # La página principal donde pruebo el componente

```



## 3. Instalación (Cómo implementarlo a un proyecto HTML)

Para que otra persona pueda usar el componente en su página, solo debe copiar las carpetas y agregar estas dos conexiones en su archivo HTML:

1. Agregar los estilos del cronómetro en el `<head>`:

```html
<link rel="stylesheet" href="css/componente.css">

```

2. Agregar el script de JavaScript al final de su `<body>`:

```html
<script src="js/componente.js"></script>

```

---

## 4. Uso y Ejemplos de Código Real

El componente es totalmente reutilizable porque no tiene datos fijos. Cuando lo mandas a llamar en el script de una página, el programador elige en los parametros en qué esquina de la pantalla ponerlo y a los cuántos minutos quieres que salga el aviso de tiempo:

```javascript
// Estructura: iniciarCronometro('esquina', minutos);
iniciarCronometro('bottom-right', 5);

```

### Ejemplo 1: Ponerlo en una Tienda Online (Arriba a la derecha a los 15 minutos)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tienda de Ropa - Mi Carrito</title>
    <link rel="stylesheet" href="css/pagina.css">
    <link rel="stylesheet" href="css/componente.css">
</head>
<body>

    <div class="container">
        <h1>Tu Carrito de Compras</h1>
        <p>Paga tus productos antes de que se agote tu tiempo reservado.</p>
    </div>

    <script src="js/componente.js"></script>
    <script>
        // Lo ponemos arriba a la derecha y que avise a los 15 minutos
        iniciarCronometro('top-right', 15);
    </script>
</body>
</html>

```

### Ejemplo 2: Ponerlo en una Banca (Abajo a la izquierda a los 3 minutos)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Banco Seguro</title>
    <link rel="stylesheet" href="css/pagina.css">
    <link rel="stylesheet" href="css/componente.css">
</head>
<body>

    <div class="container">
        <h1>Banca en Línea</h1>
        <p>Por tu seguridad estamos midiendo tu tiempo en la página.</p>
    </div>

    <script src="js/componente.js"></script>
    <script>
        // Lo ponemos abajo a la izquierda y que avise rápido a los 3 minutos
        iniciarCronometro('bottom-left', 3);
    </script>
</body>
</html>

```

---

## 5. Capturas de Pantalla de mi Proyecto

* **Cronómetro corriendo normal:**
`![Cronómetro Activo](foto_activo.png)`
*Aquí se ve cómo el reloj empieza en 00:00 y va cambiando los números segundo a segundo en color verde en la esquina.*
* **Cronómetro cuando lo pauso:**
`![Cronómetro Pausado](foto_pausa.png)`
*Al darle clic al botón, el tiempo se detiene, el texto cambia a "Reanudar" y todo se pone en amarillo.*
* **Cuando se cumple el tiempo y sale el aviso:**
`![Ventana de Aviso](foto_alerta.png)`
*Al llegar al minuto que configuré, el reloj se pone en rojo y salta la ventana modal gris en medio de la pantalla.*

---

## 6. Link del video 



