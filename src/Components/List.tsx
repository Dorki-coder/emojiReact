import { Card } from "./Card";

export const List = ({ array }) => {
  if (array.length > 0) {
    return (
      <div className="list">
        {array.map((element) => (
          <Card {...element} key={element.id} />
        ))}
      </div>
    );
  } else return <h3>Ничего на найдено</h3>;
};
