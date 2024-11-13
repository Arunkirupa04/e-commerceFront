import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import theme from "./Styles/Theme";
import SignUpDesk from "./Pages/User/SignUpDesk";
import LoginDesk from "./Pages/User/LoginDesk";
import { HomePage } from "./Pages/User/HomePage";
import CartPage from "./Pages/User/CartPage";
import ProductDetailPage from "./Pages/User/ProductDetailPage";
import ProductMain from "./Pages/User/ProductMain";
import WishlistPage from "./Pages/User/WishListPage";
import { SellerPage } from "./Pages/User/SellerPage";
import MyPurchasesPage from "./Pages/User/MyPurchasesPage";
import { getUserAction } from "./Actions/userAction";
import UserProfile from "./Pages/User/UserProfile";
import { UserProtectedRoute } from "./ProtectedRoutes";
import { finishLoading } from "./Reducers/authSlice";
import ForgotPassword from "./Pages/User/ForgotPassword";
import PasswordReset from "./Pages/User/PasswordReset";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserAction());
      } catch (error) {
        // Handle error
      } finally {
        dispatch(finishLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // full height of the viewport
        }}
      >
        <CircularProgress />
      </Box>
    ); // or any loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginDesk} />
          <Route path="/signup" Component={SignUpDesk} />
          <Route
            path="/productDetail/:productId"
            Component={ProductDetailPage}
          />
          <Route path="/product/:category" Component={ProductMain} />
          <Route path="/product" element={<ProductMain />} />
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/password/reset/:token" Component={PasswordReset} />

          <Route
            path="/cart"
            Component={() => (
              <UserProtectedRoute>
                <CartPage />
              </UserProtectedRoute>
            )}
          />
          <Route
            path="/wishlist"
            Component={() => (
              <UserProtectedRoute>
                <WishlistPage />
              </UserProtectedRoute>
            )}
          />
          <Route
            path="/orders"
            Component={() => (
              <UserProtectedRoute>
                <MyPurchasesPage />
              </UserProtectedRoute>
            )}
          />
          <Route
            path="/user/profile"
            Component={() => (
              <UserProtectedRoute>
                <UserProfile />
              </UserProtectedRoute>
            )}
          />

          {/* Protected Routes for Sellers */}
          <Route path="/seller">
            <Route index Component={SellerPage} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
