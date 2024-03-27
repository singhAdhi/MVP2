import React, { useEffect, useState } from "react";
import Hero from "./hero/Hero";
import CategoryMenu from "./category-menu/CategoryMenu";
import TrendingProducts from "./trending-products/TrendingProducts";
import Separator from "../../components/global/separator/Separator";
import ShopByBrands from "./shop-by-brands/ShopByBrands";
import BestSellers from "./best-sellers/BestSellers";
import NewArrivals from "./new-arrivals/NewArrivals";
import FadingFastDeals from "./fading-fast-deals/FadingFastDeals";
import RecentlyViewed from "./recently-viewed/RecentlyViewed";
import RecommendedForYou from "./recommended-for-you/RecommendedForYou";
import InspiredByBrowsingHistory from "./inspired-by-browsing-history/InspiredByBrowsingHistory";
import axios from "axios";

const Index = () => {
  const [searchCategoriesData, setsearchCategoriesData] = useState(null);
  const [topCategories, setTopCategories] = useState(null);

  //scroll screen to top onload
  useEffect(() => {
    window.scrollTo(0, 0);
    GetSearchCategories();
  }, []);

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

  return (
    <>
      <Hero />
      <div className="dvShop py-3">
        <div className="container-xl">
          {topCategories && <CategoryMenu category={topCategories} />}
          <Separator />
          {searchCategoriesData && (
            <TrendingProducts data={searchCategoriesData} />
          )}
          <Separator />
          <ShopByBrands />
          <Separator />
          <BestSellers />
          <Separator />
          <NewArrivals />
          <Separator />
          <FadingFastDeals />
          <Separator />
          <RecentlyViewed />
          <Separator />
          <RecommendedForYou />
          <Separator />
          <InspiredByBrowsingHistory />
        </div>
      </div>
    </>
  );
};

export default Index;
