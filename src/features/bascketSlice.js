import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bascket: [],
  loading: false,
};

export const fetchBascket = createAsyncThunk(
  "bascket/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/bascket");
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductInBascket = createAsyncThunk(
  "bascket/add",
  async ({ user, products, price }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/bascket/:id", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user, products, price }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductInBascket = createAsyncThunk(
  "bascket/update",
  async ({ products, price }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3030/bascket/addProduct/${products._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ products, price }),
        }
      );

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const bascketlice = createSlice({
  name: "bascketlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBascket.fulfilled, (state, action) => {
        state.bascket = action.payload.filter((item) => {
          return item === localStorage.getItem("id");
        });
      })
      .addCase(updateProductInBascket.fulfilled, (state, action) => {
        state.bascket = action.payload.products;
      })
      .addCase(addProductInBascket.fulfilled, (state, action) => {
        state.bascket.push(action.payload);
      });
  },
});

export default bascketlice.reducer;
