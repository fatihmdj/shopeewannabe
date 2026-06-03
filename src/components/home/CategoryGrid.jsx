import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import './CategoryGrid.css';

const CategoryGrid = () => {
  return (
    <section className="category-section" id="category-grid">
      <div className="container">
        <div className="section-title">
          <h2>KATEGORI</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/search?category=${category.slug}`}
              key={category.id}
              className="category-grid__item"
            >
              <div className="category-grid__icon-wrap">
                <span className="category-grid__icon">{category.icon}</span>
              </div>
              <span className="category-grid__name">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
