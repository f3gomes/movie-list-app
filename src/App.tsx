import { Header } from "./components/Header";
import { MovieList } from "./components/MovieList";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col gap-1 max-w-[1280px] mx-auto p-2">
      <Header />
      <MovieList />
    </div>
  );
}

export default App;
