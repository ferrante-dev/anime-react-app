import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AnimeInfoSkeleton from "../components/ui/AnimeInfoSkeleton";
import DragonBallLoader from "../components/ui/DragonBallLoader";

import {
  getAnimeById,
  animeTitle,
  animeRating,
  cleanDescription,
} from "../services/animeAPI";

export default function AnimeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnime() {
      setLoading(true);
      setError("");
      setAnime(null);

      try {
        const result = await getAnimeById(id, controller.signal);

        if (!result) {
          if (!controller.signal.aborted) {
            setError("Anime not found in AniList.");
          }
          return;
        }

        if (!controller.signal.aborted) {
          setAnime(result);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to load anime:", err);

          setError("Unable to load anime information. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadAnime();

    return () => controller.abort();
  }, [id, retry]);

  function goBack() {
    if (location.state?.fromBrowse) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <main className="anime__info--page">
      <div className="container">
        <div className="row">
          <div className="anime__info--top">
            <button type="button" className="anime__back--btn" onClick={goBack}>
              ← Back to Anime
            </button>
          </div>

          {loading ? (
            <>
              <DragonBallLoader />

              <div aria-hidden="true">
                <AnimeInfoSkeleton />
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
          ) : anime ? (
            <div className="anime__info--row">
              <figure className="anime__info--img-wrapper">
                <img
                  className="anime__info--img"
                  src={anime.coverImage?.extraLarge || anime.coverImage?.large}
                  alt={`${animeTitle(anime)} cover`}
                />
              </figure>

              <div className="anime__info--body">
                <h1 className="anime__info--title">{animeTitle(anime)}</h1>

                {anime.title?.native && (
                  <p className="anime__selected--native">
                    {anime.title.native}
                  </p>
                )}

                <div className="anime__ratings">
                  <span aria-hidden="true">★</span>

                  <span>{animeRating(anime.averageScore)}</span>
                </div>

                <div className="anime__info--meta">
                  <span>
                    <strong>Format:</strong>{" "}
                    {anime.format?.replaceAll("_", " ") || "Unknown"}
                  </span>

                  <span>
                    <strong>Episodes:</strong> {anime.episodes ?? "Unknown"}
                  </span>

                  <span>
                    <strong>Duration:</strong>{" "}
                    {anime.duration ? `${anime.duration} min` : "Unknown"}
                  </span>

                  <span>
                    <strong>Status:</strong>{" "}
                    {anime.status?.replaceAll("_", " ") || "Unknown"}
                  </span>

                  <span>
                    <strong>Season:</strong>{" "}
                    {[anime.season, anime.seasonYear]
                      .filter(Boolean)
                      .join(" ") || "Unknown"}
                  </span>
                  <span>
                    <strong>Studios:</strong>{" "}
                    {anime.studios?.nodes
                      ?.map((studio) => studio.name)
                      .join(", ") || "Unknown"}
                  </span>
                </div>
                <div className="anime__info--genres">
                  {anime.genres?.map((genre) => (
                    <span className="anime__info--genre" key={genre}>
                      {genre}
                    </span>
                  ))}
                </div>
                <h2 className="anime__summary--title">Synopsis</h2>

                <p className="anime__info--description">
                  {cleanDescription(anime.description)}
                </p>
                {anime.siteUrl && (
                  <a
                    className="anime__back--btn"
                    href={anime.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on AniList ↗
                  </a>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
