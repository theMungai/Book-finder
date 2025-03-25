
// Fetch Books
function fetchBooks(){
    fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((books) => books.forEach((book) => populateBooks(book)))
}
fetchBooks()


// Display Books to the DOM
const booksGrid = document.querySelector(".books-grid");
booksGrid.innerHTML = ""
function populateBooks(book){
    let bookPoster = document.createElement("li")
    bookPoster.classList.add("list-item")
    bookPoster.innerHTML = `<img src = "${book.image_url}">`
    booksGrid.appendChild(bookPoster)
    
}

// Light and Dark theme controls
let lightMode = localStorage.getItem("lightMode")
const themeSwitch = document.querySelector(".theme-controls")

function enableLightMode(){
    document.body.classList.add("light-mode")
    localStorage.setItem("lightMode", "active")
}

function disableLightMode(){
    document.body.classList.remove("light-mode")
    localStorage.setItem("lightMode", "null")
}

if(lightMode === "active"){
    enableLightMode()
}

themeSwitch.addEventListener("click", () => {
    lightMode = localStorage.getItem("lightMode")
    if(lightMode !== "active"){
        enableLightMode()
    }
    else{
        disableLightMode()
    }
})
