// ============================================
// BOOKS DATA
// This file contains all the book information
// ============================================

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    category: "Fiction",
    image: "public/book-cover-midnight-library-blue-mysterious.jpg",
    description: "A dazzling novel about all the choices that go into a life well lived."
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    category: "Non-Fiction",
    image: "public/atomic-habits-book-cover-orange.jpg",
    description: "Transform your life with tiny changes in behavior that lead to remarkable results."
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 14.99,
    category: "Science Fiction",
    image: "public/book-cover-space-astronaut-stars-sci-fi.jpg",
    description: "A lone astronaut must save the earth from disaster in this gripping tale."
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 15.99,
    category: "Mystery",
    image: "public/book-cover-mystery-thriller-dark-woman.jpg",
    description: "A shocking psychological thriller about a woman's act of violence against her husband."
  },
  {
    id: 5,
    title: "Beach Read",
    author: "Emily Henry",
    price: 13.99,
    category: "Romance",
    image: "public/book-cover-romance-pink-hearts-modern.jpg",
    description: "Two writers with opposite styles challenge each other to write in the other's genre."
  },
  {
    id: 6,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    price: 17.99,
    category: "Fantasy",
    image: "public/book-cover-dune-desert-sand-epic.jpg",
    description: "The tale of Kvothe, a magically gifted young man who becomes a legendary figure."
  },
  {
    id: 7,
    title: "Educated",
    author: "Tara Westover",
    price: 16.99,
    category: "Non-Fiction",
    image: "public/book-cover-memoir-mountains-landscape-education.jpg",
    description: "A memoir about a young woman who leaves her survivalist family to pursue education."
  },
  {
    id: 8,
    title: "Dune",
    author: "Frank Herbert",
    price: 19.99,
    category: "Science Fiction",
    image: "public/dune-desert-sand-epic-book-cover.jpg",
    description: "Set on the desert planet Arrakis, a story of politics, religion, and power."
  },
  {
    id: 9,
    title: "The Guest List",
    author: "Lucy Foley",
    price: 15.99,
    category: "Mystery",
    image: "public/book-cover-mystery-wedding-dark-stormy.jpg",
    description: "A wedding celebration turns dark when a body is discovered on the island."
  },
  {
    id: 10,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 16.99,
    category: "Fiction",
    image: "public/book-cover-nature-marsh-birds-peaceful.jpg",
    description: "A young girl raised in the marshlands becomes a murder suspect."
  },
  {
    id: 11,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 17.99,
    category: "Non-Fiction",
    image: "public/book-cover-thinking-brain-lightbulb-modern.jpg",
    description: "A groundbreaking tour of the mind explaining the two systems that drive decision making."
  },
  {
    id: 12,
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    price: 9.99,
    category: "Children",
    image: "public/book-cover-children-colorful-caterpillar-illustrat.jpg",
    description: "A beloved children's classic about a caterpillar's transformation."
  },
  {
    id: 13,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 18.99,
    category: "Biography",
    image: "public/book-cover-biography-elegant-portrait.jpg",
    description: "The exclusive biography of the creative entrepreneur whose passion for perfection revolutionized industries."
  },
  {
    id: 14,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 15.99,
    category: "Fantasy",
    image: "public/book-cover-dune-desert-sand-epic.jpg",
    description: "A stunning retelling of the legend of Achilles and Patroclus."
  },
  {
    id: 15,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 19.99,
    category: "Non-Fiction",
    image: "public/book-cover-memoir-mountains-landscape-education.jpg",
    description: "A brief history of humankind from the Stone Age to the modern age."
  }
];

// Function to get all books
function getAllBooks() {
  return books;
}

// Function to get a book by ID
function getBookById(id) {
  return books.find((book) => book.id === id);
}

// Function to get featured books (first 4 books)
function getFeaturedBooks() {
  return books.slice(0, 4);
}

// Function to get books by category
function getBooksByCategory(category) {
  if (category === 'all') {
    return books;
  }
  return books.filter(book => book.category === category);
}

// Function to search books
function searchBooks(query) {
  const searchLower = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(searchLower) || 
    book.author.toLowerCase().includes(searchLower) ||
    book.description.toLowerCase().includes(searchLower)
  );
}
