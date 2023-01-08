import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbumThunk, updateAlbum, updateAlbumThunk } from '../../store/slices/albums.slice';
import ItemsSelect from '../ItemsSelect';
import ModalForm from '../ModalForm';

const defaultAlbum = {name: "", image: "", releaseYear: "", artistId: 0}

const AlbumForm = ({ show, handleClose, albumSelected }) => {

    const [ album, setAlbum ] = useState(defaultAlbum);

    const artists = useSelector(state => state.artists);

    const editAlbum = (field, value) => setAlbum({...album, [field]: value});

    const dispatch = useDispatch();

    const notificationError = (message) => {
        dispatch(showNotification({ variant: "danger", message }))
    }

    useEffect(() => {
        if(albumSelected) setAlbum(albumSelected);
        else setAlbum(defaultAlbum);
    }, [albumSelected])

    const saveAlbum = () => {
        if(!album.artistId) notificationError("You must select one artist");
        if(!albumSelected){
            dispatch(addAlbumThunk(album))
        } else {
            dispatch(updateAlbumThunk(album, albumSelected.id));
        }
        handleClose()
    }

    return (
        <ModalForm show={show} handleClose={handleClose} save={saveAlbum} title="Album form" >
            <Row className="mb-3">
                <Col>
                    <Form.Control 
                        placeholder='Album Name'
                        value={album.name}
                        onChange={e => editAlbum("name", e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control 
                        placeholder='Release year'
                        value={album.releaseYear}
                        onChange={e => editAlbum("releaseYear", e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={9}>
                    <Form.Control 
                        placeholder='Image URL' 
                        value={album.image}
                        onChange={e => editAlbum("image", e.target.value)}
                    />
                </Col>
                <Col>
                    <img src={album.image} className="form-artist-img" alt="" />
                </Col>
            </Row>
            <h3 className="mt-3">Artist</h3>
            <ItemsSelect
                items={artists}
                itemsSelected={album.artistId}
                setItemsSelected={e => editAlbum("artistId", e)}
                isMultiple={false}
            />
        </ModalForm>
    );
};

export default AlbumForm;