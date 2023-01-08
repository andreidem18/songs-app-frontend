import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import ModalForm from '../ModalForm';
import ItemsSelect from '../ItemsSelect';
import { useDispatch, useSelector } from 'react-redux';
import { addArtistThunk, updateArtistThunk } from '../../store/slices/artists.slice';

const defaultArtist = { name: "", country: "", formationYear: "", image: "", genres: [] };

const ArtistForm = ({ show, handleClose, artistSelected }) => {

    const [artist, setArtist] = useState(defaultArtist);
    const editArtist = (field, value) => setArtist({ ...artist, [field]: value });
    const { genres } = useSelector(state => state);
    const dispatch = useDispatch();

    const notificationError = (message) => {
        dispatch(showNotification({ variant: "danger", message }))
    }

    useEffect(() => {
        if (artistSelected) setArtist(artistSelected);
        else setArtist(defaultArtist);
    }, [artistSelected]);

    const saveArtist = () => {
        if(!artist.genres.length) 
            return notificationError("You must select at least one genre");
        if(!artistSelected){
            dispatch(addArtistThunk(artist, artist.genres));
        } else {
            dispatch(updateArtistThunk(artistSelected.id, artist, artist.genres));
        }
        handleClose();
    }

    return (

        <ModalForm show={show} handleClose={handleClose} save={saveArtist} title="Artist form">
            <img src={artist.image} className="form-artist-img" alt="" />
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder='name'
                        value={artist.name}
                        onChange={e => editArtist("name", e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder='Formation year'
                        value={artist.formationYear}
                        onChange={e => editArtist("formationYear", e.target.value)}
                    />
                </Col>
            </Row>
            <Form.Control
                type="text"
                placeholder='country'
                value={artist.country}
                onChange={e => editArtist("country", e.target.value)}
                className="mb-3"
            />
            <Form.Control
                type="text"
                placeholder='image URL'
                value={artist.image}
                onChange={e => editArtist("image", e.target.value)}
                className="mb-3"
            />
            <ItemsSelect 
                items={genres}
                setItemsSelected={e => editArtist("genres", e)}
                itemsSelected={artist.genres}
                itemStructure={genre => <Card.Body>{genre.name}</Card.Body>}
            />
        </ModalForm>
    );
};

export default ArtistForm;