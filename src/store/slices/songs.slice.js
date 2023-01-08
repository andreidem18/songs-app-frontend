import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const songsSlice = createSlice({
    name: 'songs',
    initialState: [],
    reducers: {
        setSongs: (state, action) => action.payload,
        addSong: (state, action) => {
            state.push(action.payload);
        },
        removeSong: (state, action) => {
            return state.filter(song => song.id !== action.payload)
        },
        updateSong: (state, { payload: {id, song}}) => {
            const index = state.findIndex(song => song.id === id);
            state[index] = song;
        }
    }
});

export const getSongsThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async() => {
        const res = await axios.get('/songs');
        dispatch(setSongs(res.data));
    }))
}

export const addSongThunk = (song, artists, genres) => (dispatch) => {
    dispatch(genericRequestThunk(async() => {
        const { data: songRes } = await axios.post('/songs', song);
        const { data: artistsRes } = await axios.post(`/songs/${songRes.id}/artists`, artists);
        const { data: genresRes } = await axios.post(`/songs/${songRes.id}/genres`, genres);
        dispatch(addSong({ ...songRes, artists: artistsRes, genres: genresRes }));
    }, "Song added successfully"));
}

export const deleteSongThunk = id => dispatch => {
    dispatch(genericRequestThunk(async() => {
        await axios.delete('/songs/'+id);
        dispatch(removeSong(id));
    }, "Song deleted succesfully"))
}

export const updateSongThunk = (id, song, artists, genres) => (dispatch) => {
    dispatch(genericRequestThunk(async() => {
        const { data: songRes } = await axios.put('/songs/'+id, song);
        const { data: artistsRes } = await axios.post(`/songs/${id}/artists`, artists);
        const { data: genresRes } = await axios.post(`/songs/${id}/genres`, genres);
        dispatch(updateSong({ id, song: {...songRes, artists: artistsRes, genres: genresRes}}));
    }, "Song updated successfully"))
}

export const { setSongs, addSong, removeSong, updateSong } = songsSlice.actions;

export default songsSlice.reducer;
