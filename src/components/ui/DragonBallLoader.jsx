export default function DragonBallLoader() {
  return (
    <div
      className="dragonball__loader"
      role="status"
      aria-label="Loading anime"
    >
      <div className="dragonball__loader--ball" aria-hidden="true">
        <span className="dragonball__loader--star">★</span>
        <span className="dragonball__loader--star">★</span>
        <span className="dragonball__loader--star">★</span>
        <span className="dragonball__loader--star">★</span>
      </div>
      <span className="dragonball__loader--text">Loading anime...</span>
    </div>
  );
}
