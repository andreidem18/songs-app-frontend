import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSongThunk } from '../../store/slices/songs.slice';

const SongItem = ({ song, selectSong }) => {

    const albums = useSelector(state => state.albums);

    const album = albums.find(album => album.id === song.albumId);

    const dispatch = useDispatch();

    const update = () => {
        selectSong({
            ...song,
            genres: song.genres?.map(genre => genre.id) || [],
            artists: song.artists?.map(artist => artist.id) || []
        })
    }

    return (
        <>
            <tr>
                <td className="song-column">
                    <img src={album?.image} alt="" />
                    <div className="song-title">
                        {song.name}
                        <br />
                        <div className="text-muted">
                            {song.artists?.[0]?.name}
                        </div>
                    </div>
                </td>
                <td>{album?.name}</td>
                <td>{album?.releaseYear}</td>
                <td>
                    {song.genres?.[0]?.name}
                    {song.genres?.[1] && ', ' + song.genres[1].name}
                </td>
                <td>
                    <Button 
                        variant='danger'
                        size='sm'
                        className="me-1"
                        onClick={() => dispatch(deleteSongThunk(song.id))}
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </Button>
                    <Button variant='warning' size='sm' onClick={update}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default SongItem;