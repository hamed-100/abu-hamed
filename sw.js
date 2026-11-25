/* ابو حامد - service worker (v1.0.94) */
const CACHE='abuhamed-1.0.94';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin)return; /* فايربيز وغيره يعدّوا من غير تدخل */
  e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
