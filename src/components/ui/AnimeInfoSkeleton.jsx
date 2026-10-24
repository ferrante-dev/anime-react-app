export default function AnimeInfoSkeleton() {
  return (
    <div
      className="anime__selected"
      role="status"
      aria-label="Loading anime details"
    >
      <div className="anime__selected--figure">
        <div className="anime__selected--img-skeleton skeleton" />
      </div>
      <div className="anime__selected--description">
        <div className="anime__selected--title-skeleton skeleton" />
        <div className="anime__selected--meta-skeleton skeleton" />
        <div className="anime__selected--meta-skeleton skeleton" />
        <div className="anime__selected--paragraph-skeleton skeleton" />
        <div className="anime__selected--paragraph-skeleton skeleton" />
      </div>
    </div>
  );
}
