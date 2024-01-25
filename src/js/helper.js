import { TIMEOUT_TIME } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, sentData = '') {
  try {
    const fetchVal = !sentData
      ? fetch(url)
      : fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sentData),
        });
    const res = await Promise.race([fetchVal, timeout(TIMEOUT_TIME)]);
    const data = await res.json();
    if (!res.ok) throw new Error('can not find wat u looking to');
    return data;
  } catch (err) {
    throw err;
  }
};
