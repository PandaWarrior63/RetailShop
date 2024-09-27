import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { DatabaseHelpers } from '../utils/databaseHelper';

const InitialState = {
    name: 'POS',
    processing: false,
    customers: [],
    warehouses: [],
    open_entries: [],
    items: [],
    uoms: [],
    api_url: '',
    settings: {
        item_groups: []
    }
}

export const getAppData = createAsyncThunk(
    'app/fetchData',
    async (thunkAPI) => {
        // const token = await tokenservice.gettoken(tokenservice.token);
        // const url = await tokenservice.gettoken(tokenservice.apiUrl);
        // const response = await axios.get(url + "/api/method/sopos.api.common.data.init_data", {
        //     baseURL: url+"",
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     },
        //     withCredentials:true,
        // })
        // return response.data.message
        return null;
    }
)


const appSlice = createSlice({
    name: "app",
    initialState: InitialState,
    reducers: {
        setProcessing: (state, action) => {
            state.processing = action.payload
        },
        setOpenEntries: (state, action) => {
            state.open_entries = action.payload;        
        },
        setApiUrl: (state, action) => {
            state.api_url = action.payload;
        }

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAppData.pending, (state: any, action) => {
            state.loading = true
        }).addCase(getAppData.fulfilled, (state: any, action: any) => {
            const {customers, items, bin, payment_modes, warehouses, pos_profiles,open_entries, companies, settings, uoms, groups} = action.payload;
            state.customers = customers;
            state.payment_modes = payment_modes;
            state.warehouses = warehouses;
            state.pos_profiles = pos_profiles;
            state.companies = companies;
            state.open_entries = open_entries;
            state.uoms = uoms;
            state.settings = action.payload.settings;
            state.groups = groups;
            state.bin = bin;

            state.loading = false
        }).addCase(getAppData.rejected, (state: any, action) => {
            state.loading = false
        })
    },
})


export const appSliceActions = appSlice.actions;

export const appSliceReducer = appSlice.reducer;
