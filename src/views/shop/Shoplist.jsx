import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HorizontalCard from "../../components/global/swiper/horizontal-card/HorizontalCard";
import CategoryMenu from "./category-menu/CategoryMenu";
import ProductCard from "../../components/global/swiper/product-card/ProductCard";
import Loading from "../../components/global/loading/Loading";
import Error from "../../components/global/error/Error";
import axios from "axios";

const Shoplist = () => {
  const [searchCategoriesData, setsearchCategoriesData] = useState(null);
  const [topCategories, setTopCategories] = useState(null);
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner1.svg",
      title: "Apple Iphone 15 Pro",
      pts: "1,150",
      deletedPts: "9,250",
      category: "Mobile",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner2.svg",
      title: "Samsung Galaxy s23",
      pts: "1,000",
      deletedPts: "3,250",
      category: "Mobile",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner3.svg",
      title: "Apple Watch Series",
      pts: "4,250",
      deletedPts: "7,250",
      category: "Mobile",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner4.svg",
      title: "Bose Quiet Comfort",
      pts: "1,255",
      deletedPts: "9,150",
      category: "Mobile",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const location = useLocation();
  const paths = location.pathname;
  const trendingProducts = location.state
    ? location.state.trendingProducts
    : [];
  //scroll screen to top onload
  useEffect(() => {
    window.scrollTo(0, 0);
    const delay = setTimeout(() => {
      matchCategory();
    }, 1000);
    GetSearchCategories();
    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, [location.pathname]);

  const matchCategory = () => {
    let pathname = location.pathname.split("/")[2];
    const filteredProducts = slides.filter(
      (item) => item.category === pathname
    );
    setCategoryProducts(filteredProducts);
    setCategoryName(pathname);
    setIsLoading(false);
    setIsError(filteredProducts.length <= 0);
  };
  const GetSearchCategories = () => {
    let url = "/src/dummyApiData/shop/SearchCategories_DATA.json";
    axios
      .post(url)
      .then(({ data }) => {
        bindMenu(data.SearchCategories_DATA);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function bindMenu(categories) {
    var mainList = [];
    if (categories && categories.length > 0) {
      var mainmenus = categories
        .filter((x) => x.ParentId == null)
        .sort((a, b) => a.Priorty - b.Priorty);

      mainmenus.forEach(function (mainMenu) {
        var categoryItem = {
          ...mainMenu,
          submenu: bindSubMenu(mainMenu.Id, categories),
        };
        mainList.push(categoryItem);
      });
      console.log(mainList);
      let res1 = mainList
        .filter((x) => x.Name === "Categories")[0]
        .submenu.filter((x) => x.Name === "Shop")[0]
        .submenu.filter((x) => x.Priorty > 0)
        .sort((a, b) => a.Priorty - b.Priorty);
      if (res1.length > 0) {
        setTopCategories(res1);
      }
      console.log(res1);
      let res = mainList
        .filter((x) => x.Name == "Categories")[0]
        .submenu.filter((x) => x.Name == "Shop")[0]
        .submenu.filter((x) => x.Name == "Trending Products");
      if (res.length > 0) {
        setsearchCategoriesData(res[0].submenu);
      }
    }
  }
  function bindSubMenu(categoryId, categories) {
    var submenuList = [];
    var menus = categories.filter((x) => categoryId === x.ParentId);

    if (menus && menus.length > 0) {
      menus.forEach(function (menu) {
        var submenuItem = {
          ...menu,
          submenu: bindSubMenu(menu.Id, categories),
        };

        submenuList.push(submenuItem);
      });
    }

    return submenuList;
  }

  // console.log(categoryProducts);
  // console.log(categoryName);

  console.log(topCategories);
  return (
    <div className="container-xl pt-3">
      {paths === `/shop/${categoryName}` && (
        <div className="row">
          <div className="col-12">
            {topCategories && <CategoryMenu category={topCategories} />}
          </div>
          {isLoading ? (
            <Loading loadingText="Loading Category Products" />
          ) : isError ? (
            <Error errorText={`${categoryName} not found`} />
          ) : (
            <div className="col-12">
              <div className="row my-3">
                <div className="col-6">
                  <p className="text-capitalize">
                    {slides.length} {categoryName} found
                  </p>
                </div>
                <div className="col-6 text-end">
                  <img
                    src="/src/assets/images/icons/common/filter.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="row">
                {/* if want to send an array */}
                {/* <ProductCard
                slide={categoryProducts.map((item) => {
                  return {
                    id: item.id,
                    imgUrl: item.imgUrl,
                    title: item.title,
                    pts: item.pts,
                    deletedPts: item.deletedPts,
                  };
                })}
              /> */}
                {/* if want to send an object */}
                {categoryProducts.map((product) => (
                  <div className="col-6 mb-3" key={product.id}>
                    <ProductCard
                      slide={{
                        id: product.id,
                        imgUrl: product.imgUrl,
                        title: product.title,
                        pts: product.pts,
                        deletedPts: product.deletedPts,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {paths === `/shoplist/${categoryName}` && (
        <div className="row">
          <div className="col-12">
            {trendingProducts &&
              trendingProducts.map((slide) => (
                <HorizontalCard slide={slide} className={"mb-2"} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shoplist;
