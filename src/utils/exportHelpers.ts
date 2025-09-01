import type { AdminState } from '../context/AdminContext';

// Función para escapar caracteres especiales en strings para template literals
function escapeTemplateString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// Función para generar el contenido completo de App.tsx
export function generateAppFile(): string {
  return `import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { TVShows } from './pages/TVShows';
import { Anime } from './pages/Anime';
import { SearchPage } from './pages/Search';
import { MovieDetail } from './pages/MovieDetail';
import { TVDetail } from './pages/TVDetail';
import { Cart } from './pages/Cart';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  // Detectar refresh y redirigir a la página principal
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pageRefreshed', 'true');
    };

    const handleLoad = () => {
      if (sessionStorage.getItem('pageRefreshed') === 'true') {
        sessionStorage.removeItem('pageRefreshed');
        if (window.location.pathname !== '/') {
          window.location.href = 'https://tvalacarta.vercel.app/';
          return;
        }
      }
    };

    if (sessionStorage.getItem('pageRefreshed') === 'true') {
      sessionStorage.removeItem('pageRefreshed');
      if (window.location.pathname !== '/') {
        window.location.href = 'https://tvalacarta.vercel.app/';
        return;
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Deshabilitar zoom con teclado y gestos
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
        return false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/*" element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/tv" element={<TVShows />} />
                      <Route path="/anime" element={<Anime />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/movie/:id" element={<MovieDetail />} />
                      <Route path="/tv/:id" element={<TVDetail />} />
                      <Route path="/cart" element={<Cart />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;`;
}

// Función para generar el contenido completo de main.tsx
export function generateMainFile(): string {
  return `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;
}

// Función para generar el contenido completo de index.css
export function generateIndexCssFile(): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Configuraciones adicionales para deshabilitar zoom */
@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    touch-action: manipulation;
  }
  
  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    overflow-x: hidden;
  }
  
  /* Permitir selección solo en elementos de entrada */
  input, textarea, [contenteditable="true"] {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }
  
  /* Prevenir zoom accidental en dispositivos móviles */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  input[type="number"],
  input[type="search"],
  textarea,
  select {
    font-size: 16px !important;
    transform: translateZ(0);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  /* Deshabilitar zoom en imágenes */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }
  
  /* Permitir interacción en botones e imágenes clickeables */
  button, a, [role="button"], .clickable {
    pointer-events: auto;
  }
  
  button img, a img, [role="button"] img, .clickable img {
    pointer-events: none;
  }
  
  /* Custom animations */
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  .animate-shrink {
    animation: shrink 3s linear forwards;
  }
  
  /* Animaciones para efectos visuales modernos */
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  /* Animaciones para el modal */
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-in {
    animation: fade-in 0.3s ease-out;
  }
}`;
}

// Función para generar el contenido completo de vite-env.d.ts
export function generateViteEnvFile(): string {
  return `/// <reference types="vite/client" />`;
}

