export default function AnimeSkeleton() {
  return (
    <div className="anime__card" aria-hidden="true">
      <div className="anime__card--container">
        <div className="anime__img--skeleton skeleton" />
        <div className="anime__card--body">
          <div className="anime__title--skeleton skeleton" />
          <div className="anime__rating--skeleton skeleton" />
          <div className="anime__description--skeleton skeleton" />
          <div className="anime__description--skeleton skeleton" />
        </div>
      </div>
    </div>
  );
}
