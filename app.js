let sst = JSON.parse(localStorage.getItem("sst")) || [];

function randomIdGenerator(size = 10){
    let pattern = "a";
    for(let i = 0; i < size;i++){
        pattern += Math.floor(Math.random() * size);
    }
    return pattern;
}

// [{name: "My Experiments with truth",id:1234}]


let addBookForm_DOM = document.querySelector("#add-book");
let inputAddBook_DOM = document.querySelector(".input-add-book");
const ul_DOM = document.querySelector("ul");
const hide_DOM = document.querySelector("#hide");
const searchBookForm_DOM = document.querySelector("#search-books");
const searchInput_DOM = document.querySelector(".search-input");



function createUI(data = sst,root = ul_DOM){
    root.innerHTML = "";
    root.innerHTML += data.map(book => `
    <li data-id="${book.id}">
        <span>${book.bookName}</span>
        <span class="delete">&times</span>
    </li>`).join("")

    // data.forEach(book => {
    //     let li_DOM = document.createElement("li");
    //     li_DOM.setAttribute("data-id",book.id);
    
    //     let spanName_DOM = document.createElement("span");
    //     spanName_DOM.textContent = book.bookName;

    //     let spanDelete_DOM = document.createElement("span");
    //     spanDelete_DOM.innerHTML = "&times;";

    //     li_DOM.append(spanName_DOM,spanDelete_DOM);
    //     ul_DOM.append(li_DOM);
    // }) 

    inputAddBook_DOM.value = "";
}



function handleAddBook(event){
    event.preventDefault();
    let bookObj = {
        bookName: inputAddBook_DOM.value,
        id:randomIdGenerator()
    }
    sst.push(bookObj);
    localStorage.setItem("sst",JSON.stringify(sst));
    createUI();
}





window.addEventListener("load",function(event){
    createUI();
})

function handleHideBooks(event){
    ul_DOM.classList.toggle("hide-list");
}

addBookForm_DOM.addEventListener("submit",handleAddBook);
hide_DOM.addEventListener("click",handleHideBooks);


function deleteParticularBook(event){
     if(!event.target.classList.contains("delete")) return;
    const getId = event.target.parentElement.dataset.id;
    sst = sst.filter(book => book.id !== getId);
    createUI(sst)
    localStorage.setItem("sst", JSON.stringify(sst));
}

ul_DOM.addEventListener("click",deleteParticularBook);



function handleSearchOnSubmit(event){
    event.preventDefault();
    const searchTerm = searchInput_DOM.value;
    const searchArray = sst.filter(book => book["bookName"].toLowerCase().includes(searchTerm.toLowerCase()));
    createUI(searchArray);

}

searchBookForm_DOM.addEventListener("submit",handleSearchOnSubmit)
searchBookForm_DOM.addEventListener("input",handleSearchOnSubmit)