// Función para generar todos los archivos de componentes
export function generateComponentFiles(): { [key: string]: string } {
  return {
    'CartAnimation.tsx': `import React, { useEffect, useState } from 'react';
import { ShoppingCart, Check, Plus, Sparkles } from 'lucide-react';

interface CartAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export function CartAnimation({ show, onComplete }: CartAnimationProps) {
  const [stage, setStage] = useState<'hidden' | 'flying' | 'sparkle' | 'success' | 'complete'>('hidden');

  useEffect(() => {
    if (show) {
      setStage('flying');
      
      const timer1 = setTimeout(() => {
        setStage('sparkle');
      }, 800);

      const timer2 = setTimeout(() => {
        setStage('success');
      }, 1200);

      const timer3 = setTimeout(() => {
        setStage('complete');
        onComplete();
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setStage('hidden');
    }
  }, [show, onComplete]);

  if (stage === 'hidden' || stage === 'complete') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {stage === 'flying' && (
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-full shadow-2xl animate-bounce transform scale-110">
            <ShoppingCart className="h-10 w-10 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full animate-ping">
            <Plus className="h-4 w-4" />
          </div>
          <div className="absolute inset-0 animate-spin">
            <div className="absolute -top-4 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-4 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            <div className="absolute top-1/2 -left-4 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      )}
      
      {stage === 'sparkle' && (
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-full shadow-2xl animate-pulse transform scale-125">
            <Sparkles className="h-12 w-12 animate-spin" />
          </div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-yellow-300 rounded-full animate-ping"
              style={{
                top: \`\${20 + Math.sin(i * Math.PI / 4) * 60}px\`,
                left: \`\${20 + Math.cos(i * Math.PI / 4) * 60}px\`,
                animationDelay: \`\${i * 100}ms\`
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full animate-ping opacity-30"></div>
        </div>
      )}
      
      {stage === 'success' && (
        <div className="relative">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-full shadow-2xl animate-bounce transform scale-150">
            <Check className="h-12 w-12" />
          </div>
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-20 animation-delay-200"></div>
          <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-10 animation-delay-400"></div>
          
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-4 animate-bounce"
              style={{
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][i % 6],
                top: \`\${-20 + Math.random() * 40}px\`,
                left: \`\${-20 + Math.random() * 40}px\`,
                transform: \`rotate(\${Math.random() * 360}deg)\`,
                animationDelay: \`\${i * 50}ms\`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
    </div>
  );
}`,

    'ErrorMessage.tsx': `import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Oops! Algo salió mal</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
}`,

    'LoadingSpinner.tsx': `import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-r-2 border-blue-400 absolute top-0 left-0 animation-delay-75"></div>
      </div>
    </div>
  );
}`,

    'OptimizedImage.tsx': `import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center',
  lazy = true,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(lazy ? '' : src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setImageSrc(fallbackSrc);
    onError?.();
  };

  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={\`w-full h-full object-cover transition-opacity duration-300 \${
          isLoading ? 'opacity-0' : 'opacity-100'
        } \${className}\`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Error al cargar imagen</span>
        </div>
      )}
    </div>
  );
}`,

    'Toast.tsx': `import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, ShoppingCart, Trash2 } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div className={\`fixed top-20 right-4 z-50 transform transition-all duration-500 \${
      isAnimating ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
    }\`}>
      <div className={\`flex items-center p-4 rounded-2xl shadow-2xl max-w-sm backdrop-blur-sm border-2 \${
        type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300' 
          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300'
      } animate-bounce\`}>
        <div className={\`flex-shrink-0 mr-3 p-2 rounded-full \${
          type === 'success' ? 'bg-white/20' : 'bg-white/20'
        } animate-pulse\`}>
          {type === 'success' ? (
            <ShoppingCart className="h-5 w-5" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 ml-3 hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className={\`absolute bottom-0 left-0 h-1 rounded-b-2xl \${
          type === 'success' ? 'bg-white/30' : 'bg-white/30'
        } animate-pulse\`}>
          <div className={\`h-full rounded-b-2xl \${
            type === 'success' ? 'bg-white' : 'bg-white'
          } animate-[shrink_3s_linear_forwards]\`} />
        </div>
      </div>
    </div>
  );
}`,

    'VideoPlayer.tsx': `import React, { useState } from 'react';
import { ExternalLink, Play, AlertCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoKey: string;
  title: string;
}

export function VideoPlayer({ videoKey, title }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);

  const youtubeUrl = \`https://www.youtube.com/watch?v=\${videoKey}\`;
  const thumbnailUrl = \`https://img.youtube.com/vi/\${videoKey}/maxresdefault.jpg\`;

  const openInYouTube = () => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: \`url(\${thumbnailUrl})\` }}
      />
      <div className="absolute inset-0 bg-black/60 hover:bg-black/40 transition-colors" />
      
      <button
        onClick={openInYouTube}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 rounded-full p-3 transition-all hover:scale-110 shadow-2xl z-10"
        title="Ver en YouTube"
      >
        <Play className="h-5 w-5 text-white ml-0.5" />
      </button>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center text-white p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm opacity-90 mb-4">
            Haz clic en el botón de reproducir para ver en YouTube
          </p>
        </div>
      </div>
    </div>
  );
}`
  };
}

// Función para generar todos los archivos de páginas
export function generatePageFiles(): { [key: string]: string } {
  return {
    'Home.tsx': `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Star, Tv, Filter, Calendar, Clock, Flame, BookOpen } from 'lucide-react';
import { tmdbService } from '../services/tmdb';
import { MovieCard } from '../components/MovieCard';
import { HeroCarousel } from '../components/HeroCarousel';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { NovelasModal } from '../components/NovelasModal';
import type { Movie, TVShow } from '../types/movie';

type TrendingTimeWindow = 'day' | 'week';

export function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [popularAnime, setPopularAnime] = useState<TVShow[]>([]);
  const [trendingContent, setTrendingContent] = useState<(Movie | TVShow)[]>([]);
  const [heroItems, setHeroItems] = useState<(Movie | TVShow)[]>([]);
  const [trendingTimeWindow, setTrendingTimeWindow] = useState<TrendingTimeWindow>('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showNovelasModal, setShowNovelasModal] = useState(false);

  const timeWindowLabels = {
    day: 'Hoy',
    week: 'Esta Semana'
  };

  const fetchTrendingContent = async (timeWindow: TrendingTimeWindow) => {
    try {
      const response = await tmdbService.getTrendingAll(timeWindow, 1);
      const uniqueContent = tmdbService.removeDuplicates(response.results);
      setTrendingContent(uniqueContent.slice(0, 12));
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching trending content:', err);
    }
  };

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      
      const heroContent = await tmdbService.getHeroContent();
      setHeroItems(heroContent);
      
      const trendingResponse = await tmdbService.getTrendingAll(trendingTimeWindow, 1);
      const uniqueTrending = tmdbService.removeDuplicates(trendingResponse.results);
      setTrendingContent(uniqueTrending.slice(0, 12));
      
      const usedIds = new Set([
        ...heroContent.map(item => item.id),
        ...uniqueTrending.slice(0, 12).map(item => item.id)
      ]);
      
      const [moviesRes, tvRes, animeRes] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1),
        tmdbService.getAnimeFromMultipleSources(1)
      ]);

      const filteredMovies = moviesRes.results.filter(movie => !usedIds.has(movie.id)).slice(0, 8);
      const filteredTVShows = tvRes.results.filter(show => !usedIds.has(show.id)).slice(0, 8);
      const filteredAnime = animeRes.results.filter(anime => !usedIds.has(anime.id)).slice(0, 8);

      setPopularMovies(filteredMovies);
      setPopularTVShows(filteredTVShows);
      setPopularAnime(filteredAnime);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Error al cargar el contenido. Por favor, intenta de nuevo.');
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  useEffect(() => {
    fetchTrendingContent(trendingTimeWindow);
  }, [trendingTimeWindow]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroCarousel items={heroItems} />
      
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Descubre el Mundo del
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              {' '}Entretenimiento
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Explora miles de películas, animes, series ilimitadas y mucho más. Encuentra tus favoritos y agrégalos a tu carrito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/movies"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Explorar Películas
            </Link>
            <Link
              to="/tv"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <Tv className="mr-2 h-5 w-5" />
              Ver Series
            </Link>
            <button
              onClick={() => setShowNovelasModal(true)}
              className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Catálogo de Novelas
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Flame className="mr-2 h-6 w-6 text-red-500" />
              En Tendencia
            </h2>
            
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <Filter className="h-4 w-4 text-gray-500 ml-2" />
              <span className="text-sm font-medium text-gray-700 px-2">Período:</span>
              {Object.entries(timeWindowLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTrendingTimeWindow(key as TrendingTimeWindow)}
                  className={\`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center \${
                    trendingTimeWindow === key
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }\`}
                >
                  {key === 'day' ? <Calendar className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingContent.map((item) => {
              const itemType = 'title' in item ? 'movie' : 'tv';
              return (
                <MovieCard key={\`trending-\${itemType}-\${item.id}\`} item={item} type={itemType} />
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-500" />
              Películas Destacadas
            </h2>
            <Link
              to="/movies"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Tv className="mr-2 h-6 w-6 text-blue-500" />
              Series Destacadas
            </h2>
            <Link
              to="/tv"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularTVShows.map((show) => (
              <MovieCard key={show.id} item={show} type="tv" />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-2 text-2xl">🎌</span>
              Anime Destacado
            </h2>
            <Link
              to="/anime"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              Ver todos
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularAnime.map((anime) => (
              <MovieCard key={anime.id} item={anime} type="tv" />
            ))}
          </div>
        </section>

        <div className="hidden">
          <p>Última actualización: {lastUpdate.toLocaleString()}</p>
        </div>
      </div>
      
      <NovelasModal 
        isOpen={showNovelasModal} 
        onClose={() => setShowNovelasModal(false)} 
      />
    </div>
  );
}`
  };
}

