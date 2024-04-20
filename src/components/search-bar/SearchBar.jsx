import './style.css'
import searchIcon from '../../assets/svg/search-icon.svg'
import { useEffect, useState } from 'react';
import { getAllServicesByCategory } from '../../APIs';
import { Link } from 'react-router-dom';

const SearchBar = () => {

  // get categories
  const [categories, setCategories] = useState([]);
  // console.log(categories)
  // fetch categories on load
  useEffect(() => {
    getAllServicesByCategory().then((result) => {
      if (result) {
        setCategories(result);
        console.log("Processed services data:", result);
      } else {
        console.log("Failed to fetch and process services data.");
      }
    });
  }, []);



  const [value, setValue] = useState('');
  // console.log(value)

  const handleSearch = (searchItem) => {
    setValue(searchItem)
    console.log(searchItem)
  }

  return (
    <div className='search-container'>
        <div className="search">
            <img src={searchIcon} alt="" />
            <input type="text" name="search" value={value} onChange={(e) => setValue(e.target.value)} id="" placeholder='What do you need help with?' />
        </div>
        <div className={`dropdown ${value ? 'active' : ''}`} >
          {categories.filter(category => {
            const searchTerm = value.toLocaleLowerCase();
            const searchCategory = category.id?.toLocaleLowerCase();

            return searchTerm && searchCategory.startsWith(searchTerm) && searchCategory !== searchTerm
          }).map((category) => 
            (<p className='searchTerms' key={category.id} onClick={() => handleSearch(category.id)} >
              <Link to={`/categories/${category.id}`} className="category">
                {category.id}
              </Link>
            </p>
          ))}
        </div>
    </div>
  )
}

export default SearchBar