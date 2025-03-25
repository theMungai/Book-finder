function fetchBooks(){
    fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((data) => console.log(data))
}
fetchBooks()