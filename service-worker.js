// service-worker.js - Service Worker pour PWA Action ou Vérité
const CACHE_NAME = 'truth-dare-v1.0.2';
const urlsToCache = [
  './',
  './index.html',
  './css.css',
  './script.js',
  './script2.js',
  './data.js',
  './manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installation');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Tous les fichiers sont en cache');
        // Force l'activation immédiate
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Erreur lors de la mise en cache:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activation');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Supprime les anciens caches
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activé');
      // Prend le contrôle immédiatement
      return self.clients.claim();
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', event => {
  // Ignore les requêtes non-HTTP
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  // Ignore les requêtes vers des domaines externes (CDN, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  console.log('[SW] Requête interceptée:', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne la version en cache si elle existe
        if (response) {
          console.log('[SW] Servir depuis le cache:', event.request.url);
          return response;
        }
        
        // Sinon, fait la requête réseau
        console.log('[SW] Récupération réseau:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Vérifie que la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone la réponse pour la mettre en cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('[SW] Fichier mis en cache:', event.request.url);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[SW] Erreur réseau:', error);
            
            // Retourne une page d'erreur hors ligne si disponible
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
            
            // Pour les autres ressources, retourne une réponse d'erreur
            return new Response('Ressource non disponible hors ligne', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Gestion des messages depuis l'application
self.addEventListener('message', event => {
  console.log('[SW] Message reçu:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting demandé');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: CACHE_NAME
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[SW] Nettoyage du cache demandé');
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({
        type: 'CACHE_CLEARED'
      });
    });
  }
});

// Synchronisation en arrière-plan (pour les futures fonctionnalités)
self.addEventListener('sync', event => {
  console.log('[SW] Sync event:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Ici on pourrait synchroniser les données de jeu
      // Par exemple, envoyer des statistiques ou sauvegarder des parties
      console.log('[SW] Synchronisation en arrière-plan')
    );
  }
});

// Gestion des notifications push (pour les futures fonctionnalités)
self.addEventListener('push', event => {
  console.log('[SW] Push reçu:', event);
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nouvelle notification du jeu Action ou Vérité',
      icon: './icon-192.png',
      badge: './icon-72.png',
      vibrate: [100, 50, 100],
      data: data,
      actions: [
        {
          action: 'open',
          title: 'Ouvrir le jeu',
          icon: './icon-72.png'
        },
        {
          action: 'close',
          title: 'Fermer'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('Action ou Vérité', options)
    );
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification cliquée:', event);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('./')
    );
  }
});

// Partage de fichiers (pour les futures fonctionnalités)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Gestion du partage de configurations de jeu
  if (url.pathname === '/share' && event.request.method === 'POST') {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        const configFile = formData.get('config');
        
        if (configFile) {
          // Traite le fichier de configuration partagé
          console.log('[SW] Configuration partagée reçue');
          
          return new Response('Configuration importée avec succès', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
        
        return new Response('Erreur lors de l\'import', { status: 400 });
      })()
    );
  }
});

// Gestion de la mise à jour automatique
self.addEventListener('updatefound', () => {
  console.log('[SW] Mise à jour trouvée');
  
  const newWorker = self.registration.installing;
  
  newWorker.addEventListener('statechange', () => {
    if (newWorker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
        console.log('[SW] Nouvelle version disponible');
        
        // Notifie l'application qu'une mise à jour est disponible
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'UPDATE_AVAILABLE'
            });
          });
        });
      } else {
        console.log('[SW] Application prête pour utilisation hors ligne');
      }
    }
  });
});

// Nettoyage périodique du cache (évite qu'il grossisse trop)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.keys().then(requests => {
          // Garde seulement les 50 dernières entrées
          if (requests.length > 50) {
            const toDelete = requests.slice(50);
            return Promise.all(
              toDelete.map(request => cache.delete(request))
            );
          }
        });
      })
    );
  }
});

// Log de démarrage
console.log('[SW] Service Worker chargé, version:', CACHE_NAME);