// Variables
const body = document.querySelector('body');

// Functions

let myLibrary = [];

// Part 2: Revisit project and re-write using classes

// function Book(name, author, pagecount, status) {
//   this.name = name;
//   this.author = author;
//   this.pagecount = pagecount;
//   this.status = status;

//   this.info = function () {
//     return `${name} by ${author}, ${pagecount} pages, ${status}`;
//   };
// }

class Book {
  constructor(name, author, pagecount, status) {
    this.name = name;
    this.author = author;
    this.pagecount = pagecount;
    this.status = status;
  }

  info = () => {
    return `${name} by ${author}, ${pagecount} pages, ${status}`;
  };
}

function addBookToLibrary(title, author, pagecount, isread) {
  const newBook = new Book(title, author, pagecount, isread);
  myLibrary.push(newBook);
  return myLibrary.indexOf(newBook);
}

function cleanupForm() {
  document.querySelector('.modal').classList.remove('active');
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pagecount').value = '';
  document.getElementById('is-read').checked = false;
}

function createBookFromInput(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pagecount = document.getElementById('pagecount').value;
  const isread = document.getElementById('is-read').checked;

  // Create new Book object and add to myLibrary array
  const booknumber = addBookToLibrary(title, author, pagecount, isread);

  // Create Book Item
  const bookitm = document.createElement('div');
  bookitm.classList.add('book-item');

  // Create delete button
  const delbtn = document.createElement('div');
  delbtn.classList.add('del');
  delbtn.textContent = 'X';
  console.log(`Book ${booknumber + 1} added to your library`);
  delbtn.bookNumber = booknumber;

  // Create book info div
  const bookinfo = document.createElement('div');
  bookinfo.classList.add('book-info');

  // Create title text label
  const titleblock = document.createElement('p');
  titleblock.classList.add('title');

  const a1 = document.createElement('strong');
  a1.textContent = 'Title:';

  titleblock.appendChild(a1);
  a1.insertAdjacentText(`afterend`, `${title}`);

  // Create author text label
  const authorblock = document.createElement('p');
  authorblock.classList.add('author');

  const a2 = document.createElement('strong');
  a2.textContent = 'Author:';

  authorblock.appendChild(a2);
  a2.insertAdjacentText(`afterend`, `${author}`);

  // Create pagecount text label
  const pageblock = document.createElement('p');
  pageblock.classList.add('numpages');

  const a3 = document.createElement('strong');
  a3.textContent = '# Pages:';

  pageblock.appendChild(a3);
  a3.insertAdjacentText(`afterend`, `${pagecount}`);

  // Create read status text label
  const readblock = document.createElement('p');
  readblock.classList.add('read');

  if (isread) {
    readblock.textContent = 'Read';
    readblock.style.backgroundColor = 'green';
  } else {
    readblock.textContent = 'Not Read';
    readblock.style.backgroundColor = 'red';
  }

  // Append child elements to the book item
  bookinfo.appendChild(titleblock);
  bookinfo.appendChild(authorblock);
  bookinfo.appendChild(pageblock);
  bookinfo.appendChild(readblock);

  bookitm.appendChild(delbtn);
  bookitm.appendChild(bookinfo);

  // Add new book item to the books container
  const books = document.querySelector('.books');
  books.appendChild(bookitm);

  // Add event listener on read block
  setReadListener(readblock);
  setDeleteListener(delbtn);

  // Cleanup (e.g., closing out modal)
  cleanupForm();
}

function deleteBook(e) {
  const el = e.target;
  const booknumber = el.bookNumber;

  myLibrary.splice(booknumber, 1);
  console.log(`Book ${booknumber + 1} removed from your library`);

  const delbook = el.parentElement;
  delbook.remove();

  updateBooks();
}

function activateModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('active');
}

function closeModal(e) {
  if (e.key == 'Escape' && modal.classList.contains('active')) {
    cleanupForm();
  }
}

function updateBooks() {
  const delbtns = document.querySelectorAll('.del');

  delbtns.forEach(
    (btn) =>
      (btn.bookNumber = myLibrary.findIndex(
        (book) => `Title:${book.name}` == btn.nextSibling.firstChild.textContent
      ))
  );
}

function toggleRead(e) {
  console.log('hello');
  if (e.target.textContent == 'Not Read') {
    e.target.textContent = 'Read';
    e.target.style.backgroundColor = 'green';
  } else {
    e.target.textContent = 'Not Read';
    e.target.style.backgroundColor = 'red';
  }
}

function setReadListener(el) {
  el.addEventListener('click', toggleRead);
}

function setDeleteListener(el) {
  el.addEventListener('click', deleteBook);
}

// Interactions
const addbtn = document.querySelector('.btn.add');
addbtn.addEventListener('click', activateModal);

const formbtn = document.querySelector('.btn.submit');
formbtn.addEventListener('click', createBookFromInput);

const modal = document.querySelector('.modal');

document.addEventListener('keydown', closeModal);
