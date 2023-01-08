import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AlbumCard from '../components/Albums/AlbumCard';
import AlbumForm from '../components/Albums/AlbumForm';
import ArtistForm from '../components/Artists/ArtistForm';

const Albums = () => {

    const { albums, artists } = useSelector(state => state);
    const [ albumsFiltered, setAlbumsFiltered ] = useState([]);
    const [ albumSelected, setAlbumSelected ] = useState(null);
    const [ showAlbumForm, setShowAlbumForm ] = useState(false);
    useEffect(() => setAlbumsFiltered(albums), [albums]);

    const filterArtist = (id) => {
        const albumsFormated = albums.filter(album => 
            album.artistId === id   
        );
        setAlbumsFiltered(albumsFormated);
    }

    const selectAlbum = album => {
        setAlbumSelected(album);
        setShowAlbumForm(true);
    }

    const closeForm = () => {
        setShowAlbumForm(false);
        setAlbumSelected(null);
    }

    return (
        <Row>
            <Col md={3} xl={2}>
                <div><b>Filter by artist</b></div>
                <ul>
                    {artists?.map(artist => (
                        <li key={artist.id} className="filter-option" onClick={() => filterArtist(artist.id)}>
                            {artist.name}
                        </li>
                    ))}
                </ul>
            </Col>
            <Col>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h1>Albums</h1>
                    <Button onClick={() => setShowAlbumForm(true)}>
                        Add new album
                    </Button>
                </div>

                <AlbumForm
                    show={showAlbumForm}
                    handleClose={closeForm}
                    albumSelected={albumSelected}
                />
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {albumsFiltered.map((album) => (
                        <AlbumCard album={album} selectAlbum={selectAlbum} key={album.id} />
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Albums;