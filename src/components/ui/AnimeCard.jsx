
import { Link } from "react-router-dom";
import {
  animeTitle,
  animeRating,
  cleanDescription,
} from "../../services/animeAPI";

export default function AnimeCard({ anime }) {
  return (
    <article className="anime__card">
      <Link
        className="anime__card--container"
        to={`/anime/${anime.id}`}
        state={{ fromBrowse: true }}
      >
        <figure className="anime__img--wrapper">
          <img
            className="anime__img"
            src={anime.coverImage?.extraLarge || anime.coverImage?.large}
            alt={`${animeTitle(anime)} cover`}
            loading="lazy"
          />
        </figure>

        <div className="anime__card--body">
          <h3 className="anime__title">{animeTitle(anime)}</h3>

          <div className="anime__ratings">
            <span aria-hidden="true">★</span>
            <span>{animeRating(anime.averageScore)}</span>
          </div>

          <p className="anime__description">
            {cleanDescription(anime.description)}
          </p>
        </div>
      </Link>
    </article>
  );
}
