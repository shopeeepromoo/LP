importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD_zJ9VxNeNZCBwaXpzgHbbfmw3Ymj5QTA",
    authDomain: "shopee-promo.firebaseapp.com",
    projectId: "shopee-promo",
    storageBucket: "shopee-promo.firebasestorage.app",
    messagingSenderId: "526441713326",
    appId: "1:526441713326:web:4ba5bb996f44e98bc5673f"
});

const messaging = firebase.messaging();

// Menangani notifikasi saat browser di latar belakang
messaging.onBackgroundMessage((payload) => {
  console.log('Notifikasi masuk di background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
    image: payload.notification.image || '', // Gambar produk jika ada
    data: {
      url: payload.data.url // Link affiliate
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Logika ketika notifikasi diklik
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // Ambil URL dari payload atau default ke Shopee
  const targetUrl = event.notification.data.url || 'https://shopee.co.id';

  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
