import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./services/PrivateRoutes";

import {
  LandingPage,
  ProductsPage,
  LoginPage,
  SignUpPage,
  SingleProductPage,
  CheckoutPage,
  AddListingPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  EditListingPage,
  CartPage,
  ProfilePage,
  ReturnCancellationPage,
  SearchResultPage,
  UsersListings,
  ContactPage,
  TermsConditionsPage,
  CategoryPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* User account */}
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />

        {/* All Products */}
        <Route path="products" element={<ProductsPage />} />
        {/* Single Products */}
        <Route path="products/:id" element={<SingleProductPage />} />

        {/* Search Result page */}
        <Route path="search/:q" element={<SearchResultPage />} />
        {/* Single Products */}
        <Route path="search/:q/products/:id" element={<SingleProductPage />} />

        {/* Search Result page */}
        <Route path="category/:id" element={<CategoryPage />} />

        <Route path="/user" element={<PrivateRoutes />}>
          {/* Info user account */}
          <Route path="/user/profile" element={<ProfilePage />} />

          {/* Add, edit Product */}
          <Route path="/user/products/:id" element={<SingleProductPage />} />
          <Route path="/user/product/add" element={<AddListingPage />} />
          <Route
            path="/user/product/update/:id"
            element={<EditListingPage />}
          />

          {/* Orders history */}
          <Route path="/user/orders" element={<ReturnCancellationPage />} />

          {/* Users listings */}
          <Route path="/user/listings" element={<UsersListings />} />
        </Route>

        {/* Info user: Buy */}
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        {/* Terms and conditions */}
        <Route
          path={"terms-and-conditions"}
          element={<TermsConditionsPage />}
        />

        {/* Contact page */}
        <Route path="contacts" element={<ContactPage />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
