document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('#searchForm');
  const searchQueryInput = document.querySelector('#searchQuery');
  const searchResultsDiv = document.querySelector('#searchResults');
  const articleListDiv = document.querySelector('#articleList');
  const API = 'https://floating-garden-87548-1a3894439e99.herokuapp.com'
  let searchTimeout;

  function fetchAndDisplayArticles() {
    fetch(`${API}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {

        if (data.length > 0) {
          articleListDiv.innerHTML = '<h2>Articles</h2>';
          data.forEach(article => {
            articleListDiv.innerHTML += `<p>${article.title}</p>`;
          });
        } else {
          articleListDiv.innerHTML = '<p>No articles found.</p>';
        }
      })
      .catch(error => console.error('Error:', error));
  }

  fetchAndDisplayArticles();

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchQueryInput.value.trim();

    if (query.length > 0) {
      sendSearchQuery(query);
      sendArticleQuery(query);
    }
  });

  searchQueryInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function () {
      const query = searchQueryInput.value.trim();

      if (query.length > 0) {
        sendSearchQuery(query);
        sendArticleQuery(query);
      }
    }, 150);
  });

  function sendSearchQuery(query) {
    fetch(`${API}/searches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }

  function sendArticleQuery(query) {
    fetch(`${API}/articles/search?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {

        searchResultsDiv.innerHTML = '';

        if (data.length > 0) {
          articleListDiv.innerHTML = '<h2>Articles</h2>';
          data.forEach(article => {
            articleListDiv.innerHTML += `<p>${article.title}</p>`;
          });
        } else {
          articleListDiv.innerHTML = '<p>No articles found.</p>';
        }
      })
      .catch(error => console.error('Error:', error));
  }

});
