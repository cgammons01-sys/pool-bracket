const C='pb-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.add('./index.html')).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp)).catch(()=>{});return r;}).catch(()=>caches.match('./index.html')));
  }
});