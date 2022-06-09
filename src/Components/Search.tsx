import { useState } from "react";
import { List } from "./List";
import Pagination from "./Pagination";
import { useEffect } from "react";

export type DataType = {
  id: number;
  keywords: string;
  title: string;
  symbol: string;
};

export function Search() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    (async () => {
      let res = await fetch("https://emoji-api-app.herokuapp.com/");
      res = await res.json();
      setData(res as any);
    })();
  }, []);

  const dataWithoutDuplicate = data.map((element) => {
    element.keywords = [...(new Set(element.keywords.split(" ")) as any)].join(
      " "
    );
    return element;
  });

  const dataWithId = dataWithoutDuplicate.map((elem, index) => ({
    ...elem,
    id: index,
  }));

  const [value, setValue] = useState("");
  const valueArray = value.trim().replace(/\s+/g, " ").split(" ");

  const filteredArray = dataWithId.filter((itemData) => {
    return valueArray.every(
      (word) =>
        itemData.keywords.toLowerCase().includes(word.toLowerCase()) ||
        itemData.title.toLowerCase().includes(word.toLowerCase()) ||
        itemData.symbol.toLowerCase().includes(word.toLowerCase())
    );
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(18);

  const lastArrayIndex = currentPage * elementsPerPage;
  const firstArrayIndex = lastArrayIndex - elementsPerPage;
  const currentElement = filteredArray.slice(firstArrayIndex, lastArrayIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <header>
        <div className="container">
          <div className="title">
            <h1>Emoji Finder</h1>
            <h2>Find emoji by keywords</h2>
          </div>
          <input
            type="search"
            onChange={(event) => {
              setCurrentPage(1);
              setValue(event.target.value);
            }}
            placeholder="Search emoji"
          />
        </div>
      </header>
      <List array={currentElement} />
      <Pagination
        elementsPerPage={elementsPerPage}
        totalElements={filteredArray.length}
        paginate={paginate}
        currentPage={currentPage}
        setElementsPerPage={setElementsPerPage}
      />
    </>
  );
}
