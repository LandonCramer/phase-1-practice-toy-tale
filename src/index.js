let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
addBtn.addEventListener('click', () => {
  //hide and seek with toy form
  addToy = !addToy;
  if(addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none"
  }
})

const fetchToys = () => {
fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(toys => toys.forEach(toyCard))
.catch(error => alert(error))
}

const toyCard = (toy) => {
  const div = document.createElement('div')
  div.className = 'card'
  div.id = `toy-${toy.id}`
  const h2 = document.createElement('h2')
  h2.textContent =  toy.name 
  const img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`
  const button = document.createElement('button')
  button.className = 'like-btn' 
  button.id = toy.id
  button.textContent = 'Like ❤️'
  button.addEventListener('click', event => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method:'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({likes: ++toy.likes})
    })
    .then(res => res.json())
    .then(updatedToy => {
      event.target.parentElement.querySelector("p").textContent = `${updatedToy.likes} Likes`
    })
    .catch(error => alert(error))
  })

  div.append(h2, img, p, button)
  toyCollection.append(div)
}

const addNewToy = (e) => {
  e.preventDefault()
  const name = e.target.name.value
  const image = e.target.image.value
  if(name.trim() && image.trim()) {
    fetch('http://localhost:3000/toys', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name, image,likes:0 })
    })
    .then(res => res.json())
    .then(newToyCreated => {
      toyCard(newToyCreated)
      e.target.reset()
    })
    .catch(error => alert(error))
  } else {
    alert("please fill out the whole form")
  }}


addToyForm.addEventListener('submit',addNewToy)
fetchToys()