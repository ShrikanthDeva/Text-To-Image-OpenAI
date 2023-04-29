import './style.css';

const form = document.querySelector('form');

// listens when user clicks submit
form.addEventListener('submit', async (e) => {
    // prevent page from reloading 
    e.preventDefault();
    showSpinner()
    //extract the data
    const data = new FormData(form);
    // fetch api for calling the backend
    const response = await fetch('http://localhost:8080/dream', {
      // http method
      method: 'POST',
      // headers stating the format
      headers: {
        'Content-Type': 'application/json',
      },
      // body with the json format of the prompt
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });
    
    if (response.ok) {
      //  getting the image from the response of fetchapi
      const { image } = await response.json();
      // inserting the image in the page
      const result = document.querySelector('#result');
      result.innerHTML = `<img src="${image}" width="512" />`;
    } else {
      const err = await response.text();
      alert(err);
      console.error(err);
    }

    hideSpinner();

});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}
