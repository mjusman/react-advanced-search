import {promises} from "fs";
const {readFile} = promises;
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BookSearch from "./components/SearchPage";

describe("BookSearch", () => {
  let booksData;
  let books;
  let queryByTestId;
  let queryAllByTestId;
  let getAllByTestId;
  let getByTestId;
  let queryByDisplayValue;
  
  beforeAll(async () => {
    booksData = await readFile("./sample_data/books.json");
  });
  beforeEach(() => {
    books = JSON.parse(booksData);
    ({queryByTestId, queryAllByTestId, queryByDisplayValue,
      getByTestId, getAllByTestId} = render(<BookSearch books={books} />))
    ;
  });
  afterEach(cleanup);
  
  describe("the correct elements were rendered", () => {
    it("should have 5 input elements for required search fields", () => {
      expect(queryByTestId("author")).toBeInTheDocument();
      expect(queryByTestId("title")).toBeInTheDocument();
      expect(queryByTestId("language")).toBeInTheDocument();
      expect(queryByTestId("country")).toBeInTheDocument();
      expect(queryByTestId("year")).toBeInTheDocument();
    });
    
    it("should initially show all books", () => {
      expect(queryAllByTestId("book")).toHaveLength(books.length);
    });

    it("should render data for each field in a book", () => {
      const bookEls = queryAllByTestId("book");
      expect(bookEls).toHaveLength(books.length);
      const [book] = bookEls;
      expect(within(book).queryByText("Chinua Achebe")).toBeInTheDocument();
      expect(within(book).queryByText("Nigeria")).toBeInTheDocument();
      expect(within(book).queryByText("English")).toBeInTheDocument();
      expect(within(book).queryByText("209")).toBeInTheDocument();
      expect(within(book).queryByText("Things Fall Apart")).toBeInTheDocument();
      expect(within(book).queryByText("1958")).toBeInTheDocument();
    });
  });

  describe("searching by each field alone", () => {
    describe("modifying the author field", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("author"), {target: {value: "woolf"}});
      });
      
      it("should respond to change events", () => {
        expect(queryByDisplayValue("woolf")).toBeInTheDocument();
      });

      it("should filter books on the author query", () => {
        const bookEls = getAllByTestId("book");
        expect(bookEls).toHaveLength(2);
        expect(within(bookEls[0]).queryByText(/\bDalloway\b/)).toBeInTheDocument();
        expect(within(bookEls[1]).queryByText(/\bLighthouse\b/)).toBeInTheDocument();
      });
    });
    
    describe("modifying the title field", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("title"), {target: {value: "dea"}});
      });
      
      it("should respond to change events", () => {
        expect(queryByDisplayValue("dea")).toBeInTheDocument();
      });
      
      it("should filter books on the author query", () => {
        const bookEls = getAllByTestId("book");
        expect(bookEls).toHaveLength(3);
        expect(within(bookEls[0]).queryByText(/\bEuripides\b/)).toBeInTheDocument();
        expect(within(bookEls[1]).queryByText(/\bNikolai Gogol\b/)).toBeInTheDocument();
        expect(within(bookEls[2]).queryByText(/\bThe Death of Ivan Ilyich\b/)).toBeInTheDocument();
      });
    });
    
    describe("modifying the country field", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("country"), {target: {value: "ITALY"}});
      });
      
      it("should respond to change events", () => {
        expect(queryByDisplayValue("ITALY")).toBeInTheDocument();
      });
      
     
    });
    
    describe("modifying the language field", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("language"), {target: {value: "Spanish"}});
      });
      
      it("should respond to change events", () => {
        expect(queryByDisplayValue("Spanish")).toBeInTheDocument();
      });
      
    
    });

    describe("modifying the year field", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("year"), {target: {value: "196"}});
      });
      
      it("should respond to change events", () => {
        expect(queryByDisplayValue("196")).toBeInTheDocument();
      });
      
      it("should filter books on the language query", () => {
        const bookEls = getAllByTestId("book");
        expect(bookEls).toHaveLength(4);
        expect(within(bookEls[0]).queryByText(/\bFicciones\b/)).toBeInTheDocument();
        expect(within(bookEls[1]).queryByText(/\bOne Hundred Years of Solitude\b/)).toBeInTheDocument();
        expect(within(bookEls[2]).queryByText(/\bThe Golden Notebook\b/)).toBeInTheDocument();
        expect(within(bookEls[3]).queryByText(/\bSeason of Migration to the North\b/)).toBeInTheDocument();
      });
    });
  });
  
  describe("filtering on multiple terms", () => {
    describe("filtering on 192_ and english", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("year"), {target: {value: "192"}});
        fireEvent.change(getByTestId("language"), {target: {value: "english"}});
      });
      
      it("should filter books on the language and year query", () => {
        const bookEls = getAllByTestId("book");
        expect(bookEls).toHaveLength(4);
        expect(within(bookEls[0]).queryByText(/\bSound and the Fury\b/)).toBeInTheDocument();
        expect(within(bookEls[1]).queryByText(/\bUlysses\b/)).toBeInTheDocument();
        expect(within(bookEls[2]).queryByText(/\bMrs Dalloway\b/)).toBeInTheDocument();
        expect(within(bookEls[3]).queryByText(/\bTo the Lighthouse\b/)).toBeInTheDocument();
      });
    });
    
    describe("filtering on all fields with trim", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("author"), {target: {value: " all "}});
        fireEvent.change(getByTestId("title"), {target: {value: " t  "}});
        fireEvent.change(getByTestId("country"), {target: {value: "ni"}});
        fireEvent.change(getByTestId("language"), {target: {value: "english"}});
        fireEvent.change(getByTestId("year"), {target: {value: "195"}});
      });
      
      
    });
    
    describe("filtering on terms that have no results", () => {
      beforeEach(() => {
        fireEvent.change(getByTestId("year"), {target: {value: "190"}});
        fireEvent.change(getByTestId("language"), {target: {value: "spanish"}});
      });
      
      it("should filter books on the language and year query", () => {
        expect(queryAllByTestId("book")).toHaveLength(0);
      });
    });
  });


});