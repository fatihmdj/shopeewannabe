import BannerCarousel from '../components/home/BannerCarousel';
import CategoryGrid from '../components/home/CategoryGrid';
import FlashSale from '../components/home/FlashSale';
import ShopeeFeatures from '../components/home/ShopeeFeatures';
import ProductGrid from '../components/home/ProductGrid';

const HomePage = () => {
  return (
    <div className="home-page" id="home-page">
      <BannerCarousel />
      <CategoryGrid />
      <ShopeeFeatures />
      <FlashSale />
      <ProductGrid />
    </div>
  );
};

export default HomePage;
