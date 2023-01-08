import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const artistsSlice = createSlice({
    name: 'artists',
    initialState: [],
    reducers: {
        setArtists: (_, action) => action.payload,
        addArtist: (state, action) => {
            state.push(action.payload)
        },
        deleteArtist: (state, action) => {
            return state.filter(artist => artist.id !== action.payload);
        },
        updateArtist: (state, action) => {
            const { id, artist } = action.payload;
            const index = state.findIndex(artist => artist.id === id);
            state[index] = artist;
        },
    }
})

export const getArtistsThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/artists')
        dispatch(setArtists(res.data));
    }))
}

export const addArtistThunk = (artist, genres) => dispatch => {
    return dispatch(genericRequestThunk(async () => {
        const {data: artistRes} = await axios.post('/artists', artist);
        const {data: genresRes} = await axios.post(`/artists/${artistRes.id}/genres`, genres);
        dispatch(addArtist({...artistRes, genres: genresRes}));
    }, "artist added successfully"))
}

export const updateArtistThunk = (id, artist, genres) => dispatch => {
    return dispatch(genericRequestThunk(async () => {
        const {data: artistRes} = await axios.put(`/artists/${id}`, artist);
        const {data: genresRes} = await axios.post(`/artists/${id}/genres`, genres);
        dispatch(updateArtist({id, artist: {...artistRes, genres: genresRes}}));
    }))
}

export const deleteArtistThunk = (id) => dispatch => {
    return dispatch(genericRequestThunk(async () => {
        await axios.delete(`/artists/${id}`);
        dispatch(deleteArtist(id));
    }, "Artist deleted succesfully"));
}

export const { setArtists, addArtist, deleteArtist, updateArtist } = artistsSlice.actions;

export default artistsSlice.reducer;
