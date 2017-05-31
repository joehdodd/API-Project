$('document').ready(function () {

  const form = document.getElementById('searchForm');
  const searchCon = document.getElementById('searchContainer');
  const searchText = document.getElementById('searchField');
  const err = document.getElementById('error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          let results = response.data;
            let responseHTML = `<div class="container">`;
            for (let i = 0; i < results.length; ++i) {
              let resultsImage = results[i].images.fixed_width.url;
              let lightbboxImage = results[i].images.original.url;
              let gifURL = results[i].url;
              responseHTML += `<div class="flex">
                                 <a href="` +lightbboxImage+ `" data-lightbox="gallery"><img class="gallery-item" src="` +resultsImage+ `"></a>
                                 <a class="spotLink" href="`+ gifURL+`" target="_blank">On Giphy</a>
                               </div>`;
              }
            responseHTML += `</div>`;
            searchCon.innerHTML = responseHTML;
            console.log(response);
        }
      }
    };
    let searchQuery = '?q='+searchText.value+'&api_key=dc6zaTOxFJmzC&limit=16';
    xhr.open('GET', 'http://api.giphy.com/v1/gifs/search'+searchQuery);
    xhr.send();
  }); // end submit
}); // end ready
