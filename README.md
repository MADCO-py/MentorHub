# MentorHub

Plataforma de tutorías peer-to-peer para estudiantes de Guatemala.  
Stack: React + TypeScript + Vite + Tailwind CSS + Framer Motion

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Build para producción
npm run build
```

---

## Agregar un nuevo mentor

1. Abre `src/data/tutors.ts`
2. Copia uno de los objetos existentes en el array `TUTORS`
3. Cambia todos los datos (nombre, slug, materias, horario, WhatsApp, etc.)
4. Agrega la foto en `src/assets/FotoTutores/` con el nombre que pusiste en `photo`
5. Guarda — aparecerá automáticamente en la lista

> El `slug` debe ser único y solo contener letras, números y guiones.  
> Ejemplo: `"carlos-rodriguez"`

---

## Despliegue en GitHub Pages

```bash
# 1. Instala gh-pages si no lo tienes
npm install --save-dev gh-pages

# 2. Asegúrate de que vite.config.ts tenga:
#    base: "/nombre-de-tu-repo/"

# 3. Despliega
npm run deploy
```

---

## Estructura del proyecto

```
src/
  assets/FotoTutores/   ← fotos de los mentores
  components/
    ui/                 ← Button, Card, Badge (estilo shadcn)
    Navbar.tsx
    Footer.tsx
    TutorCard.tsx
    Filters.tsx
    AvailabilityCalendar.tsx
  data/
    tutors.ts           ← AQUÍ se editan los mentores
    subjects.ts         ← materias disponibles para filtrar
  pages/
    Home.tsx
    TutorProfile.tsx
    BecomeMentor.tsx
  types/
    index.ts
  lib/
    utils.ts
```