// Función para generar todos los archivos de servicios
export function generateServiceFiles(): { [key: string]: string } {
  return {
    'api.ts': `import { BASE_URL, API_OPTIONS } from '../config/api';

export class APIService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async fetchWithCache<T>(endpoint: string, useCache: boolean = true): Promise<T> {
    const cacheKey = endpoint;
    
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
      
      if (!isExpired) {
        return cached.data;
      }
    }

    try {
      const response = await fetch(\`\${BASE_URL}\${endpoint}\`, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      
      if (useCache) {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }
      
      return data;
    } catch (error) {
      console.error(\`API Error for \${endpoint}:\`, error);
      
      if (this.cache.has(cacheKey)) {
        console.warn(\`Using expired cache for \${endpoint}\`);
        return this.cache.get(cacheKey)!.data;
      }
      
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  getCacheInfo(): { key: string; age: number }[] {
    const now = Date.now();
    return Array.from(this.cache.entries()).map(([key, { timestamp }]) => ({
      key,
      age: now - timestamp
    }));
  }
}

export const apiService = new APIService();`,

    'tmdb.ts': `import { BASE_URL, API_OPTIONS } from '../config/api';
import { apiService } from './api';
import type { Movie, TVShow, MovieDetails, TVShowDetails, Video, APIResponse, Genre, Cast, CastMember } from '../types/movie';

class TMDBService {
  private async fetchData<T>(endpoint: string, useCache: boolean = true): Promise<T> {
    return apiService.fetchWithCache<T>(endpoint, useCache);
  }

  private async getVideosWithFallback(endpoint: string): Promise<{ results: Video[] }> {
    try {
      const spanishVideos = await this.fetchData<{ results: Video[] }>(\`\${endpoint}?language=es-ES\`);
      
      if (!spanishVideos.results || spanishVideos.results.length === 0) {
        const englishVideos = await this.fetchData<{ results: Video[] }>(\`\${endpoint}?language=en-US\`);
        return englishVideos;
      }
      
      const spanishTrailers = spanishVideos.results.filter(
        video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
      );
      
      if (spanishTrailers.length === 0) {
        const englishVideos = await this.fetchData<{ results: Video[] }>(\`\${endpoint}?language=en-US\`);
        const englishTrailers = englishVideos.results.filter(
          video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        );
        
        return {
          results: [...spanishVideos.results, ...englishTrailers]
        };
      }
      
      return spanishVideos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return { results: [] };
    }
  }

  async getPopularMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/movie/popular?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTopRatedMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/movie/top_rated?language=es-ES&page=\${page}\`, page === 1);
  }

  async getUpcomingMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/movie/upcoming?language=es-ES&page=\${page}\`, page === 1);
  }

  async searchMovies(query: string, page: number = 1): Promise<APIResponse<Movie>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/movie?query=\${encodedQuery}&language=es-ES&page=\${page}\`);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetchData(\`/movie/\${id}?language=es-ES\`, true);
  }

  async getMovieVideos(id: number): Promise<{ results: Video[] }> {
    return this.getVideosWithFallback(\`/movie/\${id}/videos\`);
  }

  async getMovieCredits(id: number): Promise<Cast> {
    return this.fetchData(\`/movie/\${id}/credits?language=es-ES\`, true);
  }

  async getPopularTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/tv/popular?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTopRatedTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/tv/top_rated?language=es-ES&page=\${page}\`, page === 1);
  }

  async searchTVShows(query: string, page: number = 1): Promise<APIResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/tv?query=\${encodedQuery}&language=es-ES&page=\${page}\`);
  }

  async getTVShowDetails(id: number): Promise<TVShowDetails> {
    return this.fetchData(\`/tv/\${id}?language=es-ES\`, true);
  }

  async getTVShowVideos(id: number): Promise<{ results: Video[] }> {
    return this.getVideosWithFallback(\`/tv/\${id}/videos\`);
  }

  async getTVShowCredits(id: number): Promise<Cast> {
    return this.fetchData(\`/tv/\${id}/credits?language=es-ES\`, true);
  }

  async getPopularAnime(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1);
  }

  async getTopRatedAnime(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=\${page}&sort_by=vote_average.desc&vote_count.gte=100&include_adult=false\`, page === 1);
  }

  async searchAnime(query: string, page: number = 1): Promise<APIResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/tv?query=\${encodedQuery}&language=es-ES&page=\${page}&with_genres=16&with_origin_country=JP\`);
  }

  async getAnimeFromMultipleSources(page: number = 1): Promise<APIResponse<TVShow>> {
    try {
      const [japaneseAnime, animationGenre, koreanAnimation] = await Promise.all([
        this.fetchData<APIResponse<TVShow>>(\`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1),
        this.fetchData<APIResponse<TVShow>>(\`/discover/tv?with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1),
        this.fetchData<APIResponse<TVShow>>(\`/discover/tv?with_origin_country=KR&with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1)
      ]);

      const combinedResults = [
        ...japaneseAnime.results,
        ...animationGenre.results.filter(item => 
          !japaneseAnime.results.some(jp => jp.id === item.id)
        ),
        ...koreanAnimation.results.filter(item => 
          !japaneseAnime.results.some(jp => jp.id === item.id) &&
          !animationGenre.results.some(an => an.id === item.id)
        )
      ];

      return {
        ...japaneseAnime,
        results: this.removeDuplicates(combinedResults)
      };
    } catch (error) {
      console.error('Error fetching anime from multiple sources:', error);
      return this.getPopularAnime(page);
    }
  }

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchData('/genre/movie/list?language=es-ES', true);
  }

  async getTVGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchData('/genre/tv/list?language=es-ES', true);
  }

  async searchMulti(query: string, page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/multi?query=\${encodedQuery}&language=es-ES&page=\${page}\`);
  }

  async getTrendingAll(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    return this.fetchData(\`/trending/all/\${timeWindow}?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/trending/movie/\${timeWindow}?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTrendingTV(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/trending/tv/\${timeWindow}?language=es-ES&page=\${page}\`, page === 1);
  }

  removeDuplicates<T extends { id: number }>(items: T[]): T[] {
    const seen = new Set<number>();
    return items.filter(item => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }

  async getHeroContent(): Promise<(Movie | TVShow)[]> {
    try {
      const [trendingDay, trendingWeek, popularMovies, popularTV] = await Promise.all([
        this.getTrendingAll('day', 1),
        this.getTrendingAll('week', 1),
        this.getPopularMovies(1),
        this.getPopularTVShows(1)
      ]);

      const combinedItems = [
        ...trendingDay.results.slice(0, 8),
        ...trendingWeek.results.slice(0, 4),
        ...popularMovies.results.slice(0, 3),
        ...popularTV.results.slice(0, 3)
      ];

      return this.removeDuplicates(combinedItems).slice(0, 10);
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return [];
    }
  }

  async batchFetchVideos(items: { id: number; type: 'movie' | 'tv' }[]): Promise<Map<string, Video[]>> {
    const videoMap = new Map<string, Video[]>();
    
    try {
      const videoPromises = items.map(async (item) => {
        const key = \`\${item.type}-\${item.id}\`;
        try {
          const videos = item.type === 'movie' 
            ? await this.getMovieVideos(item.id)
            : await this.getTVShowVideos(item.id);
          
          const trailers = videos.results.filter(
            video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
          );
          
          return { key, videos: trailers };
        } catch (error) {
          console.error(\`Error fetching videos for \${key}:\`, error);
          return { key, videos: [] };
        }
      });

      const results = await Promise.all(videoPromises);
      results.forEach(({ key, videos }) => {
        videoMap.set(key, videos);
      });
    } catch (error) {
      console.error('Error in batch fetch videos:', error);
    }
    
    return videoMap;
  }

  clearCache(): void {
    apiService.clearCache();
  }

  getCacheStats(): { size: number; items: { key: string; age: number }[] } {
    return {
      size: apiService.getCacheSize(),
      items: apiService.getCacheInfo()
    };
  }
}

export const tmdbService = new TMDBService();`,

    'contentSync.ts': `import { tmdbService } from './tmdb';
import type { Movie, TVShow } from '../types/movie';

class ContentSyncService {
  private lastDailyUpdate: Date | null = null;
  private lastWeeklyUpdate: Date | null = null;
  private syncInProgress = false;

  constructor() {
    this.initializeAutoSync();
  }

  private initializeAutoSync() {
    setInterval(() => {
      this.checkAndSync();
    }, 60 * 60 * 1000);

    this.checkAndSync();
  }

  private async checkAndSync() {
    if (this.syncInProgress) return;

    const now = new Date();
    const shouldDailyUpdate = this.shouldPerformDailyUpdate(now);
    const shouldWeeklyUpdate = this.shouldPerformWeeklyUpdate(now);

    if (shouldDailyUpdate || shouldWeeklyUpdate) {
      await this.performSync(shouldWeeklyUpdate);
    }
  }

  private shouldPerformDailyUpdate(now: Date): boolean {
    if (!this.lastDailyUpdate) return true;
    
    const timeDiff = now.getTime() - this.lastDailyUpdate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    return hoursDiff >= 24;
  }

  private shouldPerformWeeklyUpdate(now: Date): boolean {
    if (!this.lastWeeklyUpdate) return true;
    
    const timeDiff = now.getTime() - this.lastWeeklyUpdate.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    return daysDiff >= 7;
  }

  private async performSync(isWeeklyUpdate: boolean = false) {
    try {
      this.syncInProgress = true;
      console.log(\`Performing \${isWeeklyUpdate ? 'weekly' : 'daily'} content sync...\`);

      await Promise.all([
        this.syncTrendingContent('day'),
        this.syncTrendingContent('week'),
        this.syncPopularContent(),
        this.syncAnimeContent(),
        this.syncVideosForPopularContent()
      ]);

      const now = new Date();
      this.lastDailyUpdate = now;
      
      if (isWeeklyUpdate) {
        this.lastWeeklyUpdate = now;
      }

      console.log('Content sync completed successfully');
    } catch (error) {
      console.error('Error during content sync:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  private async syncVideosForPopularContent() {
    try {
      const [moviesRes, tvRes, animeRes] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1),
        tmdbService.getAnimeFromMultipleSources(1)
      ]);

      const items = [
        ...moviesRes.results.slice(0, 10).map(movie => ({ id: movie.id, type: 'movie' as const })),
        ...tvRes.results.slice(0, 10).map(tv => ({ id: tv.id, type: 'tv' as const })),
        ...animeRes.results.slice(0, 10).map(anime => ({ id: anime.id, type: 'tv' as const }))
      ];

      const videoMap = await tmdbService.batchFetchVideos(items);
      
      const videoData: { [key: string]: any[] } = {};
      videoMap.forEach((videos, key) => {
        videoData[key] = videos;
      });

      localStorage.setItem('content_videos', JSON.stringify({
        videos: videoData,
        lastUpdate: new Date().toISOString()
      }));

      console.log(\`Synced videos for \${items.length} items\`);
    } catch (error) {
      console.error('Error syncing videos:', error);
    }
  }

  private async syncTrendingContent(timeWindow: 'day' | 'week') {
    try {
      const response = await tmdbService.getTrendingAll(timeWindow, 1);
      const uniqueContent = tmdbService.removeDuplicates(response.results);
      
      localStorage.setItem(\`trending_\${timeWindow}\`, JSON.stringify({
        content: uniqueContent,
        lastUpdate: new Date().toISOString()
      }));
      
      return uniqueContent;
    } catch (error) {
      console.error(\`Error syncing trending \${timeWindow} content:\`, error);
      return [];
    }
  }

  private async syncPopularContent() {
    try {
      const [movies, tvShows] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1)
      ]);

      localStorage.setItem('popular_movies', JSON.stringify({
        content: movies.results,
        lastUpdate: new Date().toISOString()
      }));

      localStorage.setItem('popular_tv', JSON.stringify({
        content: tvShows.results,
        lastUpdate: new Date().toISOString()
      }));

      return { movies: movies.results, tvShows: tvShows.results };
    } catch (error) {
      console.error('Error syncing popular content:', error);
      return { movies: [], tvShows: [] };
    }
  }

  private async syncAnimeContent() {
    try {
      const anime = await tmdbService.getAnimeFromMultipleSources(1);
      
      localStorage.setItem('popular_anime', JSON.stringify({
        content: anime.results,
        lastUpdate: new Date().toISOString()
      }));

      return anime.results;
    } catch (error) {
      console.error('Error syncing anime content:', error);
      return [];
    }
  }

  async getTrendingContent(timeWindow: 'day' | 'week'): Promise<(Movie | TVShow)[]> {
    const cached = localStorage.getItem(\`trending_\${timeWindow}\`);
    
    if (cached) {
      try {
        const { content, lastUpdate } = JSON.parse(cached);
        const updateTime = new Date(lastUpdate);
        const now = new Date();
        const hoursDiff = (now.getTime() - updateTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 6) {
          return content;
        }
      } catch (error) {
        console.error('Error parsing cached content:', error);
      }
    }

    return await this.syncTrendingContent(timeWindow);
  }

  async getPopularContent(): Promise<{ movies: Movie[]; tvShows: TVShow[]; anime: TVShow[] }> {
    const [movies, tvShows, anime] = await Promise.all([
      this.getCachedOrFresh('popular_movies', () => tmdbService.getPopularMovies(1)),
      this.getCachedOrFresh('popular_tv', () => tmdbService.getPopularTVShows(1)),
      this.getCachedOrFresh('popular_anime', () => tmdbService.getAnimeFromMultipleSources(1))
    ]);

    return {
      movies: movies.results || movies,
      tvShows: tvShows.results || tvShows,
      anime: anime.results || anime
    };
  }

  getCachedVideos(id: number, type: 'movie' | 'tv'): any[] {
    try {
      const cached = localStorage.getItem('content_videos');
      if (cached) {
        const { videos } = JSON.parse(cached);
        const key = \`\${type}-\${id}\`;
        return videos[key] || [];
      }
    } catch (error) {
      console.error('Error getting cached videos:', error);
    }
    return [];
  }

  private async getCachedOrFresh(key: string, fetchFn: () => Promise<any>) {
    const cached = localStorage.getItem(key);
    
    if (cached) {
      try {
        const { content, lastUpdate } = JSON.parse(cached);
        const updateTime = new Date(lastUpdate);
        const now = new Date();
        const hoursDiff = (now.getTime() - updateTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 12) {
          return content;
        }
      } catch (error) {
        console.error(\`Error parsing cached \${key}:\`, error);
      }
    }

    const fresh = await fetchFn();
    localStorage.setItem(key, JSON.stringify({
      content: fresh.results || fresh,
      lastUpdate: new Date().toISOString()
    }));

    return fresh.results || fresh;
  }

  async forceRefresh(): Promise<void> {
    this.lastDailyUpdate = null;
    this.lastWeeklyUpdate = null;
    localStorage.removeItem('content_videos');
    await this.performSync(true);
  }

  getSyncStatus(): { lastDaily: Date | null; lastWeekly: Date | null; inProgress: boolean } {
    return {
      lastDaily: this.lastDailyUpdate,
      lastWeekly: this.lastWeeklyUpdate,
      inProgress: this.syncInProgress
    };
  }
}

export const contentSyncService = new ContentSyncService();`
  };
}

