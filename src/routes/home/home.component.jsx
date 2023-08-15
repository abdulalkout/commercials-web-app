import CategoryMenu from '../../components/category-menu/category-menu.component';
import { Outlet } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <CategoryMenu />
      <Outlet/>
    </div>
  );
}

export default Home;
