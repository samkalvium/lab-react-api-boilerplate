import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [error, setError] = useState('');
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: {
        Authorization: 'Bearer abc123'
      }
    })
      .then((response) => {
        setBookData(response.data.books);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError("Source code: 404");
        } else {
          setError("Website not found");
          console.log("Source code: 404")
          console.log("Website not found")
        }
      });
  }, []);

  return (
    <>
      <div>
        <div className='header'>
          <p>{error}</p>
        </div>
        <div className='container'>
          {bookData.map((book) => (
            <div key={book.id}>
              <h2>{book.title}</h2>
              <div className="flex">
                <img src={book.imageLinks.thumbnail} alt={book.title} />
                <div>
                  <p>{book.description}</p>
                </div>
              </div>
              <p>Authors: {book.authors.join(", ")}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
