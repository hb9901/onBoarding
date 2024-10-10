const Main = () => {
  const handleClick = () => {
    throw new Error("Setry Test Error");
  };

  return (
    <div className="h-full">
      <button onClick={handleClick}>오류 버튼</button>
    </div>
  );
};

export default Main;
