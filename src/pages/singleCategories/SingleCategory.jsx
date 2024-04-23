/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { useState} from "react";
import "./style.css";

import arrow from "../../assets/svg/arrow2.svg";
import CategoryHero from "../../components/categoryHero/CategoryHero";

const itemsPerPage = 12;

function SingleCategory({ categories, getProvider }) {

  console.log(categories)
  
  const { id } = useParams();
  const category = categories?.find((category) => category.id === id);
  console.log(category)
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(category?.providers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProviders = category?.providers.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollBy({
        top: -140 * parseFloat(getComputedStyle(document.documentElement).fontSize), // Scroll up by 10 times the root font size
        behavior: 'smooth' // Optional: Add smooth scrolling
      });
      
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollBy({
        top: -80 * parseFloat(getComputedStyle(document.documentElement).fontSize), // Scroll up by 10 times the root font size
        behavior: 'smooth' // Optional: Add smooth scrolling
      });
      
  };

  //   toggle sort by button
  const [sortIsActive, setSortIsActive] = useState(false);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <CategoryHero />
      <div id="topp"></div>
      <h2 className="category-name">{category.id}</h2>
      <section className="each-cate">
        <div className="found">
          <p>{category.providers.length} vendors found</p>
          <span
            className="sort-by"
            onClick={() => setSortIsActive(!sortIsActive)}>
            Sort by{" "}
            <img
              src={arrow}
              alt=""
              className={` ${sortIsActive ? "open" : ""} `}
            />
          </span>
        </div>
        <ul className={` ul-sorts ${sortIsActive ? "open" : ""} `}>
          <li>Highly Rated</li>
          <li>Location</li>
          <li>Price: Lowest to highest</li>
          <li>price: Highest to lowest</li>
        </ul>
        <div className="providers">
          {currentProviders.map((provider, index) => (
            <div key={index} className="provider-card">
              <div className="img-container">
                <img src={provider.imageUrl} alt="business image" />
              </div>
              <div className="name-price"><h3>{provider.vendor?.username}</h3> <p>{provider.pricing == "0" ? "Negotiable" : `₦${provider.pricing}`}</p></div>
              <p>{provider.description}</p>
              <div className="detail-btn" onClick={() => getProvider(provider.vendor?._id)}>
                <Link to={`/vendor/${provider.vendor?._id}`}>
                  <Button text="View Details" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
            <span onClick={prevPage} className={`direction ${currentPage === 1 ? 'disable' : ''}`} >
              <img src={arrow} alt="previous" className="prev" />
              Prev
            </span>
          <span className="page-number">
            {currentPage} of {totalPages}
          </span>
            <span
              onClick={nextPage}
              className={`direction ${currentPage === totalPages ? 'disable' : ''}`}>
              Next
              <img src={arrow} alt="next" />
            </span>
        </div>
      </section>
    </>
  );
}

export default SingleCategory;
