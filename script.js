function fetchBooks(){
    fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((books) => books.forEach((book) => populateBooks(book)))
}
fetchBooks()

const booksGrid = document.querySelector(".books-grid");
booksGrid.innerHTML = ""
function populateBooks(book){
    let bookPoster = document.createElement("li")
    bookPoster.innerHTML = `<img src = "${book.image_url}">`
    booksGrid.appendChild(bookPoster)
    
}