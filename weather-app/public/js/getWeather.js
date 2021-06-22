console.log('Client side Javascript file is loaded!');


const form = document.querySelector('input');
const search = document.querySelector('button')
const cardHeader = document.querySelector('.card-header');
const cardText = document.querySelector('.card-text');
const card = document.getElementById('card');

search.addEventListener('click', (e) => {
  const location = form.value;
  e.preventDefault();
  fetch(`/weather?address=${location}!`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        form.placeholder = `${data.error}`
      } else {
        card.style.opacity = '100%'
        cardHeader.innerHTML = `${data.location}`;
        cardText.innerHTML = `${data.forecast}`;
        console.log(data.forecast);
      }
    });
  });
});