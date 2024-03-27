import React, { useEffect, useState } from "react";
import Hero from "./hero/Hero";
import Credentials from "./credentials/Credentials";
import ClimbingLadder from "./climbing-ladder/ClimbingLadder";
import Separator from "../../components/global/separator/Separator";
import WhatsHotRightNow from "./whats-hot-right-now/WhatsHotRightNow";
import RedemptionMenu from "./redemption-menu/RedemptionMenu";
import TurnPointsIntoDiscounts from "./turn-points-into-discounts/TurnPointsIntoDiscounts";
import FlyBeyondBorders from "./fly-beyond-borders/FlyBeyondBorders";
import StaysAround from "./stays-around/StaysAround";
import JanuaryGrandPrize from "./january-grand-prize/JanuaryGrandPrize";
import MilesExchange from "./miles-exchange/MilesExchange";
import ExclusiveLounge from "./exclusive-lounge/ExclusiveLounge";
import EarnPoints from "./earn-points/EarnPoints";
import FadingFastDeals from "./fading-fast-deals/FadingFastDeals";
import ExperienceLiveSports from "./experience-live-sports/ExperienceLiveSports";
import UnlockGaming from "./unlock-gaming/UnlockGaming";
import EraseTransactions from "./erase-transactions/EraseTransactions";
import ManageBills from "./manage-bills/ManageBills";
import BoostSavings from "./boost-savings/BoostSavings";
import PointsForGood from "./points-for-good/PointsForGood";
import YourWishlistOffers from "./your-wishlist-offers/YourWishlistOffers";
import FooterNav from "./footer-nav/FooterNav";
import axios from "axios";

const Index = () => {
  const [searchCategoriesData, setsearchCategoriesData] = useState(null);

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
      setsearchCategoriesData(mainList);
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

  const renderComponent = (children) => (
    <>
      {children}
      <Separator />
    </>
  );
  const renderSwitch = (param, data) => {
    switch (param) {
      case "What's Hot Right Now":
        return renderComponent(<WhatsHotRightNow data={data} />);
      case "Categories":
        return renderComponent(<RedemptionMenu data={data} />);
      case "Turn points into Discounts":
        return renderComponent(<TurnPointsIntoDiscounts data={data} />);
      case "Fly Beyond Borders":
        return renderComponent(<FlyBeyondBorders data={data} />);
      case "Stays Around the Globe":
        return renderComponent(<StaysAround name={param} data={data} />);
      case "Escape to Adventure Bliss":
        return renderComponent(<StaysAround name={param} data={data} />);
      case "Experience the Live Sports":
        return renderComponent(<ExperienceLiveSports data={data} />);
      case "Unlocking Gaming Adventures":
        return renderComponent(<UnlockGaming data={data} />);
      case "Points for Good":
        return renderComponent(<PointsForGood data={data} />);
      default:
        return null;
    }
  };

  const isComponentsPresent = (name) => {
    let data =
      searchCategoriesData &&
      searchCategoriesData.filter((x) => x.Name == name);
    if (data && data.length > 0) {
      return data[0].submenu.length > 0
        ? renderSwitch(name, data[0].submenu)
        : null;
    } else {
      return null;
    }
  };

  return (
    <>
      <Hero />
      <Credentials />
      <div className="dvHome py-3">
        <div className="container-xl">
          {searchCategoriesData &&
            searchCategoriesData.map((x) => (
              <div key={x.Id}>{isComponentsPresent(x.Name)}</div>
            ))}
          <JanuaryGrandPrize />
          <Separator />
          <MilesExchange />
          <Separator />
          <ExclusiveLounge />
          <Separator />
          <EarnPoints />
          <Separator />
          <ClimbingLadder />
          <Separator />
          <FadingFastDeals />
          <Separator />
          <EraseTransactions />
          <Separator />
          <ManageBills />
          <Separator />
          <BoostSavings />
          <Separator />
          <YourWishlistOffers />
          <Separator />
          <FooterNav />
          <Separator />
        </div>
      </div>
    </>
  );
};

export default Index;
