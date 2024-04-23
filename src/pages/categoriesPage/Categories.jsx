/* eslint-disable react/prop-types */
import "./styles.css";
import star from "../../assets/svg/star.svg";
import Button from "../../components/button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import arrowSvg from "../../assets/svg/arrow.svg";
import CategoryHero from "../../components/categoryHero/CategoryHero";

const Categories = ({categories}) => {
  const [activeTag, setActiveTag] = useState(0);

  // console.log(categories)

  return (
    <>
      <div id="top"></div>
      <section className="cate-page">
        <CategoryHero />
        <div className="tags-wrapper padding-y">
          <div
            className={`tags ${activeTag === 0 ? "active " : ""}`}
            onClick={() => setActiveTag(0)}>
            All Categories
          </div>
          {categories.map((item) => (
            <Link
              to={`/categories/${item.id}`}
              key={item.id}
              className={`tags ${activeTag === item.id ? "active" : ""}`}
              onClick={() => setActiveTag(item.id)}>
              {item.id}
            </Link>
          ))}
        </div>
      </section>

      {/* heading/intro */}
      <section className="all-cate-intro">
        <h2>All Categories</h2>
        <div>
          <p>
            Get Handy and Talented professionals in every area to get your work
            done easier and faster. We are here to to ease you of the stress of
            searching for Service Providers
          </p>
        </div>
      </section>

      {/* categories */}
      <section className="each-cate">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="cate-nav-area">
              <h2>{category.id}</h2>
              <Link to={`/categories/${category.id}`} className="see-more">
                View More <img src={arrowSvg} alt="" />
              </Link>
            </div>
            <div className="providers">
              {category.providers.slice(0, 3).map((detail, index) => (
                <div key={index} className="provider-card">
                  <div className="img-container">
                    <img src={detail.imageUrl} alt={detail.description} />
                  </div>
                  <div className="name-price"><h3>{detail.vendor?.username}</h3><p> {`${index%3 == 0 ? "4.5" : (index%2 == 0 ? "4.7" : "4.3")}`} <img src={star} alt="rating" /></p></div>
                  <p>{detail.description}</p>
                  <div className="detail-btn">
                    <Link to={`/vendor/${detail.vendor?._id}`}>
                      <Button text="View Details" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Categories;
