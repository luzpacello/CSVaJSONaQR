## <h2 align="left">CSV to QR Code Converter <img src="https://media.giphy.com/media/ObNTw8Uzwy6KQ/giphy.gif" height="30" />

Una aplicación web moderna y eficiente construida con **React, Vite y TypeScript** que permite cargar un listado de alumnos en formato CSV, parsearlo automáticamente a JSON en el cliente y generar un código QR contenedor de los datos listo para su escaneo o descarga.

## 📋 Características

- **Carga de Archivos Local:** Procesamiento instantáneo de archivos `.csv` directamente en el navegador (sin envío de archivos a servidores externos).
- **Conversión Eficiente:** Uso de `PapaParse` para transformar las filas del CSV en un array de objetos JSON tipados.
- **Generación de QR Dinámica:** Creación de códigos QR en formato base64 utilizando `qrcode`, optimizado para listados de hasta 40 alumnos (~2KB de datos).
- **Descarga Directa:** Opción para descargar el código QR generado en formato `.png`.
- **Tipado Estricto:** Implementación 100% en TypeScript con configuraciones modernas (`verbatimModuleSyntax`).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Librería de Parseo:** [PapaParse](https://mholt.github.io/PapaParse/)
- **Librería de QR:** [node-qrcode](https://github.com/soldair/node-qrcode)
- **Estilos:** CSS3 nativo (Mobile First & Responsive)

---

## 📂 Formato Requerido del CSV

Para que el sistema procese correctamente el listado de alumnos, el archivo `.csv` debe contar con la siguiente estructura exacta de encabezados (en minúsculas):

```csv
nombre,apellido,documento
Luz,Gómez,45123456
Juan,Pérez,44444444
