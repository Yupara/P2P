const apiUrl = process.env.REACT_APP_API_URL;

fetch(`${apiUrl}/api/hello`)
  .then(res => res.json())
  .then(data => console.log(data));
