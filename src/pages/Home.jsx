import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import AnimeFilter from "../components/AnimeFilter";
import AnimeCard from "../components/ui/AnimeCard";
import AnimeSkeleton from "../components/ui/AnimeSkeleton";
import DragonBallLoader from "../components/ui/DragonBallLoader";

import { getAnime, animeTitle } from "../services/animeAPI";

export default function Home() {
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [anime, setAnime] = useState([]);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("POPULARITY");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnime() {
      setLoading(true);
      setError("");

      try {
        const results = await getAnime(search, controller.signal);

        if (!controller.signal.aborted) {
          setAnime(results);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to load anime:", err);
          setError("Unable to load anime. Please try again.");
          setAnime([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadAnime();

    return () => controller.abort();
  }, [search, retry]);

  useEffect(() => {
    if (location.hash === "#results") {
      document.getElementById("results")?.scrollIntoView();
    }
  }, [location]);

  const displayedAnime = useMemo(() => {
    const list = anime.filter((show) => {
      if (show.averageScore == null) {
        return rating === 0;
      }

      return show.averageScore / 10 >= rating;
    });

    if (sort === "RATING_HIGH") {
      list.sort((a, b) => (b.averageScore ?? -1) - (a.averageScore ?? -1));
    }

    if (sort === "RATING_LOW") {
      list.sort((a, b) => (a.averageScore ?? 101) - (b.averageScore ?? 101));
    }

    if (sort === "TITLE_AZ") {
      list.sort((a, b) => animeTitle(a).localeCompare(animeTitle(b)));
    }

    if (sort === "TITLE_ZA") {
      list.sort((a, b) => animeTitle(b).localeCompare(animeTitle(a)));
    }

    return list;
  }, [anime, rating, sort]);

  return (
    <main>
      <section id="landing">
        <header className="anime__header">
          <div className="anime__header--container">
            <h1 className="anime__header--title">Browse Anime</h1>

            <SearchBar onSearch={setSearch} />
          </div>
        </header>
      </section>

      <section id="results" className="container">
        <div className="row">
          <div className="anime__results--header">
            <h2 className="anime__results--title">Search Results:</h2>

            <AnimeFilter
              rating={rating}
              onRatingChange={setRating}
              sort={sort}
              onSortChange={setSort}
            />
          </div>

          {loading ? (
            <>
              <DragonBallLoader />

              <div className="anime" aria-hidden="true">
                {Array.from({ length: 9 }, (_, index) => (
                  <AnimeSkeleton key={index} />
                ))}
              </div>
            </>
          ) : error ? (
            <div className="anime__message" role="alert">
              <p>{error}</p>

              <button
                type="button"
                className="anime__retry"
                onClick={() => setRetry((value) => value + 1)}
              >
                Retry
              </button>
            </div>
          ) : displayedAnime.length > 0 ? (
            <div className="anime">
              {displayedAnime.map((show) => (
                <AnimeCard key={show.id} anime={show} />
              ))}
            </div>
          ) : (
            <p className="anime__message">
              No anime found. Try a different search or lower the minimum
              rating.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
