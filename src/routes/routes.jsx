import RootLayout from "../views/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home/Index";
import Shop from "../views/shop/Index";
import Flight from "../views/flight/index";
import PageNotFound from "../components/global/pagenotfound/PageNotFound";
import FlightList from "../views/flight/flight-list/FlightList";
import Shoplist from "../views/shop/Shoplist";
import FlightPassenger from "../views/flight/flight-passenger/FlightPassenger";
import FlightAnimate from "../views/flight/flight-animate/FlightAnimate";
import PaymentSplit from "../views/flight/flight-paymentSplit/PaymentSplit";
import FlightTicket from "../views/flight/flight-ticket/FlightTicket";
import FlightBookingDetail from "../views/flight/Flight-detail/FlightBookingDetail";
import Category from "../views/shop/Category";
import ProductDetails from "../views/shop/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category/:Id", element: <Category /> },
      { path: "/shoplist/:category", element: <Shoplist /> },
      { path: "/ProductDetails/:id", element: <ProductDetails /> },
      { path: "/flights", element: <Flight /> },
      { path: "*", element: <PageNotFound /> },
      {
        path: "/FlightList/:OriginLocation/:DestinationLocation/:DepartureDate/:ReturnDate?/:Adults/:Childrens/:Infants/:AirlinePrefCode/:travelClass/:IsReturn",
        element: <FlightList />,
      },
      {
        path: "/FlightPassenger/:Adults/:Childrens/:Infants",
        element: <FlightPassenger />,
      },
      {
        path: "/FlightAnimate",
        element: <FlightAnimate />,
      },
      {
        path: "/PaymentSplit",
        element: <PaymentSplit />,
      },
      {
        path: "/FlightTicket",
        element: <FlightTicket />,
      },
      {
        path: "/FlightBookingDetail",
        element: <FlightBookingDetail />,
      },
    ],
  },
]);

export default router;
