import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const albumsSlice = createSlice({
    name: 'albums',
    initialState: [],
    reducers: {
        setAlbums: (_, action) => action.payload,
        addAlbum: (state, action) => { state.push(action.payload) },
        deleteAlbum: (state, {payload}) => 
            state.filter(album => album.id !== payload),
        updateAlbum: (state, action) => {
            const { id, album } = action.payload;
            const index = state.findIndex(album => album.id === id);
            state[index] = album;
        }
    }
});

export const getAlbumsThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async() => {
        const res = await axios.get('/albums');
        dispatch(setAlbums(res.data));
    }))
}

export const addAlbumThunk = (album) => dispatch => {
    dispatch(genericRequestThunk(async() => {
        const res = await axios.post('/albums', album)
        dispatch(addAlbum(res.data));
    }, "Album created successfully"))
}

export const updateAlbumThunk = (album, id) => dispatch => {
    dispatch(genericRequestThunk(async() => {
        const res = await axios.put(`/albums/${id}`, album);
        dispatch(updateAlbum({id, album: res.data}));
    }, "Album updated succesfully"))
}

export const deleteAlbumThunk = id => dispatch => {
    dispatch(genericRequestThunk(async() => {
        await axios.delete(`/albums/${id}`);
        dispatch(deleteAlbum(id));
    }, "Album deleted succesfully"));
}

export const { setAlbums, addAlbum, updateAlbum, deleteAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;
