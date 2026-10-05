import FilterPanel from '../FilterPanel/FilterPanel';
import LocationsGrid from '../LocationsGrid/LocationsGrid';
import css from './LocationsPage.module.css';

export default function LocationsPage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Усі місця відпочинку</h1>
        <FilterPanel />
        <LocationsGrid />
      </div>
    </section>
  );
}