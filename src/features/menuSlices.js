import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getMenus = createAsyncThunk("menus/getMenus", async () => {
    const res = await axios.get("http://localhost:5000/menus");
    return res.data;
});

export const saveMenus = createAsyncThunk(
    "menus/saveMenus",
    async ({ nama, harga }) => {
        const res = await axios.post("http://localhost:5000/menus", {
            nama,
            harga,
        });
        return res.data;
    }
);

export const updateMenus = createAsyncThunk(
    "menus/updateMenus",
    async ({ id, nama, harga }) => {
        const res = await axios.patch(`http://localhost:5000/menus/${id}`, {
            nama,
            harga,
        });
        return res.data;
    }
);

export const deleteMenu = createAsyncThunk("menus/deleteMenu", async (id) => {
    const res = await axios.delete(`http://localhost:5000/menus/${id}`);
    return id;
});

const menuEntity = createEntityAdapter({
    selectId: (menu) => menu.id,
});

const menuSlice = createSlice({
    name: "menu",
    initialState: menuEntity.getInitialState(),
    extraReducers: {
        [getMenus.fulfilled]: (state, action) => {
            menuEntity.setAll(state, action.payload);
        },
        [saveMenus.fulfilled]: (state, action) => {
            menuEntity.addOne(state, action.payload);
        },
        [updateMenus.fulfilled]: (state, action) => {
            menuEntity.updateOne(state, {
                id: action.payload.id,
                updates: action.payload,
            });
        },
        [deleteMenu.fulfilled]: (state, action) => {
            menuEntity.removeOne(state, action.payload);
        },
    },
});

export const menuSelectors = menuEntity.getSelectors((state) => state.menu);
export default menuSlice.reducer;
