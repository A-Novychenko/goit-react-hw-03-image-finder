import axios from 'axios';
const API_KEY = '32549780-8d52bdcb46ac07f381f032420';
// const API_KEY = '------------------';
// const URL =
//   'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';

//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//     this.perPage = 40;
//   }
const BASE_URL = 'https://pixabay.com/api/';
// const BASE_URL = 'https://pixggggabay.com/api/';

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
