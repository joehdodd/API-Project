$('document').ready(function () {

  const form = document.getElementById('searchForm');
  const searchCon = document.getElementById('searchContainer');
  const searchText = document.getElementById('searchField');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          let results = response.albums.items;
          let responseHTML = `<div id="searchContainer" class="container gallery">`
          for (let i = 0; i < results.length; ++i) {
            let albumName = results[i].name;
            let albumImage = results[i].images[0].url;
            responseHTML += `<div class="flex">
                               <a href="` +albumImage+ `" data-lightbox="gallery" data-title="` +albumName+ `">
                               <img class="gallery-item" src="` +albumImage+ `" title="` +albumName+ `"></a>
                             </div>`;
          }
          responseHTML += `</div>`
          searchCon.innerHTML = responseHTML;
          console.log(response);
        }
      }
    };
    let searchQuery = '?q='+searchText.value+'&type=album&limit=8';
    xhr.open('GET', 'https://api.spotify.com/v1/search'+searchQuery);
    xhr.send();
  }); // end submit
}); // end ready
