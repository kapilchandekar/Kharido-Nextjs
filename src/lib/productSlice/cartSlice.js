import { createSlice } from "@reduxjs/toolkit";

const getInitialCartItems = () => {
  if (typeof window !== 'undefined') {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }
  return [];
};

let initialState = {
  cartItems: getInitialCartItems(),
  shippingAddress: {},
  paymentMethod: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (state.cartItems.find((i) => i._id === item._id)) {
        alert("Item Already Existing in Cart");
      } else {
        state.cartItems = [...state.cartItems, item];
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item.availableQty < 2) {
        item.availableQty += 1;
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      } else {
        alert("We're sorry! Only 2 unit(s) allowed in each order");
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item && item.availableQty > 1) {
        item.availableQty -= 1;
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      } else if (item && item.availableQty === 1) {
        state.cartItems = state.cartItems.filter((i) => i._id !== id);
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },

    // Uncomment if needed
    // saveShippingAddress: (state, action) => {
    //   state.shippingAddress = action.payload;
    //   if (typeof window !== 'undefined') {
    //     localStorage.setItem("cart", JSON.stringify(state));
    //   }
    // },
    // savePaymentMethod: (state, action) => {
    //   state.paymentMethod = action.payload;
    //   if (typeof window !== 'undefined') {
    //     localStorage.setItem("cart", JSON.stringify(state));
    //   }
    // },
  },
});

export const selectTotalAmount = (state) => {
  const cartItems = state.cart.cartItems || [];
  return cartItems.reduce(
    (total, item) => total + item.price * item.availableQty,
    0
  );
};

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  // Uncomment if needed
  // saveShippingAddress,
  // savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
