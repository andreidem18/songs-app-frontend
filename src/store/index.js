import { configureStore } from '@reduxjs/toolkit';
import albumsSlice from './slices/albums.slice';
import appSlice from './slices/app.slice';
import artistsSlice from './slices/artists.slice';
import genresSlice from './slices/genres.slice';
import songsSlice from './slices/songs.slice'

export default configureStore({
    reducer: {
        app: appSlice,
        songs: songsSlice,
        albums: albumsSlice,
        artists: artistsSlice,
        genres: genresSlice
    }
})
