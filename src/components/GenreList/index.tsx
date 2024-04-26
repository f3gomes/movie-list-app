import { genres } from "../../data/genres";
import { cn } from "../../utils/merge";

interface GenreListProps {
  genreIds: number[];
  watched: boolean;
}

export function GenreList({ genreIds, watched }: GenreListProps) {
  const filteredGenres = genreIds.map((id: number) => {
    const filter = genres.find((genre) => genre.id === id);

    if (filter) {
      return filter.name;
    } else {
      return "Gênero Desconhecido";
    }
  });

  return (
    <div className="flex gap-2">
      {filteredGenres?.map((item: string) => {
        return (
          <div
            key={item}
            className={cn(
              watched && "bg-opacity-60",
              "text-white bg-slate-800 px-2 py-[2px] rounded-full text-sm"
            )}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
