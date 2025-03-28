
// Fetch Books
function fetchBooks(){
    fetch("https://book-finder-8ady.onrender.com/books")
    .then((response) => response.json())
    .then((books) =>  populateBooks(books));
    
}
fetchBooks()


// Display Books to the DOM
const booksGrid = document.querySelector(".books-grid");
booksGrid.innerHTML = ""
function populateBooks(books){
    books.forEach((book => {
        let bookPoster = document.createElement("li")
        bookPoster.classList.add("list-item")
        bookPoster.innerHTML = `<img src = "${book.image_url}">`
        bookPoster.addEventListener("click", () => {
            bookDetails(book)
        })
        booksGrid.appendChild(bookPoster)
    }))
    
    handleSearchBar(books)
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



// Customize footer to update current year
function footerYear(){
    const currentYear = document.querySelector(".footer-current-year");
    currentYear.textContent = new Date().getFullYear()
}
footerYear()

// Programming Search button
const resultsBox = document.querySelector(".result-box");
const searchInput = document.querySelector(".search-bar");
function handleSearchBar(books){

    // Event listener for the input
    searchInput.addEventListener("keyup", () => {
        let result = [];
        let input = searchInput.value

        if(input.length){
             result = books.filter((book) => {
                return book.name.toLowerCase().includes(input.toLowerCase())
            });
            resultsBox.innerHTML = '';
            
            result.forEach((book) => {
                let searchedItem = document.createElement("li")
                searchedItem.textContent = book.name;
                searchedItem.classList.add("searched-item")
                searchedItem.addEventListener("click", () => {
                    selectSearchedItem(searchedItem)
                })
                resultsBox.appendChild(searchedItem)
            })          
        }
        else{
            resultsBox.innerHTML = ""
        }
        
        
        // Search button event listener
        const searchButton = document.querySelector(".search-button")
        searchButton.addEventListener("click", () => {
            books.forEach((book) => {
                searchButtonFun(book)
            })
        })
    })
    
}

function selectSearchedItem(list){
    searchInput.value = list.innerHTML;
    resultsBox.innerHTML = ""
}

function searchButtonFun(book){
    if(searchInput.value === book.name){
        bookDetails(book)
    }
    
}


// Creating book details dynamically
const mainHTML = document.querySelector("main")
// mainHTML.innerHTML = ""

// function bookDetails(book){
//     let main = `
//         <section class="dynamically-generated-div">
//             <div class="after-search-redirect">
//                 <button class="take-me-back-button">
//                     <i class="fa-solid fa-arrow-left-long"></i>
//                     ${book.name}
//                 </button>

//                 <div class="book-full-details">
//                     <div class="book-cover">
//                         <img src="${book.image_url}" alt="">
//                     </div>
//                     <div class="book-full-info">
//                         <div class="book-header">
//                             <p class="home-books-header">${book.name}</p>
//                             <p class="author">${book.author}</p>
//                         </div>

//                         <div class="comments-and-likes-stats">
//                             <p class="comment-stats">
//                                 <i class="fa-solid fa-comment"></i>
//                                 ${book.comments} Comments
//                             </p>
//                         </div>
//                         <hr>
//                         <div class="full-book-description">
//                             <p>${book.description}</p>
//                         </div>

//                         <div class="book-detailed-info-container">
//                             <div class="book-detailed-info">
//                                 <p>Categories</p>
//                                 <p class="details-separator">:</p>
//                                 <p class="detailed-answer">${book.categories}</p>
//                             </div>

//                             <div class="book-detailed-info">
//                                 <p>Year of Publication</p>
//                                 <p class="details-separator">:</p>
//                                 <p class="detailed-answer">${book.year_of_publication}</p>
//                             </div>

//                             <div class="book-detailed-info">
//                                 <p>Pages</p>
//                                 <p class="details-separator">:</p>
//                                 <p class="detailed-answer">${book.number_of_pages}</p>
//                             </div>

//                             <div class="book-detailed-info">
//                                 <p>Language</p>
//                                 <p class="details-separator">:</p>
//                                 <p class="detailed-answer">${book.language}</p>
//                             </div>
                            
                            
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <section class="comment-section">
//                 <div class="comment-keeper">
//                     <div class="user-info-and-time">                    
//                             <p class="user-name">Anonymous</p>
//                             <p class="comment-time">8 days ago</p>                    
//                     </div>
//                     <div class = "commentHouse">
//                         <p class = "comment-container"> ${book.commentPost} </p>
//                     </div>
//                 </div>
//                 <div class="comment-user-input">
//                     <input type="text" class="comment-input" placeholder="Add a comment">
//                     <div class="comment-buttons">
//                         <button class="cancel-button">Cancel</button>
//                         <button class="comment-button" disabled>Comment</button>
//                     </div>
//                 </div>
//             </section>
//         </section>
//     `

//     mainHTML.innerHTML = main

//     const commentButton = document.querySelector(".comment-button");
//     const commentInput = document.querySelector(".comment-input");

//     // Comment button eventHandler
//     commentButton.addEventListener("click", () => {
//         commentCount()
//         // console.log("Clicked");
        
//     })

//     // Refresh Page functionality
//     function refreshPage(){
//         document.querySelector(".take-me-back-button").addEventListener("click", () => {
//             window.location.reload(true)   
//         })
        
//     }
//     refreshPage()

//     // Handle comment section functionality
    

//     function handleComments() {
//         const inputValue = commentInput.value;

//         if (inputValue !== "") {
//             commentButton.classList.add("activate-comment-button");
//             commentButton.disabled = false;
//         } else {
//             commentButton.disabled = true;
//             commentButton.classList.add("deactivate-comment-button");
//         }
//     }

//     commentInput.addEventListener('input', () => {
//         handleComments()
//     });


// }

function bookDetails(book) {
    // Ensure book.commentPost is an array before using map
    const comments = Array.isArray(book.commentPost) ? book.commentPost : [];

    let main = `
        <section class="dynamically-generated-div">
            <div class="after-search-redirect">
                <button class="take-me-back-button">
                    <i class="fa-solid fa-arrow-left-long"></i>
                    ${book.name}
                </button>

                <div class="book-full-details">
                    <div class="book-cover">
                        <img src="${book.image_url}" alt="">
                    </div>
                    <div class="book-full-info">
                        <div class="book-header">
                            <p class="home-books-header">${book.name}</p>
                            <p class="author">${book.author}</p>
                        </div>

                        <div class="comments-and-likes-stats">
                            <p class="comment-stats">
                                <i class="fa-solid fa-comment"></i>
                                ${book.comments} Comments
                            </p>
                        </div>
                        <hr>
                        <div class="full-book-description">
                            <p>${book.description}</p>
                        </div>

                        <div class="book-detailed-info-container">
                            <div class="book-detailed-info">
                                <p>Categories</p>
                                <p class="details-separator">:</p>
                                <p class="detailed-answer">${book.categories}</p>
                            </div>

                            <div class="book-detailed-info">
                                <p>Year of Publication</p>
                                <p class="details-separator">:</p>
                                <p class="detailed-answer">${book.year_of_publication}</p>
                            </div>

                            <div class="book-detailed-info">
                                <p>Pages</p>
                                <p class="details-separator">:</p>
                                <p class="detailed-answer">${book.number_of_pages}</p>
                            </div>

                            <div class="book-detailed-info">
                                <p>Language</p>
                                <p class="details-separator">:</p>
                                <p class="detailed-answer">${book.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="comment-section">
                <div class="comment-keeper">
                    <!-- Display previous comments -->
                    ${comments.map(comment => `
                        <div class="user-info-and-time">                    
                            <p class="user-name">Anonymous</p>
                            <p class="comment-time">8 days ago</p>                    
                        </div>
                        <div class="commentHouse">
                            <p class="comment-container">${comment}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="comment-user-input">
                    <input type="text" class="comment-input" placeholder="Add a comment">
                    <div class="comment-buttons">
                        <button class="cancel-button">Cancel</button>
                        <button class="comment-button" disabled>Comment</button>
                    </div>
                </div>
            </section>
        </section>
    `;

    mainHTML.innerHTML = main;

    const commentButton = document.querySelector(".comment-button");
    const commentInput = document.querySelector(".comment-input");

    // Enable or disable the comment button based on input
    commentInput.addEventListener('input', () => {
        const inputValue = commentInput.value;
        if (inputValue !== "") {
            commentButton.disabled = false;
        } else {
            commentButton.disabled = true;
        }
    });

    // Handle comment submission
    commentButton.addEventListener("click", async () => {
        const inputValue = commentInput.value;
        if (inputValue !== "") {
            await addComment(inputValue);
            commentInput.value = ''; // Clear the input
            commentButton.disabled = true; // Disable button again after commenting
        }
    });

    // Refresh Page functionality
    function refreshPage() {
        document.querySelector(".take-me-back-button").addEventListener("click", () => {
            window.location.reload(true);
        });
    }
    refreshPage();
}

// Add comment to the book and update comment count
async function addComment(commentInput) {
    const response = await fetch("https://book-finder-8ady.onrender.com/books", {
        method: "PATCH", // Use PATCH to update the existing book object
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commentPost: [commentInput], // Adding the new comment
            incrementComments: true // A flag to increment the comment count
        })
    });

    if (response.ok) {
        // After the comment is added successfully, fetch the updated book details
        const updatedBook = await response.json();
        bookDetails(updatedBook); // Re-render the book details with the new comment
    }
}

async function addComment(commentInput) {
    const response = await fetch("https://book-finder-8ady.onrender.com/books", {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commentPost: [commentInput],
            incrementComments: true 
        })
    });

    if (response.ok) {
        const updatedBook = await response.json();
        bookDetails(updatedBook); 
    }
}

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
