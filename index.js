document.addEventListener("DOMContentLoaded",function(){
  let currentPage = 1
  createForm()
  getAllMonsters()
  turnPageForward(currentPage)
})



function getAllMonsters(currentPage){
  let monsterContainer = document.querySelector('#monster-container')
  monsterContainer.innerHTML = ""
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
  .then(response=>(response.json()))
  .then(JsonData =>{
    JsonData.forEach((monster)=>{
      displayMonster(monster)
    })
  })
}


function turnPageForward(currentPage){
  document.querySelector('#forward').addEventListener('click',function(){
      currentPage ++
      console.log(`${currentPage}`)
      getAllMonsters(currentPage)
      return currentPage
    })
      document.querySelector('#back').addEventListener('click',function(){
        if (currentPage > 1){
        currentPage --
        console.log(`${currentPage}`)
        getAllMonsters(currentPage)
        return currentPage
      } else{
        alert("No more monsters")
      }
  })
}


function displayMonster(monster){
  console.log('success')
  let monsterContainer = document.querySelector('#monster-container')
  let monsterDiv = document.createElement('div')
  let monsterName = document.createElement('h1')
  let monsterAge = document.createElement('h4')
  let monsterBio = document.createElement('p')

  monsterContainer.appendChild(monsterDiv)

  monsterName.innerText = monster.name
  monsterDiv.appendChild(monsterName)

  monsterAge.innerText = `Age: ${monster.age}`
  monsterDiv.appendChild(monsterAge)

  monsterBio.innerText = `Bio: ${monster.description}`
  monsterDiv.appendChild(monsterBio)
}


function createForm(){
  let createMonster = document.querySelector('#create-monster')
  let monsterForm = document.createElement("form");
  monsterForm.setAttribute('method',"post");
  monsterForm.setAttribute('action',"submit.php");


  let inputName = document.createElement("input");
  inputName.setAttribute('type',"text");
  inputName.setAttribute('name',"name");
  inputName.id = 'name'
  inputName.placeholder = 'name'


  let inputAge = document.createElement("input");
  inputAge.setAttribute('type',"text");
  inputAge.setAttribute('age',"age");
  inputAge.id = 'age'
  inputAge.placeholder = 'age...'

  let inputBio = document.createElement("input");
  inputBio.setAttribute('type',"text");
  inputBio.setAttribute('bio',"bio");
  inputBio.id = 'description'
  inputBio.placeholder = 'description...'

  let submit = document.createElement("input");
  submit.setAttribute('type',"submit");
  submit.setAttribute('value',"Create Monster");

  createMonster.appendChild(monsterForm);
  monsterForm.appendChild(inputName);
  monsterForm.appendChild(inputAge);
  monsterForm.appendChild(inputBio);
  monsterForm.appendChild(submit);

  let form = document.querySelector('form')

  form.addEventListener('submit', function(e){
    e.preventDefault()
    createNewMonster(inputName.value, inputAge.value, inputBio.value)
  })

}
function createNewMonster(name, age, bio){
  fetch('http://localhost:3000/monsters', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: bio
      })
    }).then(res => res.json())
    .then(monster => {
      displayMonster(monster)
    })
}
