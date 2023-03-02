const API_KEY = '32549780-8d52bdcb46ac07f381f032420';
// const URL =
//   'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImage = (keyword, page) => {
  return fetch(
    `${BASE_URL}?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`"${keyword}" не знайдено`));
  });
};
