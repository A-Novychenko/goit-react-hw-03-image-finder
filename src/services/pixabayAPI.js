import axios from 'axios';
const API_KEY = '32549780-8d52bdcb46ac07f381f032420';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImage(keyword, page) {
  try {
    return await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: keyword,
        image_type: 'photo',
        page: page,
        per_page: 12,
      },
    });
  } catch (err) {
    return err;
  }
}
