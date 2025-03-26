
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


// Email API
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

// Customize footer to update current year
function footerYear(){
    const currentYear = document.querySelector(".footer-current-year");
    currentYear.textContent = new Date().getFullYear()
}
footerYear()

// Toogling Filter Button

// Programming Search button

// Creating book details dynamically