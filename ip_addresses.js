document.addEventListener('DOMContentLoaded', function () {
  const ipListDiv = document.querySelector('#ipList');
  const ipDetailsDiv = document.querySelector('#ipDetailsDiv');
  const API = 'https://floating-garden-87548-1a3894439e99.herokuapp.com'

  function fetchAndDisplayIPAddresses() {
    fetch(`${API}/ip`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {

        if (data.ip_addresses.length > 0) {
          ipListDiv.innerHTML = '<h4>IP Addresses</h4>';
          data.ip_addresses.forEach(ip => {
            const ipButton = document.createElement('button');
            ipButton.textContent = ip;
            ipButton.classList.add('btn', 'btn-primary', 'mr-2', 'mb-2');
            ipButton.addEventListener('click', function () {
              sendShowRequest(ip);
            });
            ipListDiv.appendChild(ipButton);
          });
        } else {
          ipListDiv.innerHTML = '<p>No IP addresses found.</p>';
        }
      })
      .catch(error => console.error('Error:', error));
  }

  fetchAndDisplayIPAddresses();

  function sendShowRequest(ip) {
    const url = `${API}/searches/${ip}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {

        ipDetailsDiv.innerHTML = `<h3>Details for IP Address: ${data.ip}</h3>`;
        
        data.searches.sort((a, b) => b.search_count - a.search_count);
        if (data.searches.length > 0) {
          const table = document.createElement('table');
          table.classList.add('table', 'table-bordered', 'table-striped', 'mt-3');
        
          table.innerHTML = `
            <thead class="thead-dark">
              <tr>
                <th>Query</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              ${data.searches.map(entry => `<tr><td>${entry.query}</td><td>${entry.search_count}</td></tr>`).join('')}
            </tbody>
          `;
        
          ipDetailsDiv.appendChild(table);
        
          const hideButton = document.createElement('button');
          hideButton.textContent = 'Hide Analytics';
          hideButton.classList.add('btn', 'btn-secondary', 'mt-3');
        
          hideButton.style.marginTop = '1rem';
        
          hideButton.addEventListener('click', function () {
            ipDetailsDiv.innerHTML = '';
          });
        
          ipDetailsDiv.appendChild(hideButton);
        } else {
          const noDetailsMessage = document.createElement('p');
          noDetailsMessage.textContent = 'No details found for this IP address.';
          ipDetailsDiv.appendChild(noDetailsMessage);
        }
      })
      .catch(error => console.error('Error:', error));
  }
});