// Función para generar todos los archivos de utilidades
export function generateUtilFiles(): { [key: string]: string } {
  return {
    'errorHandler.ts': `export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: Array<{ error: Error; timestamp: Date; context: string }> = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  logError(error: Error, context: string = 'Unknown'): void {
    const errorEntry = {
      error,
      timestamp: new Date(),
      context
    };

    this.errorLog.push(errorEntry);
    
    if (this.errorLog.length > 50) {
      this.errorLog = this.errorLog.slice(-50);
    }

    console.error(\`[\${context}] Error:\`, error);
  }

  getErrorLog(): Array<{ error: Error; timestamp: Date; context: string }> {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }

  handleAsyncError(promise: Promise<any>, context: string): Promise<any> {
    return promise.catch(error => {
      this.logError(error, context);
      throw error;
    });
  }
}

export const errorHandler = ErrorHandler.getInstance();

export function useErrorHandler() {
  const logError = (error: Error, context: string) => {
    errorHandler.logError(error, context);
  };

  const handleAsyncError = (promise: Promise<any>, context: string) => {
    return errorHandler.handleAsyncError(promise, context);
  };

  return { logError, handleAsyncError };
}`,

    'performance.ts': `export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observers: Map<string, IntersectionObserver> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      this.observers.set('images', imageObserver);

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  preloadResource(url: string, type: 'image' | 'script' | 'style'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    switch (type) {
      case 'image':
        link.as = 'image';
        break;
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
    }
    
    document.head.appendChild(link);
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();`,

    'whatsapp.ts': `import { OrderData, CustomerInfo } from '../components/CheckoutModal';

export function sendOrderToWhatsApp(orderData: OrderData): void {
  const { 
    orderId, 
    customerInfo, 
    deliveryZone, 
    deliveryCost, 
    items, 
    subtotal, 
    transferFee, 
    total,
    cashTotal = 0,
    transferTotal = 0
  } = orderData;

  const itemsList = items
    .map(item => {
      const seasonInfo = item.selectedSeasons && item.selectedSeasons.length > 0 
        ? \`\\n  📺 Temporadas: \${item.selectedSeasons.sort((a, b) => a - b).join(', ')}\` 
        : '';
      const itemType = item.type === 'movie' ? 'Película' : 'Serie';
      const basePrice = item.type === 'movie' ? 80 : (item.selectedSeasons?.length || 1) * 300;
      const finalPrice = item.paymentType === 'transfer' ? Math.round(basePrice * 1.1) : basePrice;
      const paymentTypeText = item.paymentType === 'transfer' ? 'Transferencia (+10%)' : 'Efectivo';
      const emoji = item.type === 'movie' ? '🎬' : '📺';
      return \`\${emoji} *\${item.title}*\${seasonInfo}\\n  📋 Tipo: \${itemType}\\n  💳 Pago: \${paymentTypeText}\\n  💰 Precio: $\${finalPrice.toLocaleString()} CUP\`;
    })
    .join('\\n\\n');

  let message = \`🎬 *NUEVO PEDIDO - TV A LA CARTA*\\n\\n\`;
  message += \`📋 *ID de Orden:* \${orderId}\\n\\n\`;
  
  message += \`👤 *DATOS DEL CLIENTE:*\\n\`;
  message += \`• Nombre: \${customerInfo.fullName}\\n\`;
  message += \`• Teléfono: \${customerInfo.phone}\\n\`;
  message += \`• Dirección: \${customerInfo.address}\\n\\n\`;
  
  message += \`🎯 *PRODUCTOS SOLICITADOS:*\\n\${itemsList}\\n\\n\`;
  
  message += \`💰 *RESUMEN DE COSTOS:*\\n\`;
  
  const cashItems = items.filter(item => item.paymentType === 'cash');
  const transferItems = items.filter(item => item.paymentType === 'transfer');
  
  message += \`\\n📊 *DESGLOSE POR TIPO DE PAGO:*\\n\`;
  
  if (cashItems.length > 0) {
    message += \`💵 *EFECTIVO:*\\n\`;
    cashItems.forEach(item => {
      const basePrice = item.type === 'movie' ? 80 : (item.selectedSeasons?.length || 1) * 300;
      const emoji = item.type === 'movie' ? '🎬' : '📺';
      message += \`  \${emoji} \${item.title}: $\${basePrice.toLocaleString()} CUP\\n\`;
    });
    message += \`  💰 *Subtotal Efectivo: $\${cashTotal.toLocaleString()} CUP*\\n\\n\`;
  }
  
  if (transferItems.length > 0) {
    message += \`🏦 *TRANSFERENCIA (+10%):*\\n\`;
    transferItems.forEach(item => {
      const basePrice = item.type === 'movie' ? 80 : (item.selectedSeasons?.length || 1) * 300;
      const finalPrice = Math.round(basePrice * 1.1);
      const emoji = item.type === 'movie' ? '🎬' : '📺';
      message += \`  \${emoji} \${item.title}: $\${basePrice.toLocaleString()} → $\${finalPrice.toLocaleString()} CUP\\n\`;
    });
    message += \`  💰 *Subtotal Transferencia: $\${transferTotal.toLocaleString()} CUP*\\n\\n\`;
  }
  
  message += \`📋 *RESUMEN FINAL:*\\n\`;
  if (cashTotal > 0) {
    message += \`• Efectivo: $\${cashTotal.toLocaleString()} CUP (\${cashItems.length} elementos)\\n\`;
  }
  if (transferTotal > 0) {
    message += \`• Transferencia: $\${transferTotal.toLocaleString()} CUP (\${transferItems.length} elementos)\\n\`;
  }
  message += \`• *Subtotal Contenido: $\${subtotal.toLocaleString()} CUP*\\n\`;
  
  if (transferFee > 0) {
    message += \`• Recargo transferencia (10%): +$\${transferFee.toLocaleString()} CUP\\n\`;
  }
  
  message += \`🚚 Entrega (\${deliveryZone.split(' > ')[2]}): +$\${deliveryCost.toLocaleString()} CUP\\n\`;
  message += \`\\n🎯 *TOTAL FINAL: $\${total.toLocaleString()} CUP*\\n\\n\`;
  
  message += \`📍 *ZONA DE ENTREGA:*\\n\`;
  message += \`\${deliveryZone.replace(' > ', ' → ')}\\n\`;
  message += \`💰 Costo de entrega: $\${deliveryCost.toLocaleString()} CUP\\n\\n\`;
  
  message += \`📊 *ESTADÍSTICAS DEL PEDIDO:*\\n\`;
  message += \`• Total de elementos: \${items.length}\\n\`;
  message += \`• Películas: \${items.filter(item => item.type === 'movie').length}\\n\`;
  message += \`• Series: \${items.filter(item => item.type === 'tv').length}\\n\`;
  if (cashItems.length > 0) {
    message += \`• Pago en efectivo: \${cashItems.length} elementos\\n\`;
  }
  if (transferItems.length > 0) {
    message += \`• Pago por transferencia: \${transferItems.length} elementos\\n\`;
  }
  message += \`\\n\`;
  
  message += \`📱 *Enviado desde:* TV a la Carta App\\n\`;
  message += \`⏰ *Fecha y hora:* \${new Date().toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })}\\n\`;
  message += \`🌟 *¡Gracias por elegir TV a la Carta!*\`;
  
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '5354690878';
  const whatsappUrl = \`https://wa.me/\${phoneNumber}?text=\${encodedMessage}\`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}`
  };
}

