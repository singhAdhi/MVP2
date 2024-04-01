import React, { useState, useEffect } from "react";
import HorizontalCardDetail from "../../components/global/swiper/horizontal-card-detail/HorizontalCardDetail";
import { useNavigate, useParams } from "react-router-dom";
import SwiperSlider from "../../components/global/swiper/SwiperSlider";
import axios from "axios";
import "./ProductDetails.css";
import BtnPrimary from "../../components/global/buttons/btn-primary/BtnPrimary";
import BtnSecondary from "../../components/global/buttons/btn-secondary/BtnSecondary";
import SkeletonImg from "../../components/global/SkeletonImg/SkeletonImg";
import SkeletonText from "../../components/global/SkeletonText/SkeletonText";

const ProductDetails = () => {
  let [img, setImg] = useState([]);
  let [detail, setDetail] = useState(null);
  let [loading, setLoading] = useState(true);
  let [cartData, setCartData] = useState(null);
  let [count, setCount] = useState(1);
  const { id } = useParams();
  let navigate = useNavigate();
  const options = {
    direction: "horizontal",
    loop: false,
    speed: 500,
    // slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 12,
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  };
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 2000);
  }, []);

  const getProducts = async () => {
    try {
      let ShopUrl = `/src/dummyApiData/shop/GetProductById${id}_DATA.json`;
      axios
        .get(ShopUrl)
        .then((data) => {
          setImg(data?.data?.Images);
          setDetail(data?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    //     const myHeaders = new Headers();
    //     myHeaders.append(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVBOUJBNUNENTM5MzQ3NTI4QUM4MjBBOTVGMjgzQTU2NEUzNDFFNjkiLCJ4NXQiOiJXcHVselZPVFIxS0t5Q0NwWHlnNlZrNDBIbWsiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYW1lIjoiMWZiMWRiYTQtZjdiZS00M2QyLTk1YTUtOGVhNzM3NzczYzk3Iiwic3ViIjoibXZwdDJhcGl1c2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibXZwdDJhcGl1c2VyQGdpaWZ0LmNvbSIsInJvbGUiOlsiTWVnYURlbW8gTVZQVDIiLCJfX21hbmFnZXIiXSwicGVybWlzc2lvbiI6WyJwbGF0Zm9ybTphc3NldDpyZWFkIiwicGxhdGZvcm06ZHluYW1pY19wcm9wZXJ0aWVzOnJlYWQiLCJpbnZlbnRvcnk6cmVhZCIsImNhcnQ6cmVhZCIsImNhcnQ6Y3JlYXRlIiwiY2FydDphY2Nlc3MiLCJjYXJ0OnVwZGF0ZSIsImNhcnQ6ZGVsZXRlIiwib3JkZXI6Y3JlYXRlIiwib3JkZXI6cmVhZF9wcmljZXMiLCJwcmljaW5nOnJlYWQiLCJwcmljaW5nOmFjY2VzcyIsImN1c3RvbWVyUmV2aWV3czpyZWFkIiwiY3VzdG9tZXJSZXZpZXdzOnJhdGluZ1JlYWQiLCJzdG9yZTpyZWFkfFt7XCJzdG9yZUlkXCI6XCJNVlBUMlwiLFwidHlwZVwiOlwiU3RvcmVTZWxlY3RlZFNjb3BlXCIsXCJsYWJlbFwiOlwiTWVnYURlbW8gTVZQVDJcIixcInNjb3BlXCI6XCJNVlBUMlwifV0iLCJvcmRlcjpyZWFkfFt7XCJzdG9yZUlkXCI6XCJNVlBUMlwiLFwidHlwZVwiOlwiT3JkZXJTZWxlY3RlZFN0b3JlU2NvcGVcIixcImxhYmVsXCI6XCJNZWdhRGVtbyBNVlBUMlwiLFwic2NvcGVcIjpcIk1WUFQyXCJ9XSIsIm9yZGVyOnVwZGF0ZXxbe1wic3RvcmVJZFwiOlwiTVZQVDJcIixcInR5cGVcIjpcIk9yZGVyU2VsZWN0ZWRTdG9yZVNjb3BlXCIsXCJsYWJlbFwiOlwiTWVnYURlbW8gTVZQVDJcIixcInNjb3BlXCI6XCJNVlBUMlwifV0iLCJjYXRhbG9nOnJlYWR8W3tcImNhdGFsb2dJZFwiOlwiOWY0ZTkxNzEtMTQyZS00ZDA1LTk2MWMtMTRjZjk3N2RhYTRkXCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIk1lZ2FEZW1vIC1NVlBUMlwiLFwic2NvcGVcIjpcIjlmNGU5MTcxLTE0MmUtNGQwNS05NjFjLTE0Y2Y5NzdkYWE0ZFwifSx7XCJjYXRhbG9nSWRcIjpcIjdhZGFkNmZmLTc1NGYtNDY5NC1iODRlLWVlZDQ1MGViNTBjZlwiLFwidHlwZVwiOlwiU2VsZWN0ZWRDYXRhbG9nU2NvcGVcIixcImxhYmVsXCI6XCJBbWVyaWNhbiBBaXJsaW5lIEFBZGF2YW50YWdlXCIsXCJzY29wZVwiOlwiN2FkYWQ2ZmYtNzU0Zi00Njk0LWI4NGUtZWVkNDUwZWI1MGNmXCJ9LHtcImNhdGFsb2dJZFwiOlwiYTJjMmMwYTMtZGY4Mi00MmE2LWI3ODUtZDBjNjJkYjVjZDc2XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIlFhdGFyIEFpcndheXMgQVBJXCIsXCJzY29wZVwiOlwiYTJjMmMwYTMtZGY4Mi00MmE2LWI3ODUtZDBjNjJkYjVjZDc2XCJ9LHtcImNhdGFsb2dJZFwiOlwiMjA0OGE5ZWUtNjBhYy00OTg5LWJiMTItMTg1MWNlOWQ4YmM5XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIkFpciBBc2lhIC0gQmlnIFJld2FyZHNcIixcInNjb3BlXCI6XCIyMDQ4YTllZS02MGFjLTQ5ODktYmIxMi0xODUxY2U5ZDhiYzlcIn0se1wiY2F0YWxvZ0lkXCI6XCI0OGNjNDMzZS0yNDMyLTQzZWQtOWE5NC0yYzIzODgwYmMxYzlcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiRnJvbnRpZXIgTWlsZXNcIixcInNjb3BlXCI6XCI0OGNjNDMzZS0yNDMyLTQzZWQtOWE5NC0yYzIzODgwYmMxYzlcIn0se1wiY2F0YWxvZ0lkXCI6XCI0NDEyZWY5Zi03NzdhLTRhZmQtOTQzOC1mMGFhMWJlMjU0ZDNcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiSmF6cCBRYXRhciBBcGlcIixcInNjb3BlXCI6XCI0NDEyZWY5Zi03NzdhLTRhZmQtOTQzOC1mMGFhMWJlMjU0ZDNcIn0se1wiY2F0YWxvZ0lkXCI6XCIzNjk0NWYwMi1kNmI2LTQ2N2MtYTA2My1lZGMxODdhMmFkZmRcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiQ2hhcml0eSAtIElORE9ORVNJQVwiLFwic2NvcGVcIjpcIjM2OTQ1ZjAyLWQ2YjYtNDY3Yy1hMDYzLWVkYzE4N2EyYWRmZFwifSx7XCJjYXRhbG9nSWRcIjpcImJkMWZiNDhjLTY1M2EtNGIwZC1iOWRiLTNjNmI1ZDYxZDZmNVwiLFwidHlwZVwiOlwiU2VsZWN0ZWRDYXRhbG9nU2NvcGVcIixcImxhYmVsXCI6XCJXb2dpXCIsXCJzY29wZVwiOlwiYmQxZmI0OGMtNjUzYS00YjBkLWI5ZGItM2M2YjVkNjFkNmY1XCJ9LHtcImNhdGFsb2dJZFwiOlwiOWQxNmY2MWYtMzFkMy00YzdmLWFmOTQtOTUyYWQ3YmNhYTg3XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIkRyYWdvblBhc3NcIixcInNjb3BlXCI6XCI5ZDE2ZjYxZi0zMWQzLTRjN2YtYWY5NC05NTJhZDdiY2FhODdcIn0se1wiY2F0YWxvZ0lkXCI6XCI5YWYyNzk1Mi01NWUxLTQ5YjUtOTVmZC01NzNjNWY3NjBiZTRcIixcInR5cGVcIjpcIlNlbGVjdGVkQ2F0YWxvZ1Njb3BlXCIsXCJsYWJlbFwiOlwiVVRJTElUWSAtIFVBRVwiLFwic2NvcGVcIjpcIjlhZjI3OTUyLTU1ZTEtNDliNS05NWZkLTU3M2M1Zjc2MGJlNFwifSx7XCJjYXRhbG9nSWRcIjpcImM2NDllZGE5LTlkMzQtNDNiNS1hNjJjLTQ0NjJiM2Y3MmRjY1wiLFwidHlwZVwiOlwiU2VsZWN0ZWRDYXRhbG9nU2NvcGVcIixcImxhYmVsXCI6XCJNYXRjaGluZyBvdXRmaXRzIGZvciBraWRzXCIsXCJzY29wZVwiOlwiYzY0OWVkYTktOWQzNC00M2I1LWE2MmMtNDQ2MmIzZjcyZGNjXCJ9LHtcImNhdGFsb2dJZFwiOlwiZjZkOTQwZDktMmFlYy00ZGJmLWI1NjEtNjcwOGY0MzBiYjA0XCIsXCJ0eXBlXCI6XCJTZWxlY3RlZENhdGFsb2dTY29wZVwiLFwibGFiZWxcIjpcIkp1c3RMb3VuZ2UgLSAyMDI0XCIsXCJzY29wZVwiOlwiZjZkOTQwZDktMmFlYy00ZGJmLWI1NjEtNjcwOGY0MzBiYjA0XCJ9XSJdLCJtZW1iZXJJZCI6IiIsIm9pX3Rrbl9pZCI6IjljYjBjMTE1LTZjMWMtNDE2Ni05NjUwLWMwNzBkYTkyMTEzMyIsImF1ZCI6InJlc291cmNlX3NlcnZlciIsImV4cCI6MTcxMTEwNjQ3MywiaXNzIjoiaHR0cHM6Ly9zaG9wZ2F0ZXdheXVhdC5naWlmdC5jb20vIiwiaWF0IjoxNzExMDIwMTMzfQ.PwpCDfkMHZL1RwccAe1iNkykaH4kZ1hjXiCUNstPEX1s_dfY3zo6JM0UhQynQXBsvsbH6u0PV0tHAEIY04BZ85xfHl-QgXyM5J_QPPmPR4xDDX9nF0ubpwcq4gdr9i6t2M2bSQaZbYHHrcc5ZyatB6o5d2DpyAmNTZX1she5O7fFcAvW4UnI2zrOqtlCXawsmeFdb0NyZqFRneSL9O-C6gyQIjKFXcOeqUWeThQDQKu3J--lT0ylWU9FS04C4ao3MiLxGDHUY_9ezXYM_Ytr1gVOxQKbcu0Vmvb-udCSN0f2PmvYj1GF3lmacXR5BKlHJJ128-Enjtap_1Vs3joSRdonzxwI5ukjZAiZQCQfLykjYLTO4gctqHMdSe7PJ9L1pLGKFge2TBBRc7dKv-4t15x7Xt4aGlkx3F3MoPbeVKiHu3g8plrV4kh0MVJhjGNIV26vPhpTyWquQfnOKthxw1eu0tQ8mIHpWrj943-ZEUNtCdv7RNhiTcEems5WSP3gD-0eAvIjUaTI92o2l_4xLiyVanRnNPUOlY2jYshHae-sNxr0SITfOijq_h56ZuCJ9r9UBFxWWBBXelAvN1BtqGuGYY9mRW_XFhVm3H7T0oEu8x78Vlz-hkQN_-XQ6RPaR7T446yxRQXMgm5wkti0D_6Eeh--xdOs7Uh2IXagvXI"
    //     );

    //     const requestOptions = {
    //       method: "GET",
    //       headers: myHeaders,
    //       redirect: "follow",
    //     };

    //     fetch(
    //       `https://shopgatewayuat.giift.com:9081/api/StoreFront/GetProductById/${Params.id}?StoreId=MVPT2&CatalogId=9f4e9171-142e-4d05-961c-14cf977daa4d&LanguageCode=en-US&CurrencyCode=AED`,
    //       requestOptions
    //     )
    //       .then((response) => response.text())
    //       .then((result) => console.log(result))
    //       .catch((error) => console.error(error));
  };
  const searchCart = async () => {
    // try {
    //   let ShopUrl = `/src/dummyApiData/shop/SearchCart_DATA.json`;

    //   const response = await axios.get(ShopUrl);
    //   console.log(response?.data);
    //   setCartData(response?.data);
    // } catch (error) {
    //   console.log(error);
    // }

    const raw = JSON.stringify({
      StoreId: "MVPT2",
      Name: "default",
      CustomerId: "britestuser",
      CustomerName: "Tester",
      Type: null,
      CurrencyCode: "MEG",
      LanguageCode: "en-US",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  const AddOrUpdate = async () => {
    try {
      navigate("/cart");
      setCount(count + 1);
      // let addUpdateUrl = `/src/dummyApiData/shop/AddOrUpdateItenInCart.json`;
      // const response = await axios.get(addUpdateUrl);
      // console.log(response?.data);
      const existingData = localStorage.getItem("cart");
      const cartArray = JSON.parse(existingData);
      const itemExists =
        cartArray && cartArray.Items.some((item) => item.ProductId === id);

      if (!itemExists) {
        // If the item doesn't exist in the cart, add it
        cartArray.Items.push({
          ProductId: `${id}`,
          Quantity: count,
        });

        // Convert the updated cart data back to JSON string
        const updatedCart = JSON.stringify(cartArray);

        // Update the cart data in localStorage
        localStorage.setItem("cart", updatedCart);
      }

      console.log(val);
      const raw = JSON.stringify({
        CatalogId: "",
        CartId: "",
        Items: [
          {
            ProductId: `${id}`,
            Quantity: count,
          },
        ],
      });
      localStorage.setItem("cart", raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("data", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      await searchCart();
    } catch (error) {}
  };

  return (
    <div className="overflow-hidden col-12 my-4">
      <div
        className="slider mx-2 py-4 px-1"
        style={{
          borderRadius: "24px",
          background: "#fff",
        }}
      >
        {loading ? (
          <SkeletonImg height={"250px"} />
        ) : (
          <SwiperSlider
            options={options}
            slides={img.map((slide) => (
              <HorizontalCardDetail slide={slide} />
            ))}
          />
        )}
        <div className="swiper-pagination"></div>
      </div>
      <div className="content bg-white mx-2 p-4 b-radius mt-3">
        {loading ? (
          <SkeletonText />
        ) : (
          <div>
            <p className="productName">{detail?.Name}</p>
            <div className="border-bottom my-3"></div>
            <div className="">
              {detail?.Properties[8].Value.split("<li>").map((item, index) => (
                <span
                  className="Description "
                  key={index}
                  style={{ display: "block" }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-2 p-4 b-radius mt-3 d-flex justify-content-around">
        <BtnSecondary children={"ADD TO CART"} onClick={AddOrUpdate} />
        <BtnPrimary children={"BUY NOW"} />
      </div>
    </div>
  );
};

export default ProductDetails;
