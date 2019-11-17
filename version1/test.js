'use strict';
// VERSION 1

// 1.
// Write a function that:
// - Logs to the console numbers 1 to 100.
// - However, if the number is a multiple of 3 it should log to the console "This is a multiple of 3"
// - If it's a multiple of 5 it should log "This is a multiple of 5"
// - If it's a multiple of both 3 and 5 it should log "Jackpot!"
// - Otherwise, it should just log the number
// Hint: use the modulo operator (%) to figure out if it's a multiple of 3/5. Make sure the remainder is 0, in order to pass the condition.
// Hint: the order of conditional statements is important!

function logNumbers1to100() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log('Jackpot!');
    } else if (i % 5 === 0) {
      console.log(i + ': This is a multiple of 5');
    } else if (i % 3 === 0) {
      console.log(i + ': This is a multiple of 3');
    } else {
      console.log(i);
    }
  }
}

logNumbers1to100();

// 2.
// Using JavaScript only (adding HTML to index.html is NOT allowed), write a function that:
// - Creates a button element (with text "click me!")
// - Creates an empty image element and add it to the document.
// - Inserts an image URL into the <img> tag, when the button is clicked
// - Removes the button after the click
// - Use the following image URL: https://thehub.dk/files/5ad4b4a9f9ac4aa13c3d2d58/logo_upload-6d537cf7e5de664db275b32b3c6ae12d.png

const button = document.createElement('button');
button.textContent = 'click me!';
document.body.appendChild(button);
button.addEventListener('click', () => {
  document.body.removeChild(button);
  const image = document.createElement('img');
  image.setAttribute(
    'src',
    'https://thehub.dk/files/5ad4b4a9f9ac4aa13c3d2d58/logo_upload-6d537cf7e5de664db275b32b3c6ae12d.png',
    // !!! Note :The url doesn't get any image !!!
  );
  image.setAttribute('alt', 'img.png');
  document.body.appendChild(image);
});

// 3.
// Write a function that:
// - Makes an API call using the Fetch API or the regular XMLHttpRequest
// - Use the following API: https://randomuser.me/api?results=3
// - Parse the response and then display the "first" and "last" names of the first three users within the DOM (inside an unordered list)

function fetchJSON(url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('error!!!');
    }
  });
}

console.log(fetchJSON('https://randomuser.me/api?results=3'));

function main(url) {
  return fetchJSON(url)
    .then(response => response.results)
    .then(users => {
      console.log(users);
      const unorderedList = document.createElement('ul');
      document.body.appendChild(unorderedList);
      users.forEach((user, index) => {
        if (index < 3) {
          const listItem = document.createElement('li');
          unorderedList.appendChild(listItem);
          listItem.textContent = user.name.first + ' ' + user.name.last;
        }
      });
    })
    .catch(err => {
      const div = document.createElement('div');
      div.textContent = err.message;
      document.body.appendChild(div);
    });
}

window.onload = () => main('https://randomuser.me/api?results=3');
