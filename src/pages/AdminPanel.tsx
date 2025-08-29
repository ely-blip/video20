import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  DollarSign, 
  MapPin, 
  BookOpen, 
  Bell, 
  Download, 
  Upload, 
  Sync, 
  LogOut, 
  Eye, 
  EyeOff, 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  AlertCircle,
  Home,
  Shield,
  Database,
  Activity,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Zap
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { PriceConfig, DeliveryZone, Novel } from '../context/AdminContext';

export function AdminPanel() {
  const {
    state,
    login,
    logout,
    updatePrices,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    addNovel,
    updateNovel,
    deleteNovel,
    addNotification,
    clearNotifications,
    exportSystemBackup,
    syncWithRemote
  } = useAdmin();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'prices' | 'delivery' | 'novels' | 'notifications' | 'system'>('dashboard');
  const [priceForm, setPriceForm] = useState<PriceConfig>(state.prices);
  const [deliveryForm, setDeliveryForm] = useState({ name: '', cost: 0 });
  const [novelForm, setNovelForm] = useState({ titulo: '', genero: '', capitulos: 0, año: new Date().getFullYear(), descripcion: '' });
  const [editingDeliveryZone, setEditingDeliveryZone] = useState<DeliveryZone | null>(null);
  const [editingNovel, setEditingNovel] = useState<Novel | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Update price form when state changes (real-time sync)
  useEffect(() => {
    setPriceForm(state.prices);
  }, [state.prices]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (!success) {
      alert('Credenciales incorrectas');
    }
  };

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrices(priceForm);
  };

  const handleDeliveryZoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeliveryZone) {
      updateDeliveryZone({
        ...editingDeliveryZone,
        name: deliveryForm.name,
        cost: deliveryForm.cost
      });
      setEditingDeliveryZone(null);
    } else {
      addDeliveryZone(deliveryForm);
    }
    setDeliveryForm({ name: '', cost: 0 });
  };

  const handleNovelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNovel) {
      updateNovel({
        ...editingNovel,
        ...novelForm
      });
      setEditingNovel(null);
    } else {
      addNovel(novelForm);
    }
    setNovelForm({ titulo: '', genero: '', capitulos: 0, año: new Date().getFullYear(), descripcion: '' });
  };

  const startEditDeliveryZone = (zone: DeliveryZone) => {
    setEditingDeliveryZone(zone);
    setDeliveryForm({ name: zone.name, cost: zone.cost });
  };

  const startEditNovel = (novel: Novel) => {
    setEditingNovel(novel);
    setNovelForm({
      titulo: novel.titulo,
      genero: novel.genero,
      capitulos: novel.capitulos,
      año: novel.año,
      descripcion: novel.descripcion || ''
    });
  };

  const cancelEdit = () => {
    setEditingDeliveryZone(null);
    setEditingNovel(null);
    setDeliveryForm({ name: '', cost: 0 });
    setNovelForm({ titulo: '', genero: '', capitulos: 0, año: new Date().getFullYear(), descripcion: '' });
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await syncWithRemote();
    setIsSyncing(false);
  };

  // Calculate statistics
  const stats = {
    totalDeliveryZones: state.deliveryZones.length,
    totalNovels: state.novels.length,
    totalNotifications: state.notifications.length,
    avgDeliveryCost: state.deliveryZones.length > 0 
      ? Math.round(state.deliveryZones.reduce((sum, zone) => sum + zone.cost, 0) / state.deliveryZones.length)
      : 0,
    totalNovelChapters: state.novels.reduce((sum, novel) => sum + novel.capitulos, 0),
    recentNotifications: state.notifications.filter(n => {
      const notifDate = new Date(n.timestamp);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return notifDate > dayAgo;
    }).length
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-sm opacity-90">TV a la Carta</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ingrese su usuario"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
            
            <div className="text-center">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
              >
                <Home className="h-4 w-4 mr-1" />
                Volver al sitio principal
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">TV a la Carta</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sync Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${state.syncStatus.isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-sm text-gray-600">
                  {state.syncStatus.isOnline ? 'En línea' : 'Fuera de línea'}
                </span>
              </div>
              
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Sincronizar"
              >
                <Sync className={`h-5 w-5 ${isSyncing ? 'animate-spin' : ''}`} />
              </button>
              
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium"
              >
                <Home className="h-4 w-4 mr-1" />
                Sitio Principal
              </Link>
              
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Navegación</h2>
              </div>
              
              <div className="p-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Activity },
                  { id: 'prices', label: 'Gestión de Precios', icon: DollarSign },
                  { id: 'delivery', label: 'Zonas de Entrega', icon: MapPin },
                  { id: 'novels', label: 'Gestión de Novelas', icon: BookOpen },
                  { id: 'notifications', label: 'Notificaciones', icon: Bell },
                  { id: 'system', label: 'Sistema', icon: Database }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id as any)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{label}</span>
                    {id === 'notifications' && state.notifications.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {state.notifications.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard del Sistema</h2>
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-blue-600">${state.prices.moviePrice}</span>
                      </div>
                      <h3 className="font-semibold text-blue-900 mb-1">Precio Películas</h3>
                      <p className="text-sm text-blue-700">CUP por película</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-500 p-3 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-purple-600">${state.prices.seriesPrice}</span>
                      </div>
                      <h3 className="font-semibold text-purple-900 mb-1">Precio Series</h3>
                      <p className="text-sm text-purple-700">CUP por temporada</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-500 p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-green-600">{stats.totalDeliveryZones}</span>
                      </div>
                      <h3 className="font-semibold text-green-900 mb-1">Zonas de Entrega</h3>
                      <p className="text-sm text-green-700">Configuradas</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-pink-500 p-3 rounded-lg">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-pink-600">{stats.totalNovels}</span>
                      </div>
                      <h3 className="font-semibold text-pink-900 mb-1">Novelas</h3>
                      <p className="text-sm text-pink-700">En catálogo</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-500 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-orange-600">{stats.totalNovelChapters}</span>
                      </div>
                      <h3 className="font-semibold text-orange-900 mb-1">Capítulos</h3>
                      <p className="text-sm text-orange-700">Total disponibles</p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-indigo-500 p-3 rounded-lg">
                          <Bell className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-indigo-600">{stats.recentNotifications}</span>
                      </div>
                      <h3 className="font-semibold text-indigo-900 mb-1">Notificaciones</h3>
                      <p className="text-sm text-indigo-700">Últimas 24h</p>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      Estado del Sistema
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${state.syncStatus.isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                          <span className="font-medium text-gray-900">Estado de Conexión</span>
                        </div>
                        <span className={`font-semibold ${state.syncStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                          {state.syncStatus.isOnline ? 'En línea' : 'Fuera de línea'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-3 text-blue-500" />
                          <span className="font-medium text-gray-900">Última Sincronización</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(state.syncStatus.lastSync).toLocaleTimeString('es-ES')}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-3 text-purple-500" />
                          <span className="font-medium text-gray-900">Cambios Pendientes</span>
                        </div>
                        <span className={`font-semibold ${state.syncStatus.pendingChanges > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {state.syncStatus.pendingChanges}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Database className="h-4 w-4 mr-3 text-green-500" />
                          <span className="font-medium text-gray-900">Promedio Entrega</span>
                        </div>
                        <span className="font-semibold text-green-600">
                          ${stats.avgDeliveryCost} CUP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price Management */}
            {activeSection === 'prices' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl mr-4">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestión de Precios</h2>
                </div>

                <form onSubmit={handlePriceUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Películas (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.moviePrice}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, moviePrice: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Series por Temporada (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.seriesPrice}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, seriesPrice: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recargo por Transferencia (%)
                      </label>
                      <input
                        type="number"
                        value={priceForm.transferFeePercentage}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, transferFeePercentage: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio por Capítulo de Novela (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.novelPricePerChapter}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, novelPricePerChapter: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Actualizar Precios
                  </button>
                </form>

                {/* Current Prices Display */}
                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Precios Actuales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">${state.prices.moviePrice}</div>
                      <div className="text-sm text-gray-600">Películas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">${state.prices.seriesPrice}</div>
                      <div className="text-sm text-gray-600">Series/Temp</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{state.prices.transferFeePercentage}%</div>
                      <div className="text-sm text-gray-600">Recargo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">${state.prices.novelPricePerChapter}</div>
                      <div className="text-sm text-gray-600">Novelas/Cap</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Zones */}
            {activeSection === 'delivery' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Zonas de Entrega</h2>
                </div>

                {/* Add/Edit Form */}
                <form onSubmit={handleDeliveryZoneSubmit} className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingDeliveryZone ? 'Editar Zona' : 'Agregar Nueva Zona'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Zona
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.name}
                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Ej: Nuevo Reparto"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Costo de Entrega (CUP)
                      </label>
                      <input
                        type="number"
                        value={deliveryForm.cost}
                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center"
                    >
                      {editingDeliveryZone ? <Save className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                      {editingDeliveryZone ? 'Actualizar' : 'Agregar'} Zona
                    </button>
                    
                    {editingDeliveryZone && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center"
                      >
                        <X className="h-5 w-5 mr-2" />
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                {/* Zones List */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Zonas Configuradas ({state.deliveryZones.length})
                  </h3>
                  
                  {state.deliveryZones.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No hay zonas de entrega configuradas</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {state.deliveryZones.map((zone) => (
                        <div key={zone.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
                          <div>
                            <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                            <p className="text-sm text-gray-600">
                              Costo: ${zone.cost.toLocaleString()} CUP
                            </p>
                            <p className="text-xs text-gray-500">
                              Creado: {new Date(zone.createdAt).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditDeliveryZone(zone)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteDeliveryZone(zone.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Novels Management */}
            {activeSection === 'novels' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestión de Novelas</h2>
                </div>

                {/* Add/Edit Form */}
                <form onSubmit={handleNovelSubmit} className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingNovel ? 'Editar Novela' : 'Agregar Nueva Novela'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título de la Novela
                      </label>
                      <input
                        type="text"
                        value={novelForm.titulo}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, titulo: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        placeholder="Ej: La Casa de las Flores"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Género
                      </label>
                      <input
                        type="text"
                        value={novelForm.genero}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, genero: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        placeholder="Ej: Drama/Romance"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Capítulos
                      </label>
                      <input
                        type="number"
                        value={novelForm.capitulos}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, capitulos: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Año de Estreno
                      </label>
                      <input
                        type="number"
                        value={novelForm.año}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, año: parseInt(e.target.value) || new Date().getFullYear() }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción (Opcional)
                      </label>
                      <textarea
                        value={novelForm.descripcion}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, descripcion: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        rows={3}
                        placeholder="Descripción breve de la novela..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center"
                    >
                      {editingNovel ? <Save className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                      {editingNovel ? 'Actualizar' : 'Agregar'} Novela
                    </button>
                    
                    {editingNovel && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center"
                      >
                        <X className="h-5 w-5 mr-2" />
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                {/* Novels List */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Novelas Administradas ({state.novels.length})
                  </h3>
                  
                  {state.novels.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No hay novelas administradas</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                      {state.novels.map((novel) => (
                        <div key={novel.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-pink-300 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{novel.titulo}</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
                                {novel.genero}
                              </span>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {novel.capitulos} capítulos
                              </span>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                {novel.año}
                              </span>
                            </div>
                            {novel.descripcion && (
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{novel.descripcion}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              Costo: ${(novel.capitulos * state.prices.novelPricePerChapter).toLocaleString()} CUP
                            </p>
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => startEditNovel(novel)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteNovel(novel.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl mr-4">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Notificaciones del Sistema</h2>
                  </div>
                  
                  {state.notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Limpiar Todo
                    </button>
                  )}
                </div>

                {state.notifications.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                    <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay notificaciones</h3>
                    <p className="text-gray-600">Las notificaciones del sistema aparecerán aquí</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {state.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-xl border-l-4 ${
                          notification.type === 'success' ? 'bg-green-50 border-green-500' :
                          notification.type === 'error' ? 'bg-red-50 border-red-500' :
                          notification.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`p-1 rounded-full mr-3 ${
                                notification.type === 'success' ? 'bg-green-100' :
                                notification.type === 'error' ? 'bg-red-100' :
                                notification.type === 'warning' ? 'bg-yellow-100' :
                                'bg-blue-100'
                              }`}>
                                {notification.type === 'success' && <Check className="h-4 w-4 text-green-600" />}
                                {notification.type === 'error' && <X className="h-4 w-4 text-red-600" />}
                                {notification.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                                {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600" />}
                              </div>
                              <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            </div>
                            <p className="text-gray-700 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>📂 {notification.section}</span>
                              <span>⚡ {notification.action}</span>
                              <span>🕒 {new Date(notification.timestamp).toLocaleString('es-ES')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* System Management */}
            {activeSection === 'system' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-3 rounded-xl mr-4">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestión del Sistema</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Export System */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 p-3 rounded-lg mr-4">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-900">Exportar Sistema Completo</h3>
                        <p className="text-sm text-blue-700">Descargar archivos específicos con configuraciones</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Archivos a exportar:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            CheckoutModal.tsx (con precios actuales)
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            NovelasModal.tsx (con catálogo actual)
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            AdminContext.tsx (con estado completo)
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">Estado actual incluido:</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• {state.deliveryZones.length} zonas de entrega configuradas</li>
                          <li>• {state.novels.length} novelas administradas</li>
                          <li>• Precios sincronizados en tiempo real</li>
                          <li>• Configuración completa del sistema</li>
                        </ul>
                      </div>
                    </div>
                    
                    <button
                      onClick={exportSystemBackup}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Exportar Archivos del Sistema
                    </button>
                  </div>

                  {/* Sync System */}
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-500 p-3 rounded-lg mr-4">
                        <Sync className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-900">Sincronización</h3>
                        <p className="text-sm text-green-700">Estado y sincronización del sistema</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Estado de Conexión</span>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${state.syncStatus.isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                            <span className={`font-semibold ${state.syncStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                              {state.syncStatus.isOnline ? 'En línea' : 'Fuera de línea'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Última Sincronización</span>
                          <span className="text-sm text-gray-600">
                            {new Date(state.syncStatus.lastSync).toLocaleString('es-ES')}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Cambios Pendientes</span>
                          <span className={`font-semibold ${state.syncStatus.pendingChanges > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                            {state.syncStatus.pendingChanges}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSync}
                      disabled={isSyncing}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                    >
                      <Sync className={`h-5 w-5 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? 'Sincronizando...' : 'Sincronizar Ahora'}
                    </button>
                  </div>
                </div>

                {/* System Information */}
                <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gray-600" />
                    Información del Sistema
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stats.totalDeliveryZones + stats.totalNovels}</div>
                        <div className="text-sm text-gray-600">Total Configuraciones</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">${stats.avgDeliveryCost}</div>
                        <div className="text-sm text-gray-600">Promedio Entrega</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stats.totalNovelChapters}</div>
                        <div className="text-sm text-gray-600">Capítulos Totales</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}