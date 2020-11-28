function itemHtml(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

let ourHtml = items.map((item) => {
    return itemHtml(item)
}).join('')

document.getElementById("item-list").insertAdjacentHTML("beforeend" , ourHtml)

let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit" , (e) => {
    e.preventDefault()
    axios.post("/create-item" , {text : createField.value}).then((response) => {
        document.getElementById("item-list").insertAdjacentHTML("beforeend" , itemHtml(response.data))
        createField.value = ""
        createField.focus()
    }).catch(() => console.log("try again later"))
})


document.body.addEventListener("click" , (e) => {
    
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Do you really want to delete it!?")) {
            axios.post("/delete-item" , {id : e.target.getAttribute("data-id")}).then(() => {
            e.target.parentElement.parentElement.remove()
            }).catch(() => console.log("try again later"))
        }
    }

    if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Enter your new item" , e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if (userInput) {
            axios.post("/update-item" , {text: userInput , id : e.target.getAttribute("data-id")}).then(() => {
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(() => console.log("try again later"))
        }
    }
})