# Instrucciones de Uso - OEUK Medical Screening

## Instalación Completada ✓

Las dependencias ya están instaladas en ambos proyectos (backend y frontend).

## Cómo Ejecutar la Aplicación

### 1. Iniciar el Backend (Terminal 1)

```bash
cd backend
npm run dev
```

El servidor backend se iniciará en: `http://localhost:3000`

### 2. Iniciar el Frontend (Terminal 2)

Abre una nueva terminal y ejecuta:

```bash
cd frontend
npm run dev
```

El frontend se iniciará en: `http://localhost:5173`

### 3. Acceder a la Aplicación

Abre tu navegador en: `http://localhost:5173`

## Funcionalidades

### Formulario de Paciente (Página Principal)
- Ruta: `http://localhost:5173/`
- Los pacientes pueden llenar el cuestionario médico con las 12 preguntas
- Al enviar, los datos se guardan en la base de datos SQLite

### Panel Médico
- Ruta: `http://localhost:5173/doctor`
- **Password por defecto:** `oeuk2024`
- Los médicos pueden:
  - Ver lista de todos los formularios enviados
  - Filtrar entre revisados y pendientes
  - Ver detalles completos de cada formulario
  - Agregar comentarios médicos
  - Marcar formularios como revisados

## Estructura de la Base de Datos

La base de datos SQLite (`backend/oeuk.db`) se crea automáticamente al iniciar el backend por primera vez.

Contiene todos los campos del formulario:
- Información personal del paciente
- 12 preguntas del cuestionario con respuestas YES/NO y comentarios
- Comentarios del médico
- Estado de revisión
- Fechas de creación y revisión

## Cambiar el Password del Panel Médico

Edita el archivo `backend/server.js` en la línea que dice:

```javascript
if (password === 'oeuk2024') {
```

Cambia `'oeuk2024'` por tu password deseado.

## Notas Importantes

- Asegúrate de que ambos servidores (backend y frontend) estén corriendo simultáneamente
- El backend debe estar en el puerto 3000
- El frontend debe estar en el puerto 5173
- Los datos se almacenan en `backend/oeuk.db` (archivo SQLite)
