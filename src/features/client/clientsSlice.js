import { 
    createAsyncThunk, 
    createEntityAdapter,
    createSlice,
    createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClients = createAsyncThunk(
    'clients/fetch',
    async(_, thunkAPI) => {
        const response = await axios.get(`https://jdfao4jhc3.execute-api.us-east-1.amazonaws.com/dev/v2/admin/queued`);

        return response.data;
    }
);

let data = [
    {
        "id": 0,
        "clientId": 70,
        "shtnme": "New Client",
        "clnnme": "New Client",
        "empnum": 9995,
        "mannum": 1010,
        "clntyp": 1,
        "status": 1,
        "completed": 0,
        "done": 0,
        "state": null,
        "recnum": 9995,
        "fstnme": "Nick",
        "lstnme": "Simmons",
        "e_mail": "nicksimmons53@yahoo.com",
        "cllphn": "678-490-4449",
        "usrnme": "test",
        "passwd": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "sagePass": "password",
        "admin": 0,
        "address": [
            {
                "addrs1": "111 Street Dr",
                "addrs2": "",
                "ctynme": "Houston",
                "state_": "TX",
                "zipcde": "77380"
            },
            {
                "bilad1": "",
                "bilad2": "",
                "bilcty": "",
                "bilste": "",
                "bilzip": ""
            },
            {
                "shpad1": "",
                "shpad2": "",
                "shpcty": "",
                "shpste": "",
                "shpzip": ""
            }
        ],
        "contacts": [
            {
                "id": 91,
                "clientId": 70,
                "name": "Nicholas Simmons",
                "title": "Software Developer",
                "phone": "678-490-4449",
                "email": "nicksimmons53@yahoo.com"
            },
            {
                "id": 92,
                "clientId": 70,
                "name": "Barron Fisher",
                "title": "IT Administrator",
                "phone": "111-111-1111",
                "email": "barronf@mcsurfacesinc.com"
            }
        ],
        "advInfo": {
            "payment_freq": "Weekly",
            "autopay": 1,
            "invoice_submit": "Mail",
            "invoice_email": null,
            "invoice_addr": "450 Lockhaven Dr",
            "invoice_city": "Houston",
            "invoice_state": "TX",
            "invoice_zip": "77380",
            "payment_type": "Direct Deposit",
            "payment_portal": 1,
            "payment_url": "https://www.google.com",
            "po_required": 0,
            "invoice_req_pos": 0,
            "approvals_req": 0,
            "acc_cont_name": "Lisa Kallus",
            "acc_cont_phn": "222-222-2222",
            "acc_cont_ema": "lisak@mcsurfacesinc.com",
            "vendor_portal": "https://www.vendorportal.com",
            "vnd_portal_user": "user",
            "vnd_portal_pswd": "password",
            "job_release": "Email",
            "job_email": "job_release_email@gmail.com",
            "po_handling": 0,
            "po_hndl_email": null,
            "exp_start_date": "08-21-2021",
            "est_num_homes": 450
        },
        "programInfo": {
            "tileProgram": {
                "id": 22,
                "client_id": 70,
                "setting_material_walls": "Mapei",
                "setting_material_walls_product": "Test",
                "setting_material_floors": "Mapei",
                "setting_material_floors_product": "Test",
                "setting_material_walls_cust": null,
                "setting_material_floors_cust": null,
                "waterproof_method_shower_wall": "Fiberglass",
                "waterproof_method_tub_wall": "Plumber Provided Rubber Liner",
                "allotted_float": null,
                "allotted_float_charge": null,
                "waterproof_method": "Fiberglass",
                "waterproof_sova_constr": 1,
                "backerboard_installer": 0,
                "punch_out_material": "Colored Caulk",
                "corner_soap_dish_std": 1,
                "shower_niche_pref": "Premolded/Plastic",
                "corner_soap_dish": 0,
                "shower_seat_pref": "MC Surfaces Build",
                "shower_seat_constr": null,
                "schulter_option": "Standard",
                "pony_wall": "Test",
                "schulter_pref": 0,
                "grout_joint_size_pref": "3/16\"",
                "grout_pref": "Mapei",
                "grout_product": "Test",
                "grout_upgrade": "Test",
                "subfloor_pref": "Mud Build",
                "subfloor_other": null,
                "takeoff_resp": "Builder",
                "tile_return_walls": 0,
                "waste_pct": "Test",
                "waste_pct_walls": "Test",
                "waste_pct_floors": "Test",
                "waste_pct_mosaics": "Test",
                "wall_tile_height_opt": "Plan",
                "notes": "Test"
            },
            "woodProgram": {
                "id": 14,
                "client_id": 70,
                "glue_pref": "Test",
                "floor_trim_installer": 0,
                "floor_trim_style": "Pre-Primed",
                "second_story_hardie": "None",
                "transition_strips_std": 1,
                "hvac_req": 1,
                "takeoff_resp": "Builder",
                "waste_factor": "Test",
                "notes": "Test"
            },
            "carpetProgram": {
                "id": 16,
                "client_id": 70,
                "padding_brand_pref": "TEST2",
                "carpet_brand_pref": "TEST",
                "takeoff_resp": "MC Surfaces, Inc.",
                "waste_factor": "70%",
                "notes": "TEST"
            },
            "countertopProgram": {
                "id": 23,
                "client_id": 70,
                "material_thickness_pref": "3cm",
                "material_thickness_other": null,
                "edge_pref": "Straight/Square",
                "edge_pref_other": null,
                "waterfall_sides_std": 1,
                "faucet_holes": 1,
                "stove_range_specs": "None",
                "takeoff_resp": "Builder",
                "waste_factor": "70%",
                "notes": "None"
            },
            "cabinetProgram": {
                "id": 15,
                "client_id": 70,
                "color_pref": "Test",
                "style_pref": "Test",
                "soft_close_std": 1,
                "overlay": "Test",
                "crown_pref": "Test",
                "upper_cabinet_spec": "Test",
                "vanity_height_spec": "Test",
                "bid_type_pref": "Specific Rooms",
                "optioned_area_out": "Test ",
                "notes": "Test"
            }
        }
    },
];

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        loading: 'idle',
        values: data,
        selected: null
    },
    reducers: { 
    },
});

export default clientsSlice.reducer; 