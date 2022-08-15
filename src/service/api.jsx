import axios from 'axios';
export default async function ApiPictures(searchQuery, page) {
  const result = await axios(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=27044833-133d6955f6c123c385198885a&image_type=photo&orientation=horizontal&per_page=12`
  );
  return result.data;
}
