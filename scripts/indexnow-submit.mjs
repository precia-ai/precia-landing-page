#!/usr/bin/env node
// Pings IndexNow (Bing/Yandex/Naver) with current site URLs. Best-effort, non-blocking.
const host = 'precia.site';
const key = '749ba0fbb07d6a0051e445212423f5dd';
const keyLocation = `https://${host}/${key}.txt`;
const urlList = [
  `https://${host}/id`,
  `https://${host}/en`,
  `https://${host}/id/modul/ai-ecg`,
  `https://${host}/en/modul/ai-ecg`,
  `https://${host}/id/modul/ai-boo`,
  `https://${host}/en/modul/ai-boo`,
  `https://${host}/id/privacy`,
  `https://${host}/en/privacy`,
  `https://${host}/id/terms`,
  `https://${host}/en/terms`,
];

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

console.log(`IndexNow submit: HTTP ${res.status}`);
if (!res.ok) {
  const text = await res.text().catch(() => '');
  console.log(text);
}
