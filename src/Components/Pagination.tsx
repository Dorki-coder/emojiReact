type Props = {
  elementsPerPage: number;
  totalElements: number;
  paginate: (pageNumber: number) => void;
  setElementsPerPage: (elementsPerPag: number) => void;
  currentPage: number;
};

const Pagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  setElementsPerPage,
  currentPage,
}: Props) => {
  const pageNumber: number[] = [];
  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumber.push(i);
  }
  const outPageNumber: number[] = [];
  if (currentPage === 1 || currentPage === 2)
    for (let i = 1; outPageNumber.length < 5 && i <= pageNumber.length; i++) {
      outPageNumber.push(i);
    }
  else
    for (
      let i = currentPage - 2;
      outPageNumber.length < 5 && i <= pageNumber.length;
      i++
    ) {
      outPageNumber.push(i);
    }

  return (
    <div className="container">
      <div className="pagination ">
        <ul>
          <button onClick={() => paginate(1)}>First</button>
          {outPageNumber.map((element) => {
            return (
              <li key={element}>
                <button
                  className={`${currentPage === element ? "active " : null}`}
                  onClick={() => paginate(element)}
                >
                  {element}
                </button>
              </li>
            );
          })}
          <button onClick={() => paginate(pageNumber.length)}>Last</button>
        </ul>
        <div>
          Per page:
          <select
            onChange={(e) => {
              const selected = +e.target.value;
              setElementsPerPage(selected);
              paginate(1);
            }}
          >
            <option value={18}>18</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