// Función para generar todos los archivos de hooks
export function generateHookFiles(): { [key: string]: string } {
  return {
    'useContentSync.ts': `import { useState, useEffect } from 'react';
import { contentSyncService } from '../services/contentSync';
import type { Movie, TVShow } from '../types/movie';

export function useContentSync() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const refreshContent = async () => {
    setIsLoading(true);
    try {
      await contentSyncService.forceRefresh();
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error refreshing content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendingContent = async (timeWindow: 'day' | 'week'): Promise<(Movie | TVShow)[]> => {
    return await contentSyncService.getTrendingContent(timeWindow);
  };

  const getPopularContent = async () => {
    return await contentSyncService.getPopularContent();
  };

  useEffect(() => {
    const status = contentSyncService.getSyncStatus();
    setLastUpdate(status.lastDaily);
  }, []);

  return {
    isLoading,
    lastUpdate,
    refreshContent,
    getTrendingContent,
    getPopularContent
  };
}`,

    'useOptimizedContent.ts': `import { useState, useEffect, useCallback } from 'react';
import { tmdbService } from '../services/tmdb';
import { errorHandler } from '../utils/errorHandler';
import { performanceOptimizer } from '../utils/performance';
import type { Movie, TVShow } from '../types/movie';

interface ContentState {
  data: (Movie | TVShow)[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

export function useOptimizedContent(
  fetchFunction: (page: number) => Promise<any>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<ContentState>({
    data: [],
    loading: true,
    error: null,
    hasMore: true,
    page: 1
  });

  const debouncedFetch = useCallback(
    performanceOptimizer.debounce(async (page: number, append: boolean = false) => {
      try {
        if (!append) {
          setState(prev => ({ ...prev, loading: true, error: null }));
        }

        const response = await errorHandler.handleAsyncError(
          fetchFunction(page),
          'useOptimizedContent'
        );

        const uniqueResults = tmdbService.removeDuplicates(response.results);

        setState(prev => ({
          ...prev,
          data: append ? tmdbService.removeDuplicates([...prev.data, ...uniqueResults]) : uniqueResults,
          loading: false,
          hasMore: page < response.total_pages,
          page
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Error al cargar el contenido. Por favor, intenta de nuevo.'
        }));
      }
    }, 300),
    [fetchFunction]
  );

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      const nextPage = state.page + 1;
      setState(prev => ({ ...prev, page: nextPage }));
      debouncedFetch(nextPage, true);
    }
  }, [state.loading, state.hasMore, state.page, debouncedFetch]);

  const refresh = useCallback(() => {
    setState(prev => ({ ...prev, page: 1 }));
    debouncedFetch(1, false);
  }, [debouncedFetch]);

  useEffect(() => {
    debouncedFetch(1, false);
  }, dependencies);

  return {
    ...state,
    loadMore,
    refresh
  };
}`,

    'usePerformance.ts': `import { useState, useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    cacheHitRate: 0
  });

  const [isOptimized, setIsOptimized] = useState(false);

  const measurePerformance = useCallback(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0;

    setMetrics(prev => ({
      ...prev,
      loadTime,
      memoryUsage,
      renderTime: performance.now()
    }));
  }, []);

  const optimizePerformance = useCallback(() => {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('old') || name.includes('temp')) {
            caches.delete(name);
          }
        });
      });
    }

    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });

    setIsOptimized(true);
    
    setTimeout(() => setIsOptimized(false), 3000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(measurePerformance, 1000);
    return () => clearTimeout(timer);
  }, [measurePerformance]);

  return {
    metrics,
    isOptimized,
    optimizePerformance,
    measurePerformance
  };
}`
  };
}

