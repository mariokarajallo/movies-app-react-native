# Movies App - React Native

Una aplicación móvil moderna de películas desarrollada con React Native, Expo y TypeScript que ofrece una experiencia similar a Netflix con funcionalidades avanzadas de búsqueda y navegación.

![preview](movie-app-demo.gif)

## 📱 Características Principales

- **Interfaz inspirada en Netflix** con diseño moderno y responsive
- **Búsqueda avanzada** con filtros por año
- **Navegación fluida** entre pantallas con Expo Router
- **Gestión de estado** optimizada con TanStack Query
- **Animaciones suaves** con React Native Reanimated
- **Tipado completo** con TypeScript
- **Estilos modernos** con NativeWind (Tailwind CSS)

## 🛠️ Tecnologías Utilizadas

### Core Technologies

- **React Native 0.79.5** - Framework principal
- **Expo SDK 53** - Plataforma de desarrollo
- **TypeScript 5.8.3** - Tipado estático
- **Expo Router 5.1.4** - Navegación basada en archivos

### State Management & Data Fetching

- **TanStack Query 5.85.5** - Gestión de estado del servidor y caché
- **Axios 1.11.0** - Cliente HTTP para APIs

### UI & Styling

- **NativeWind** - Tailwind CSS para React Native
- **React Native Reanimated 3.17.4** - Animaciones nativas
- **Expo Linear Gradient 14.1.5** - Gradientes
- **React Native Safe Area Context 5.4.0** - Manejo de áreas seguras

### UI Components

- **React Native Reanimated Carousel 4.0.3** - Carruseles animados
- **React Native WebView 13.15.0** - Reproductor de videos
- **@expo/vector-icons** - Iconografía

### Development Tools

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Babel** - Transpilación

## 🏗️ Arquitectura del Proyecto

```
movies-app/
├── app/                    # Expo Router - Navegación
│   ├── _layout.tsx        # Layout principal con TanStack Query
│   ├── home/              # Pantalla principal
│   ├── movie/[id].tsx     # Detalle de película
│   └── search/            # Búsqueda avanzada
├── core/                  # Lógica de negocio
│   ├── actions/           # Acciones de API
│   └── api/               # Configuración de APIs
├── infrastructure/        # Capa de datos
│   ├── interfaces/        # Tipos TypeScript
│   └── mappers/           # Transformación de datos
├── presentation/          # Capa de presentación
│   ├── components/        # Componentes reutilizables
│   └── hooks/             # Custom hooks
└── config/                # Configuraciones
```

## 🎯 Funcionalidades Implementadas

### 1. **TanStack Query Integration**

- Caché inteligente con `staleTime` de 24 horas
- `useInfiniteQuery` para paginación infinita
- Gestión automática de estados de carga y error
- Revalidación automática de datos

### 2. **Axios Configuration**

- Instancias separadas para diferentes endpoints
- Configuración centralizada de headers y parámetros
- Manejo de errores global

### 3. **FlatList Optimization**

- Renderizado eficiente de listas grandes
- Paginación infinita en búsquedas
- Optimización de memoria

### 4. **Component Reusability**

- Componentes parametrizados con props tipadas
- `MoviePoster` con múltiples variantes
- `MovieHorizontalList` reutilizable
- Sistema de diseño consistente

### 5. **SafeArea Manual**

- Implementación manual con `useSafeAreaInsets`
- Control granular de espaciado
- Compatibilidad cross-platform

### 6. **Content Considerations**

- Estados de carga, error y vacío
- Mensajes informativos para el usuario
- Fallbacks para datos faltantes

### 7. **Nested Scrollable Elements**

- ScrollView anidados optimizados
- Gestión de conflictos de scroll
- Experiencia de usuario fluida

### 8. **Mapping & Typing**

- Interfaces TypeScript completas
- Mappers para transformación de datos
- Tipado estricto en toda la aplicación

### 9. **Caching Strategy**

- Caché persistente con TanStack Query
- Invalidación inteligente de datos
- Optimización de rendimiento

### 10. **Actor Management**

- Componente `MovieCast` para elenco
- Información detallada de actores
- Navegación a perfiles

### 11. **Movie Details**

- Pantalla completa de detalles
- Información técnica completa
- Videos y trailers integrados

### 12. **Stack Navigation**

- Navegación basada en archivos con Expo Router
- Transiciones suaves
- Gestión de parámetros dinámicos

### 13. **Custom Hooks**

- `useMovies` - Gestión de películas
- `useMovie` - Detalles de película
- `useMovieSearch` - Búsqueda avanzada

### 14. **Gradients & Visual Effects**

- Gradientes lineales con Expo Linear Gradient
- Efectos visuales modernos
- Overlays y transparencias

### 15. **New Interfaces & Actions**

- Interfaces TypeScript para todas las entidades
- Acciones centralizadas para APIs
- Separación clara de responsabilidades

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- Expo CLI
- iOS Simulator o Android Emulator

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd movies-app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz:

```env
EXPO_PUBLIC_MOVIE_DB_URL=https://api.themoviedb.org/3
EXPO_PUBLIC_MOVIE_DB_KEY=tu_api_key_aqui
```

4. **Ejecutar la aplicación**

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 Scripts Disponibles

```json
{
  "android": "expo start --android",
  "ios": "expo start --ios",
  "start": "expo start",
  "web": "expo start --web",
  "lint": "eslint \"**/*.{js,jsx,ts,tsx}\" && prettier -c \"**/*.{js,jsx,ts,tsx,json}\"",
  "format": "eslint \"**/*.{js,jsx,ts,tsx}\" --fix && prettier \"**/*.{js,jsx,ts,tsx,json}\" --write"
}
```

## 🎨 Sistema de Diseño

### Colores

- **Netflix Red**: `#E50914`
- **Netflix Black**: `#141414`
- **IMDB Yellow**: `#F5C518`
- **Gradientes personalizados**

### Tipografía

- Fuente principal: Helvetica Neue
- Jerarquía clara de tamaños
- Pesos optimizados para móvil

## 🔧 Configuración de Build

### EAS Build

```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  },
  "preview": {
    "distribution": "internal"
  },
  "production": {
    "autoIncrement": true
  }
}
```

## APIs Integradas

- **The Movie Database (TMDB)**
  - Películas populares
  - Películas en cartelera
  - Películas mejor valoradas
  - Próximos estrenos
  - Búsqueda avanzada
  - Detalles de películas
  - Información del elenco
  - Videos y trailers

## 🎯 Características Técnicas Destacadas

### Performance

- Lazy loading de imágenes
- Paginación infinita optimizada
- Caché inteligente de datos
- Animaciones nativas de 60fps

### UX/UI

- Diseño responsive
- Estados de carga elegantes
- Feedback visual inmediato
- Navegación intuitiva

### Code Quality

- TypeScript estricto
- ESLint + Prettier
- Arquitectura limpia
- Componentes reutilizables

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ‍ Autor

**Mario Karajallo** - [Mario Karajallo](https://karajallo.com)

---

⭐ Si este proyecto te gustó, ¡dale una estrella al repositorio!

⌨️ con ❤️ por [Mario Karajallo](https://karajallo.com) 😊
