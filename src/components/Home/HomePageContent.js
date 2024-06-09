import React from "react";
import { useNavigate } from "react-router-dom";
import useMouse from "../../hooks/useMouse";

import banner from "../../images/banner1.jpg";
import product1 from "../../images/product_1.png";
import product2 from "../../images/product_2.png";
import product3 from "../../images/product_3.png";
import product4 from "../../images/product_4.png";
import product5 from "../../images/product_5.png";

import classes from "./HomePageContent.module.css";

const HomePageContent = () => {
  const imgListOne = [product1, product2];
  const imgListTwo = [product3, product4, product5];

  const navigate = useNavigate();
  const goToShopPageHandler = () => {
    navigate("shop");
  };

  const [activeImage, mouseEnterHandler, mouseLeaveHandler] = useMouse();

  return (
    <div className={classes.container}>
      {/* Banner */}

      <div className={classes.banner}>
        <img src={banner} alt="banner1" />
        <div className={classes.bannerInfo}>
          <span>NEW INSPIRATION 2020</span>
          <span>20% OFF ON NEW SEASON</span>
          <button>Browse collections</button>
        </div>
      </div>

      {/* Product list */}

      <div className={classes.productList}>
        <div className={classes.productTitle}>
          <span>CAREFULLY CREATED COLLECTIONS</span>
          <span>BROWSE OUR CATEGORIES</span>
        </div>

        {/* Product list 1st */}

        <div className={classes.listOne}>
          {imgListOne.map((curr, ind) => (
            <img
              className={activeImage === ind ? classes.dimmed : ""}
              src={curr}
              alt={`product-${ind}`}
              key={`product-${ind}`}
              onMouseEnter={() => mouseEnterHandler(ind)}
              onMouseLeave={mouseLeaveHandler}
              onClick={goToShopPageHandler}
            />
          ))}
        </div>

        {/* Product list 2nd */}

        <div className={classes.listTwo}>
          {imgListTwo.map((curr, ind) => (
            <img
              className={activeImage === ind + 2 ? classes.dimmed : ""}
              src={curr}
              alt={`product-${ind + 2}`}
              key={`product-${ind + 2}`}
              onMouseEnter={() => mouseEnterHandler(ind + 2)}
              onMouseLeave={mouseLeaveHandler}
              onClick={goToShopPageHandler}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePageContent;
