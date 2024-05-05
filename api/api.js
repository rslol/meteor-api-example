import { fetch, Headers } from 'meteor/fetch';

export async function getData(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json(); 
    return data;
  } catch (e) {
    return e;
  }
}