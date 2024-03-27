import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HorizontalCard from "../../components/global/swiper/horizontal-card/HorizontalCard";
import CategoryMenu from "./category-menu/CategoryMenu";
import ProductCard from "../../components/global/swiper/product-card/ProductCard";
import Loading from "../../components/global/loading/Loading";
import Error from "../../components/global/error/Error";
import axios, { Axios } from "axios";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  const [searchCategoriesData, setsearchCategoriesData] = useState(null);
  const [topCategories, setTopCategories] = useState(null);
  const [productElectronic, setProductElectronic] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const Params = useParams();

  const location = useLocation();
  const paths = location.pathname;
  const trendingProducts = location.state
    ? location.state.trendingProducts
    : [];
  //scroll screen to top onload
  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
    const delay = setTimeout(() => {
      matchCategory();
    }, 1000);
    GetSearchCategories();
    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, [location.pathname]);

  const getProducts = async () => {
    try {
      let ShopUrl = `/src/dummyApiData/shop/SearchProducts${Params.category}_DATA.json`;
      axios
        .post(ShopUrl)
        .then(({ data }) => {
          setProductElectronic(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    // const myHeaders = new Headers();
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVBOUJBNUNENTM5MzQ3NTI4QUM4MjBBOTVGMjgzQTU2NEUzNDFFNjkiLCJ4NXQiOiJXcHVselZPVFIxS0t5Q0NwWHlnNlZrNDBIbWsiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYW1lIjoiMWZiMWRiYTQtZjdiZS00M2QyLTk1YTUtOGVhNzM3NzczYzk3Iiwic3ViIjoibXZwdDJhcGl1c2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibXZwdDJhcGl1c2VyQGdpaWZ0LmNvbSIsInJvbGUiOlsiTWVnYURlbW8gTVZQVDIiLCJfX21hbmFnZXIiXSwicGVybWlzc2lvbiI6WyJwbGF0Zm9ybTphc3NldDpyZWFkIiwicGxhdGZvcm06ZHluYW1pY19wcm9wZXJ0aWVzOnJlYWQiLCJpbnZlbnRvcnk6cmVhZCIsImNhcnQ6cmVhZCIsImNhcnQ6Y3JlYXRlIiwiY2FydDphY2Nlc3MiLCJjYXJ0OnVwZGF0ZSIsImNhcnQ6ZGVsZXRlIiwib3JkZXI6Y3JlYXRlIiwib3JkZXI6cmVhZF9wcmljZXMiLCJwcmljaW5nOnJlYWQiLCJwcmljaW5nOmFjY2VzcyIsImN1c3RvbWVyUmV2aWV3czpyZWFkIiwiY3VzdG9tZXJSZXZpZXdzOnJhdGluZ1JlYWQiLCJzdG9yZTpyZWFkfFt7XCJzdG9yZUlkXCI6XCJNVlBUMlwiLFwidHlwZVwiOlwiU3RvcmVTZWxlY3RlZFNjb3BlXCIsXCJsYWJlbFwiOlwiTWVnYURlbW8gTVZQVDJcIixcInNjb3BlXCI6XCJNVlBUMlwifV0iLCJvcmRlcjpyZWFkfFt7XCJzdG9yZUlkXCI6XCJNVlBUMlwiLFwidHlwZVwiOlwiT3JkZXJTZWxlY3RlZFN0b3JlU2NvcGVcIixcImxhYmVsXCI6XCJNZWdhRGVtbyBNVlBUMlwiLFwic2NvcGVcIjpcIk1WUFQyXCJ9XSIsIm9yZGVyOnVwZGF0ZXxbe1wic3RvcmVJZFwiOlwiTVZQVDJcIixcInR5cGVcIjpcIk9yZGVyU2VsZWN0ZWRTdG9yZVNjb3BlXCIsXCJsYWJlbFwiOlwiTWVnYURlbW8gTVZQVDJcIixcInNjb3BlXCI6XCJNVlBUMlwifV0iLCJjYXRhbG9nOnJlYWR8W3tcImNhdGFsb2dJZFwiOlwiOWY0ZTkxNzEtMTQyZS00ZDA1LTk2MWMtMTRjZjk3N2RhYTRkXCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIk1lZ2FEZW1vIC1NVlBUMlwiLFwic2NvcGVcIjpcIjlmNGU5MTcxLTE0MmUtNGQwNS05NjFjLTE0Y2Y5NzdkYWE0ZFwifSx7XCJjYXRhbG9nSWRcIjpcIjdhZGFkNmZmLTc1NGYtNDY5NC1iODRlLWVlZDQ1MGViNTBjZlwiLFwidHlwZVwiOlwiU2VsZWN0ZWRDYXRhbG9nU2NvcGVcIixcImxhYmVsXCI6XCJBbWVyaWNhbiBBaXJsaW5lIEFBZGF2YW50YWdlXCIsXCJzY29wZVwiOlwiN2FkYWQ2ZmYtNzU0Zi00Njk0LWI4NGUtZWVkNDUwZWI1MGNmXCJ9LHtcImNhdGFsb2dJZFwiOlwiYTJjMmMwYTMtZGY4Mi00MmE2LWI3ODUtZDBjNjJkYjVjZDc2XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIlFhdGFyIEFpcndheXMgQVBJXCIsXCJzY29wZVwiOlwiYTJjMmMwYTMtZGY4Mi00MmE2LWI3ODUtZDBjNjJkYjVjZDc2XCJ9LHtcImNhdGFsb2dJZFwiOlwiMjA0OGE5ZWUtNjBhYy00OTg5LWJiMTItMTg1MWNlOWQ4YmM5XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIkFpciBBc2lhIC0gQmlnIFJld2FyZHNcIixcInNjb3BlXCI6XCIyMDQ4YTllZS02MGFjLTQ5ODktYmIxMi0xODUxY2U5ZDhiYzlcIn0se1wiY2F0YWxvZ0lkXCI6XCI0OGNjNDMzZS0yNDMyLTQzZWQtOWE5NC0yYzIzODgwYmMxYzlcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiRnJvbnRpZXIgTWlsZXNcIixcInNjb3BlXCI6XCI0OGNjNDMzZS0yNDMyLTQzZWQtOWE5NC0yYzIzODgwYmMxYzlcIn0se1wiY2F0YWxvZ0lkXCI6XCI0NDEyZWY5Zi03NzdhLTRhZmQtOTQzOC1mMGFhMWJlMjU0ZDNcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiSmF6cCBRYXRhciBBcGlcIixcInNjb3BlXCI6XCI0NDEyZWY5Zi03NzdhLTRhZmQtOTQzOC1mMGFhMWJlMjU0ZDNcIn0se1wiY2F0YWxvZ0lkXCI6XCIzNjk0NWYwMi1kNmI2LTQ2N2MtYTA2My1lZGMxODdhMmFkZmRcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiQ2hhcml0eSAtIElORE9ORVNJQVwiLFwic2NvcGVcIjpcIjM2OTQ1ZjAyLWQ2YjYtNDY3Yy1hMDYzLWVkYzE4N2EyYWRmZFwifSx7XCJjYXRhbG9nSWRcIjpcImJkMWZiNDhjLTY1M2EtNGIwZC1iOWRiLTNjNmI1ZDYxZDZmNVwiLFwidHlwZVwiOlwiU2VsZWN0ZWRDYXRhbG9nU2NvcGVcIixcImxhYmVsXCI6XCJXb2dpXCIsXCJzY29wZVwiOlwiYmQxZmI0OGMtNjUzYS00YjBkLWI5ZGItM2M2YjVkNjFkNmY1XCJ9LHtcImNhdGFsb2dJZFwiOlwiOWQxNmY2MWYtMzFkMy00YzdmLWFmOTQtOTUyYWQ3YmNhYTg3XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIkRyYWdvblBhc3NcIixcInNjb3BlXCI6XCI5ZDE2ZjYxZi0zMWQzLTRjN2YtYWY5NC05NTJhZDdiY2FhODdcIn0se1wiY2F0YWxvZ0lkXCI6XCI5YWYyNzk1Mi01NWUxLTQ5YjUtOTVmZC01NzNjNWY3NjBiZTRcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiVVRJTElUWSAtIFVBRVwiLFwic2NvcGVcIjpcIjlhZjI3OTUyLTU1ZTEtNDliNS05NWZkLTU3M2M1Zjc2MGJlNFwifSx7XCJjYXRhbG9nSWRcIjpcImM2NDllZGE5LTlkMzQtNDNiNS1hNjJjLTQ0NjJiM2Y3MmRjY1wiLFwidHlwZVwiOlwiU2VsZWN0ZWRDYXRhbG9nU2NvcGVcIixcImxhYmVsXCI6XCJNYXRjaGluZyBvdXRmaXRzIGZvciBraWRzXCIsXCJzY29wZVwiOlwiYzY0OWVkYTktOWQzNC00M2I1LWE2MmMtNDQ2MmIzZjcyZGNjXCJ9LHtcImNhdGFsb2dJZFwiOlwiZjZkOTQwZDktMmFlYy00ZGJmLWI1NjEtNjcwOGY0MzBiYjA0XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIkp1c3RMb3VuZ2UgLSAyMDI0XCIsXCJzY29wZVwiOlwiZjZkOTQwZDktMmFlYy00ZGJmLWI1NjEtNjcwOGY0MzBiYjA0XCJ9XSJdLCJtZW1iZXJJZCI6IiIsIm9pX3Rrbl9pZCI6IjU0NjM5ZjA0LTU0NjQtNDkyOS1hNjE0LTY4ZTNiM2UyYjhlZSIsImF1ZCI6InJlc291cmNlX3NlcnZlciIsImV4cCI6MTcxMTAwNDMzOSwiaXNzIjoiaHR0cHM6Ly9zaG9wZ2F0ZXdheXVhdC5naWlmdC5jb20vIiwiaWF0IjoxNzEwOTE3OTk5fQ.aTKuRyUebMUz6smpjbJzvSO6SCqFZOuqdPH1ODQtr2Ds1QANpgOPUJMQaZV4SZEaBzuXPubLakb9-zneY_jBsDvwX6n4yHxyJJxCXlwpqCyDGH3F7Y6btH3JPQrzsBWjHyEBctqtMjI-hO_EtB73_g6-Lx7y3I8d5Eul2-hkA91-EwO89qy5RuDpH2GPRSu4NkL9cGnd-A7S6WMIwHaFir69I99sXoj3eIgiHsh8X42y9KPq7XbSwQRxee_XeQotnbChlt6WAtJjvnO9YoBspuXSM9hY3j__l6uBQTV2P058H66Dl1Sr3cFXXCEp2JdHGgb6KFh9FFIbQ-X5MH1g8EO1jVfpLM-O3DdF8jUmVjkfF6tFQyOuJ7HVrDoSkTfnEOtAGyAv321nfidP_qoDsa6i0lQ_XRzCS9v8-NEcjWpVoa5w6H08Cizw0_0Rbfu0NRkrBx2XUNQP7EaZg8BoGDlnGYQUd_E5XFj1gX_AzBEUtw84M6cgdJcJ_qk7-a3bKJlEA56MhIGoWzjJYoNAIJR-6S9PgDwaivA-dAvxODreuv6oEV2Ow3Qm0NvByh2oyMf1-Nh05VuBEyFWRLXSlzj43BOagyeswboLmn_dCcQd3U-hdYVYHd0Gp_HPjoiQb3rf7C57isuPfXJbq8ci4YT88Mn_hSbooG1AuxFr1IM"
    // );
    // myHeaders.append("Content-Type", "application/json");

    // const raw = JSON.stringify({
    //   StoreId: "MVPT2",
    //   CatalogId: "9f4e9171-142e-4d05-961c-14cf977daa4d",
    //   ResponseGroup: "ItemLarge",
    //   Outline: `${Params.Id}`,
    //   Currency: "MEG",
    //   LanguageCode: "en-US",
    //   Skip: 0,
    //   Take: 10,
    //   Terms: "",
    // });

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(
    //   "https://shopgatewayuat.giift.com:9081/api/StoreFront/SearchProducts",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
  };

  const matchCategory = () => {
    let pathname = location.pathname.split("/")[2];
    const filteredProducts = productElectronic?.Products.filter(
      (item) => item.category === pathname
    );
    setCategoryProducts(filteredProducts);
    setCategoryName(pathname);
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
  console.log(productElectronic);
  return (
    <div className="container-xl pt-3">
      {paths === `/shop/${categoryName}/${Params.Id}` && (
        <div className="row">
          <div className="col-12 mb-4">
            {topCategories && <CategoryMenu category={topCategories} />}
          </div>
          <div className="mb-4 col-12 d-flex flex-wrap">
            {categoryName === "Sports" || categoryName === "Electronics" ? (
              productElectronic &&
              productElectronic?.Products.map((product) => (
                <div className="col-6 ps-1 pe-1 mb-2">
                  <Link
                    to={`/ProductDetails/${product.Id}`}
                    className=""
                    key={product.Id}
                  >
                    <ProductCard
                      slide={{
                        id: product.Id,
                        imgUrl: product.PrimaryImage?.Url,
                        title: product.Name,
                        pts: product.Price?.ActualPrice?.Amount,
                        deletedPts: product.Price?.ActualPrice?.Amount,
                      }}
                    />
                  </Link>
                </div>
              ))
            ) : (
              // Render an error message for other categories
              <div className="col-12">
                <Error errorText={"Error: Category not supported"} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
