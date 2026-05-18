![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![ReactNative](https://img.shields.io/badge/-React_Native-05122A?style=for-the-badge&logo=react)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

# 📝 TaskFlow
> Notes powered by AI

Aplicación de notas con inteligencia artificial integrada. Crea, edita y mejora tus notas con acciones de IA: mejora el texto, resúmelo o expándelo con un solo toque. Disponible como app web y app móvil nativa.

---

## Características

- Crear, editar y eliminar notas
- Tres acciones de IA por nota: **Mejorar**, **Resumir** y **Expandir**
- App móvil nativa con Expo para iOS y Android
- API REST con persistencia en backend propio
- Arquitectura limpia con separación de contexto, API y componentes

---

## Tecnologías

| Frontend Web | Uso |
|--------------|-----|
| React | Interfaz de usuario |
| TypeScript | Tipado estático |
| Carbon Design System | Componentes UI |
| React Router | Navegación |

| Frontend Móvil | Uso |
|----------------|-----|
| React Native | App nativa iOS / Android |
| Expo + Expo Router | Bundler y navegación basada en archivos |
| TypeScript | Tipado estático |

| Backend | Uso |
|---------|-----|
| Node.js + Express | Servidor REST |
| Groq API | Procesamiento de IA (LLM) |
| Render | Despliegue del servidor |

---

## Estructura del proyecto

```
taskflow-project/
├── ReactNative/                  # App móvil
│   ├── app/
│   │   ├── _layout.tsx           # Layout raíz con providers
│   │   └── (notes)/
│   │       ├── _layout.tsx       # Stack navigator
│   │       ├── index.tsx         # Lista de notas
│   │       ├── new.tsx           # Crear nota
│   │       └── [id].tsx          # Editar nota
│   ├── components/
│   │   ├── NoteCard.tsx
│   │   ├── NoteForm.tsx
│   │   └── AIActionButtons.tsx
│   ├── context/
│   │   └── NotesContext.tsx      # Estado global de notas
│   ├── api/
│   │   └── client.ts             # Capa de comunicación con la API
│   └── types/
│       └── note.ts
├── server/                       # Backend
│   └── src/
│       ├── index.ts              # Punto de entrada
│       ├── routes/
│       │   ├── notesRoutes.ts
│       │   └── aiRoutes.ts
│       ├── controllers/
│       └── services/
└── README.md
```

---

## Ejecutar en local

### Backend

```bash
cd server
npm install
# Crea un archivo .env con las siguientes variables:
# PORT=3000
# GROQ_API_KEY=tu_clave_de_groq
npm run dev
```

### App móvil

```bash
cd ReactNative
npm install
# Crea un archivo .env con:
# EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
npx expo start
```

Escanea el QR con la app **Expo Go** desde tu móvil.

---

*Desarrollado en prácticas CEAC por César Ramos — 2026*
