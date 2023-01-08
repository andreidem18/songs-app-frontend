import { useEffect, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../store/slices/app.slice';
import { addSongThunk, updateSongThunk } from '../../store/slices/songs.slice';
import ItemsSelect from '../ItemsSelect';
import ModalForm from '../ModalForm';

const defaultSong = { name: "", albumId: 0, artists: [], genres: [] }

const SongForm = ({ show, handleClose, songSelected }) => {

    const [song, setSong] = useState(defaultSong);
    const editSong = (field, value) => setSong({ ...song, [field]: value });

    useEffect(() => {
        if (songSelected) setSong(songSelected)
        else setSong(defaultSong);
    }, [songSelected])

    const { albums, artists, genres } = useSelector(state => state);
    const dispatch = useDispatch();

    const notificationError = (message) => {
        dispatch(showNotification({ variant: "danger", message }))
    }

    const saveSong = () => {
        if (!song.name) return notificationError("You must set a song name");
        if (!song.artists.length)
            return notificationError("You must select at least one artist");
        if (!song.albumId) return notificationError("You must select an album");
        if (!song.genres.length)
            return notificationError("You must select at least one genre");
        if (!songSelected) {
            dispatch(addSongThunk(song, song.artists, song.genres))
        } else {
            dispatch(updateSongThunk(songSelected.id, song, song.artists, song.genres))
        }
        setSong(defaultSong);
        handleClose();
    }

    return (
        <ModalForm show={show} handleClose={handleClose} save={saveSong} title={'Song form'}>

            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                value={song.name}
                onChange={e => editSong("name", e.target.value)}
            />

            <div className="form-title-section">
                <h3 className="mt-3">Artists</h3>
            </div>
            <ItemsSelect
                items={artists}
                itemsSelected={song.artists}
                setItemsSelected={artists => editSong("artists", artists)}
                isMultiple={true}
            />

            <div className="form-title-section">
                <h3>Album</h3>
            </div>
            <ItemsSelect
                items={albums}
                itemsSelected={song.albumId}
                setItemsSelected={album => editSong("albumId", album)}
                isMultiple={false}
            />

            <div className="form-title-section">
                <h3>Genres</h3>
            </div>
            <ItemsSelect
                items={genres}
                itemsSelected={song.genres}
                setItemsSelected={genres => editSong("genres", genres)}
                isMultiple={true}
                itemStructure={item => <Card.Body>{item.name}</Card.Body>}
            />

        </ModalForm>
    );
};

export default SongForm;