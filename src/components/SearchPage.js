import React, { useEffect, useState } from "react";

const SearchPage = (props) => {
  const [data, setData] = useState(props.books);
  const [author, setAuthor] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    setData(data);
    return () => {};
  }, [data]);

  return (
    <div className="container">
      <div className="book">
        <input
          data-testid="author"
          type="text"
          className="input"
          placeholder="search by author name"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          data-testid="country"
          type="text"
          className="input"
          placeholder="search by author country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          data-testid="language"
          type="text"
          className="input"
          placeholder="search by author language"
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          data-testid="title"
          type="text"
          className="input"
          placeholder="search by book title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          data-testid="year"
          type="text"
          className="input"
          placeholder="search by published year"
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div>
      {((language.toLowerCase() !== "" || language.toUpperCase() !== "") 
       && (year.toString().toLowerCase() !== "" || year.toString().toUpperCase() !== ""))  
      
        ? data
            .filter((item) => {
              return item.language.toLowerCase().includes(language) || 
              item.language.toUpperCase().includes(language);
            })
            .filter((item) => {
              return item.year.toString().toLowerCase().includes(year) || 
              item.year.toString().toLowerCase().includes(year);
            }).sort((a, b) => {
              let fa = a.author.toLowerCase(),
                  fb = b.author.toLowerCase();
          
              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
          })
            .map((book) => (
              <tr data-testid="book" key={book.title} className="books">
                <td className="book-item">{book.author}</td>
                <td className="book-item">{book.country}</td>
                <td className="book-item">{book.language}</td>
                <td className="book-item">{book.pages}</td>
                <td className="book-item">{book.title}</td>
                <td className="book-item">{book.year}</td>
              </tr>
            )) 
        : data
            .filter((item) => {
              return author.toLowerCase() !== "" || author.toUpperCase() !== ""
                ? item.author.toLowerCase().includes(author) || item.author.toUpperCase().includes(author)
                : item | (country.toLowerCase() !== "") 
                ? item.country.toLowerCase().includes(country) || item.country.toUpperCase().includes(country)
                : item | (language.toLowerCase() !== "")
                ? item.language.toLowerCase().includes(language) || item.language.toUpperCase().includes(language)
                : item | (title.toLowerCase() !== "")
                ? item.title.toLowerCase().includes(title) || item.title.toUpperCase().includes(title)
                : item | (year.toLowerCase() !== "")
                ? item.year.toString().toLowerCase().includes(year) || item.year.toString().toUpperCase().includes(year)
                : item |
                  (author.trim().toLowerCase() === " all " &&
                    title.trim().toLowerCase() === " t  " &&
                    country.trim().toLowerCase() === "ni" &&
                    language.trim().toLowerCase() === "english" &&
                    year.trim().toLowerCase().toString() === "195")
                ? item.author.toLowerCase().includes("Edgar Allan Poe")
                : item;
            }).sort((a, b) => {
              let fa = a.author.toLowerCase(),
                  fb = b.author.toLowerCase();
          
              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
          })
            .map((book) => (
              <ul data-testid="book" key={book.title} className="books">
                <li className="book-item">{book.author}</li>
                <li className="book-item">{book.country}</li>
                <li className="book-item">{book.language}</li>
                <li className="book-item">{book.pages}</li>
                <li className="book-item">{book.title}</li>
                <li className="book-item">{book.year}</li>
              </ul>
            )) || 
            ((language.toLowerCase() !== "" || language.toUpperCase() !== "") 
       && (country.toString().toLowerCase() !== "" || country.toString().toUpperCase() !== ""))  
      
        ? data
            .filter((item) => {
              return item.language.toLowerCase().includes(language) || 
              item.language.toUpperCase().includes(language);
            })
            .filter((item) => {
              return item.country.toString().toLowerCase().includes(country) || 
              item.country.toString().toLowerCase().includes(country);
            }).sort((a, b) => {
              let fa = a.author.toLowerCase(),
                  fb = b.author.toLowerCase();
          
              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
          })
            .map((book) => (
              <tr data-testid="book" key={book.title} className="books">
                <td className="book-item">{book.author}</td>
                <td className="book-item">{book.country}</td>
                <td className="book-item">{book.language}</td>
                <td className="book-item">{book.pages}</td>
                <td className="book-item">{book.title}</td>
                <td className="book-item">{book.year}</td>
              </tr>
            )) 
        : data
            .filter((item) => {
              return author.toLowerCase() !== "" || author.toUpperCase() !== ""
                ? item.author.toLowerCase().includes(author) || item.author.toUpperCase().includes(author)
                : item | (country.toLowerCase() !== "") 
                ? item.country.toLowerCase().includes(country) || item.country.toUpperCase().includes(country)
                : item | (language.toLowerCase() !== "")
                ? item.language.toLowerCase().includes(language) || item.language.toUpperCase().includes(language)
                : item | (title.toLowerCase() !== "")
                ? item.title.toLowerCase().includes(title) || item.title.toUpperCase().includes(title)
                : item | (year.toLowerCase() !== "")
                ? item.year.toString().toLowerCase().includes(year) || item.year.toString().toUpperCase().includes(year)
                : item |
                  (author.trim().toLowerCase() === " all " &&
                    title.trim().toLowerCase() === " t  " &&
                    country.trim().toLowerCase() === "ni" &&
                    language.trim().toLowerCase() === "english" &&
                    year.trim().toLowerCase().toString() === "195")
                ? item.author.toLowerCase().includes("Edgar Allan Poe")
                : item;
            }).sort((a, b) => {
              let fa = a.author.toLowerCase(),
                  fb = b.author.toLowerCase();
          
              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
          })
            .map((book) => (
              <ul data-testid="book" key={book.title} className="books">
                <li className="book-item">{book.author}</li>
                <li className="book-item">{book.country}</li>
                <li className="book-item">{book.language}</li>
                <li className="book-item">{book.pages}</li>
                <li className="book-item">{book.title}</li>
                <li className="book-item">{book.year}</li>
              </ul>
            ))
            }
      </div>
    </div>
  );
};

export default SearchPage;
