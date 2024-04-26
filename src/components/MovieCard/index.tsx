import { BiLike, BiSolidLike } from "react-icons/bi";
import { cn } from "../../utils/merge";
import { GenreList } from "../GenreList";

export interface MovieProps {
  _id: string;
  name: string;
  imgUrl: string;
  link: string;
  likes: number;
  watched: boolean;
  genreIds: number[];
}

export interface MovieCardProps {
  movie: MovieProps;
  handleSubmitLike: (id: string) => void;
  handleSubmitDisLike: (id: string) => void;
  handleSubmitWatched: (id: string) => void;
}

export function MovieCard({
  movie,
  handleSubmitLike,
  handleSubmitDisLike,
  handleSubmitWatched,
}: MovieCardProps) {
  const { _id, name, imgUrl, link, likes, watched, genreIds } = movie;

  return (
    <div
      className={cn(
        watched && "bg-opacity-60",
        "bg-[#6573ea] text-white rounded-sm flex justify-between h-28 py-7 px-3 relative"
      )}
    >
      <div className="flex gap-4 items-center">
        <img
          src={imgUrl}
          alt="cover"
          className={cn("w-16", watched && "opacity-60")}
        />

        <div className="flex flex-col gap-2 mt-6 sm:mt-0">
          <a
            href={link}
            target="_blank"
            className="text-xl sm:text-2xl hover:text-slate-900 transition duration-200"
          >
            {name}
          </a>

          <GenreList genreIds={genreIds} watched={watched} />
        </div>
      </div>

      <div className="flex gap-3 items-center absolute right-3 top-1">
        <span className="text-3xl">{likes}</span>

        {likes > 2 ? (
          <BiSolidLike
            size={30}
            className="cursor-pointer hover:text-slate-900 transition duration-200"
            onClick={() => handleSubmitDisLike(_id)}
          />
        ) : (
          <BiLike
            size={30}
            className="cursor-pointer hover:text-slate-900 transition duration-200"
            onClick={() => handleSubmitLike(_id)}
          />
        )}
        <input
          id={_id}
          name={_id}
          type="checkbox"
          checked={watched}
          onChange={() => handleSubmitWatched(_id)}
          className="scale-150 accent-slate-50 cursor-pointer hover:border-slate-900 hover:border-2 transition duration-200"
        />
      </div>
    </div>
  );
}
