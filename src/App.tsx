import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { List } from "./Components/List";
import Pagination from "./Components/Pagination";

export type Data = {
  id: number;
  keywords: string;
  title: string;
  symbol: string;
};

const removeDuplicate = (data: Data[]) =>
  data.map((element) => {
    element.keywords = [
      ...(new Set(element.keywords.split(" ")) as any),
    ].join(" ");
    return element;
  });

const findItems = (inputValue, allData) => {
  console.info(`🔥 findItems`);
  const valueArray = inputValue
    .trim()
    .replace(/\s+/g, " ")
    .split(" ");
  const filteredArray = allData.filter((itemData) =>
    valueArray.every(
      (word) =>
        itemData.keywords
          .toLowerCase()
          .includes(word.toLowerCase()) ||
        itemData.title.toLowerCase().includes(word.toLowerCase()) ||
        itemData.symbol.toLowerCase().includes(word.toLowerCase()),
    ),
  );

  return filteredArray;
};

export function App() {
  const [data, setData] = useState<Data[]>([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(18);

  useEffect(() => {
    (async () => {
      const url = "https://emoji-api-app.herokuapp.com/";
      const response = await fetch(url);
      const json = await response.json();
      const dedupe = removeDuplicate(json);
      const withId = dedupe.map((elem, index) => ({
        ...elem,
        id: index,
      }));
      setData(withId as Data[]);
    })();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [value, elementsPerPage]);

  const filteredArray = useMemo(
    () => findItems(value, data),
    [value, data],
  );

  const lastArrayIndex = currentPage * elementsPerPage;
  const firstArrayIndex = lastArrayIndex - elementsPerPage;
  const currentElement = filteredArray.slice(
    firstArrayIndex,
    lastArrayIndex,
  );

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
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search emoji"
          />
        </div>
      </header>
      <List array={currentElement} />
      <Pagination
        elementsPerPage={elementsPerPage}
        totalElements={filteredArray.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
        setElementsPerPage={setElementsPerPage}
      />
    </>
  );
}

export default App;
