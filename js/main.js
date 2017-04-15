$('document').ready(function () {

  const form = document.getElementById('searchForm');
  const searchCon = null;
  let searchText = document.getElementById('searchField');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          let results = response.albums.items;
          for (let i = 0; i < results.length; ++i) {
            let responseHTML = `<div class="col">`;
            let albumImage = results[i].images[0].url;
            let albumName = results[i].name;
            let albumURL = results[i].external_urls.spotify;
            let albumArtist = results[i].artists[0].name;
            let link = `<a href="` +albumImage+ `"` +` data-lightbox="gallery" data-title="` +albumName+ `">`;
            responseHTML += link;
            let img = `<img class="gallery-item" src="`+albumImage+ `"` +`title="Album Cover">`;
            responseHTML += img;
            responseHTML += `</a>`
            responseHTML += `</div>`;
            document.getElementById('searchContainer').innerHTML = responseHTML;
          }
          console.log(response);
        }
      }
    };
    let searchQuery = '?q='+searchText.value+'&type=album&limit=12';
    xhr.open('GET', 'https://api.spotify.com/v1/search'+searchQuery);
    xhr.send();
  });// end submit
}); // end ready
