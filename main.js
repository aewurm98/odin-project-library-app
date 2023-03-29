// Variables

// Functions

let myLibrary = [];

function Book(name, author, pagecount, status) {
  this.name = name;
  this.author = author;
  this.pagecount = pagecount;
  this.status = status;

  this.info = function () {
    return `${name} by ${author}, ${pagecount} pages, ${status}`;
  };
}

function getBookFromInput() {
  const title = document.getElementById('title').textContent;
  const author = document.getElementById('author').textContent;
  const pagecount = document.getElementById('pagecount').textContent;
  const isread = document.getElementById('isread').textContent;
}

function addBookToLibrary() {}