// Función para generar archivos de configuración
export function generateConfigFiles(): { [key: string]: string } {
  return {
    'api.ts': `const API_KEY = '36c08297b5565b5604ed8646cb0c1393';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmMwODI5N2I1NTY1YjU2MDRlZDg2NDZjYjBjMTM5MyIsIm5iZiI6MTcxNzM3MjM0Ny44NDcwMDAxLCJzdWIiOiI2NjVkMDViYmZkOTMxM2QwZDNhMGFjZDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X8jcKcjIT1svPP5EeO0CtF3Ct11pZwrXaJ0DLAz5pDQ';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'w1280';

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: \`Bearer \${ACCESS_TOKEN}\`
  }
};

export { API_KEY };`
  };
}

// Función para generar archivos de tipos
export function generateTypeFiles(): { [key: string]: string } {
  return {
    'movie.ts': `export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string;
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  seasons: Season[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Cast {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CartItem {
  id: number;
  title: string;
  poster_path: string | null;
  type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  selectedSeasons?: number[];
  price?: number;
  totalPrice?: number;
  paymentType?: 'cash' | 'transfer';
  original_language?: string;
  genre_ids?: number[];
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}`
  };
}

// Función principal para generar todos los archivos del sistema
export async function generateCompleteSystemFiles(state: AdminState): Promise<{ [key: string]: string }> {
  const files: { [key: string]: string } = {};

  // Archivos principales
  files['src/App.tsx'] = generateAppFile();
  files['src/main.tsx'] = generateMainFile();
  files['src/index.css'] = generateIndexCssFile();
  files['src/vite-env.d.ts'] = generateViteEnvFile();

  // Componentes
  const componentFiles = generateComponentFiles();
  Object.entries(componentFiles).forEach(([filename, content]) => {
    files[`src/components/${filename}`] = content;
  });

  // Páginas
  const pageFiles = generatePageFiles();
  Object.entries(pageFiles).forEach(([filename, content]) => {
    files[`src/pages/${filename}`] = content;
  });

  // Servicios
  const serviceFiles = generateServiceFiles();
  Object.entries(serviceFiles).forEach(([filename, content]) => {
    files[`src/services/${filename}`] = content;
  });

  // Utilidades
  const utilFiles = generateUtilFiles();
  Object.entries(utilFiles).forEach(([filename, content]) => {
    files[`src/utils/${filename}`] = content;
  });

  // Hooks
  const hookFiles = generateHookFiles();
  Object.entries(hookFiles).forEach(([filename, content]) => {
    files[`src/hooks/${filename}`] = content;
  });

  // Configuración
  const configFiles = generateConfigFiles();
  Object.entries(configFiles).forEach(([filename, content]) => {
    files[`src/config/${filename}`] = content;
  });

  // Tipos
  const typeFiles = generateTypeFiles();
  Object.entries(typeFiles).forEach(([filename, content]) => {
    files[`src/types/${filename}`] = content;
  });

  return files;
}