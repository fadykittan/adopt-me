import Pet from "./Pet";

const Results = ({ pets }) => {
  console.log(pets);
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet) => <Pet {...pet} key={pet.id} />)
      )}
    </div>
  );
};

export default Results;
