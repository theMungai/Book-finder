
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
const themeSwitch = document.querySelector(".theme-controls")

function togglingTheme(){
    const lightThemeBtn = document.querySelector(".light-theme-btn");
    const darkThemeBtn = document.querySelector(".dark-theme-btn");

    lightThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");       
    });

    darkThemeBtn.addEventListener("click", () => {
        document.body.classList.remove("light-mode")
    })
}
togglingTheme()