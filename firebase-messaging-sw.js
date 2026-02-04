self.addEventListener('push', function (event) {
  console.log('🔥 PUSH EVENT MASUK');

  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Push data bukan JSON');
    }
  }

  const title = data.title || 'Promo Shopee';
  const options = {
    body: data.body || '',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
    data: {
      url: data.link || 'https://shopee.co.id'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
