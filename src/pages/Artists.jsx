import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ArtistForm from '../components/Artists/ArtistForm';
import { deleteArtistThunk } from '../store/slices/artists.slice';

const Artists = () => {

    const { artists, genres } = useSelector(state => state);
    const [ artistsFiltered, setArtistsFiltered ] = useState([]);
    useEffect(() => setArtistsFiltered(artists), [artists]);

    const filterGenre = id => {
        const artistsFormated = artists.filter(
            artist => artist.genres.some(genre => genre.id === id)
        )
        setArtistsFiltered(artistsFormated);
    }

    const [showArtistForm, setShowArtistsForm] = useState(false);
    const [artistSelected, setArtistSelected] = useState(null);
    const dispatch = useDispatch();

    const selectArtist = (artist) => {
        const artistFormated = {...artist, genres: artist.genres?.map(genre => genre.id) || []}
        setArtistSelected(artistFormated);
        setShowArtistsForm(true);
    }

    const closeForm = () => {
        setArtistSelected(null);
        setShowArtistsForm(false);
    }

    return (
        <Row>
            <Col md={3} xl={2}>
                <div><b>Filter by genre</b></div>
                <ul>
                    {genres?.map(genre => (
                        <li key={genre.id} className="filter-option" onClick={() => filterGenre(genre.id)}>
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </Col>
            <Col>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h1>Artists</h1>
                    <Button onClick={() => setShowArtistsForm(true)}>
                        Add new artist
                    </Button>
                </div>

                <ArtistForm
                    show={showArtistForm}
                    handleClose={closeForm}
                    artistSelected={artistSelected}
                />
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {artistsFiltered.map((artist) => (
                        <Col key={artist.id}>
                            <Card>
                                <Card.Img variant="top" src={artist.image} className="card-img" />
                                <Card.Body>
                                    <Card.Title>{artist.name}</Card.Title>
                                    <div><b>Country: </b>{artist.country}</div>
                                    <div><b>Year: </b>{artist.formationYear}</div>
                                    <div><b>Genres: </b>{artist.genres?.map(genre => `${genre.name} `)}</div>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant='danger'
                                            size='sm'
                                            className="me-1"
                                            onClick={() => dispatch(deleteArtistThunk(artist.id))}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </Button>
                                        <Button variant='warning' size='sm' onClick={() => selectArtist(artist)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Artists;