import { useLoaderData } from "react-router-dom";
import Card from "../../components/Card";
import { Tmovies } from "../../types/movie.type";

const Main = () => {
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const data = useLoaderData() as Tmovies;

  return (
    <div className="h-full w-full px-[30px] py-[20px]">
      <Card>
        <h2 className="text-[20px] font-bold pb-[20px]">오늘의 영화 트렌드</h2>
        <ul className="grid grid-cols-1 gap-x-[10px] gap-y-[15px] md:grid-cols-3 lg:grid-cols-5">
          {data?.results.map((result) => (
            <li key={result.id} className="min-w-[150px]">
              <img
                src={baseURL + result.poster_path}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Main;
