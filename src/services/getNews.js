export default function GetNews(value,page){
  return fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${value}&page=${page}`)
  .then(response => response.json())
  .then(data => data);
}