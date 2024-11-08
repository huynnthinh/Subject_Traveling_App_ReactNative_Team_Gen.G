import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await fetch("http://10.10.88.44:3000/getItems");
  const data = await response.json();
  return data;
});

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const response = await fetch("http://10.10.88.44:3000/getAccounts");
    const data = await response.json();
    return data;
  }
);
export const updateItemSelection = createAsyncThunk(
  "items/updateItemSelection",
  async (itemId, { getState }) => {
    // Get current state to determine current isSelected value
    const state = getState();
    const currentItem = state.data.items.find((item) => item.id === itemId);
    const newIsSelected = !currentItem.isSelected; // Toggle isSelected value

    // Update isSelected on the server
    await fetch(`http://10.10.88.44:3000/updateIsSelected/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSelected: newIsSelected }),
    });

    return { itemId, newIsSelected };
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "idle";
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateItemSelection.fulfilled, (state, action) => {
        const { itemId, newIsSelected } = action.payload;
        const itemIndex = state.items.findIndex((item) => item.id === itemId);
        if (itemIndex >= 0) {
          state.items[itemIndex].isSelected = newIsSelected;
        }
      })
      .addCase(updateItemSelection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default dataSlice.reducer;
