export default function AnimeFilter({
  rating,
  onRatingChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="anime__controls">
      <div className="anime__filter">
        <label className="anime__filter--title" htmlFor="rating-filter">
          Rating:{" "}
          <span className="orange">{Number(rating).toFixed(1)} to 10</span>
        </label>
        <input
          id="rating-filter"
          className="anime__filter--range"
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={rating}
          onChange={(event) => onRatingChange(Number(event.target.value))}
        />
        <div className="anime__filter--values">
          <span>0</span>
          <span>10</span>
        </div>
      </div>
      <div className="anime__sort">
        <label htmlFor="anime-sort">Sort by</label>
        <select
          id="anime-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="POPULARITY">Popularity</option>
          <option value="RATING_HIGH">Rating: High to Low</option>
          <option value="RATING_LOW">Rating: Low to High</option>
          <option value="TITLE_AZ">Title: A to Z</option>
          <option value="TITLE_ZA">Title: Z to A</option>
        </select>
      </div>
    </div>
  );
}
