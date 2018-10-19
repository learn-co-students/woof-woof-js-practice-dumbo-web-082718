// document.addEventListener("DOMContentLoaded", ()=>{
// 	const dogDiv = document.querySelector("#dog-bar")
// 	dogDiv.addEventListener("click", dogInfo)
// 	fetchDogs()


// 	function fetchDogs() {
// 		fetch("http://localhost:3000/pups")
// 		.then(resp=>resp.json())
// 		.then(listDogs)
// 	}

// 	function listDogs(dogs) {
// 		dogs.forEach(dog => {
// 			dogDiv.innerHTML += (`<span data-id=${dog.id} data-name=${dog.name} data-isGoodDog=${dog.isGoodDog} data-img=${dog.image}>${dog.name}</span>`)
// 		})
		
// 	}

// 	function dogInfo(event) {
// 		// debugger
// 		const pupInfo = document.querySelector("#dog-info")
// 		// debugger
// 		pupInfo.innerHTML = (event.target.dataset.name)
// 		pupInfo.innerHTML = (event.target.dataset.img)
// 		// pupInfo.innerHTML = (event.target.dataset.isgooddog)


// 		console.dir(event.target.dataset)
// 	}

// })

document.addEventListener("DOMContentLoaded", ()=>{
	const dogBar = document.getElementById("dog-bar")
	const dogInfoDiv = document.querySelector("#dog-info")
	fetchDogs()


	function fetchDogs() {
		fetch("http://localhost:3000/pups")
		.then(resp=>resp.json())
		.then(listDogs)
	}

	function listDogs(dogs){
		dogs.forEach(addToDogBar)

	}

	function addToDogBar(dog){
		const span = document.createElement("span")
		span.innerText = dog.name
		span.setAttribute("data-id", dog.id)
		span.addEventListener("click", showDogInfo)
		dogBar.append(span)

	}

	function showDogInfo(event){
		const dogId = event.target.dataset.id
		console.log(dogId)
		fetch(`http://localhost:3000/pups/${dogId}`)
		.then(resp=>resp.json())
		.then(dog=>{
			const goodOrBad = dog.isGoodDog ? "Good dog!" : "Bad dog!"
			dogInfoDiv.innerHTML=(`<h2>${dog.name}<h2> <img src="${dog.image}"> <p><button data-id=${dog.id}>${goodOrBad}</button></p>`)
			const button = dogInfoDiv.querySelector("button")
			button.addEventListener("click", toggleDog) 

		})
		// console.log(event.target)
	}

	function toggleDog(event){
		const goodOrBad = event.target.innerText.slice(0, -5)
		const isGoodDog = goodOrBad === "Good" ? true : false
		const newStatus = isGoodDog? "Bad dog!" : "Good dog!"
		const dogId = event.target.dataset.id

		fetch(`http://localhost:3000/pups/${dogId}`, {
			method: "PATCH",
			body: JSON.stringify({isGoodDog: !isGoodDog}),
			headers: {"Content-Type": "application/json"}
		})
		.then(resp=>resp.json())
		event.target.innerText = newStatus
	}



})