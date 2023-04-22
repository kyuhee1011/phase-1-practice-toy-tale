let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Adding each toy to the toy collection div. 
// .card for class

//<div class="card">
//<h2>Woody</h2>
//<img src="[toy_image_url]" class="toy-avatar" />
//<p>4 Likes</p>
//<button class="like-btn" id="[toy_id]">Like ❤️</button>
//</div>

function addToDOM(toy) {
  let card = document.createElement("div")
  card.className = 'card'
  card.innerHTML= `<h2> ${toy.name} </h2>
  <img src = ${toy.image} class="toy-avatar">
  <p>${toy.likes} likes </p>
  <button class="like-btn" id=${toy.id}> Like &#x2665 </button> `

  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('p').textContent= toy.likes + ' likes'
    updateLikes(toy)
  })
  
  document.querySelector("#toy-collection").appendChild(card)

} 
//Fetch GET request
function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => addToDOM(toy)) )
}
getAllToys()

// Add new toy to db.json

function addANewToy(toyObject) {
  fetch('http://localhost:3000/toys', {
    method: "POST",

    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
.then(res => res.json())  
//Now Add toysData to the DOM  
.then(toyData => {
      console.log("this is toydata", toyData)
      addToDOM(toyData)
})     
}    
  )}


// PATCH request should update the new toy (page)

function updateLikes(toyObject) {
  fetch(`http://localhost:3000/toys/${toyObject.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify(toyObject)
  })
  .then(res => res.json()) 
  .then(toyData => console.log(toyData))
}