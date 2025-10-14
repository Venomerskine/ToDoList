// storage.js
export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearData(key) {
  localStorage.removeItem(key);
}
