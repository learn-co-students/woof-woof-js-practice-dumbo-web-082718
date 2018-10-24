document.addEventListener("DOMContentLoaded",()=>{
  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector('#dog-info')
  const url = 'http://localhost:3000/pups'
  getDogs()

  function getDogs(){
    fetch(url).then(res=>res.json())
    .then(dogs=>dogs.forEach(showDogInDogBar))
  }

  function showDogInDogBar(dog){
    const span = document.createElement('span')
    span.innerText = dog.name
    span.id = dog.id
    span.addEventListener('click', handleClick)
    dogBar.append(span)
  }

  function handleClick(event){
    const id = event.target.id
    fetch(`${url}/${id}`).then(res=> res.json())
    .then(showSingleDog)
  }

  function showSingleDog(dog){
    const dogStatus = dog.isGoodDog? "Good Dog!": "Bad Dog!"
    dogInfo.innerHTML =
    `<img src=${dog.image}></img>
    <h2>${dog.name}</h2>
    <button id= "status-button" data-id= ${dog.id} data-status=${dogStatus}>${dogStatus}</button>`
    const button = document.querySelector("#status-button")
    button.addEventListener('click', toggleStatus)

  }

  function toggleStatus(event){
    const id = event.target.dataset.id
    const status = event.target.dataset.status
    const patchIsGoodDog = status==="Good"? false:true
    patchDogStatus(patchIsGoodDog, id)
    .then(res=>res.json())
    .then(showSingleDog)
  }

  function patchDogStatus(patchIsGoodDog, id){
    const options = {
      method: "PATCH",
      body: JSON.stringify({isGoodDog:patchIsGoodDog}),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
    return fetch(`${url}/${id}`, options)
  }




})
