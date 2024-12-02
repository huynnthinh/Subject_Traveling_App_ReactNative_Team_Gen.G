import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  items: [],
  account: {},
  status: "idle",
  error: null,
};
export const ganUser = () => {
  async (user1) => {
    this.state.user = user1;
  };
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
export const registerAccount = createAsyncThunk(
  "accounts/registerAccount",
  async (accountData) => {
    const response = await fetch("http://10.10.88.44:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    });
    const data = await response.json();
    return data;
  }
);

export const updatePassword = createAsyncThunk(
  "accounts/updatePassword",
  async ({ accountId, password }) => {
    const response = await fetch(
      `http://10.10.88.44:3000/updatePassword/${accountId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );
    const data = await response.json();
    return data;
  }
);
export const updateInf = createAsyncThunk(
  "accounts/updateInf",
  async ({ accountId, name, diachi }) => {
    const response = await fetch(
      `http:///10.10.88.44:3000/updateInf/${accountId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, diachi }),
      }
    );
    return { name, diachi };
  }
);
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.account = {};
    },
  },
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
      })
      .addCase(registerAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.status = "idle";
        state.accounts.push(action.payload);
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateInf.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateInf.fulfilled, (state, action) => {
        const { name, diachi } = action.payload;
        state.status = "idle";
        state.account.name = name;
        state.account.diachi = diachi;
      })
      .addCase(updateInf.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setAccount, logout } = dataSlice.actions;
export default dataSlice.reducer;
