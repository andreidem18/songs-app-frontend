import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlbumThunk } from '../../store/slices/albums.slice';

const AlbumCard = ({ album, selectAlbum }) => {

    const artists = useSelector(state => state.artists);

    const artist = artists.find(artist => artist.id === album.artistId);

    const dispatch = useDispatch();

    return (
        <Col>
            <Card>
                <Card.Img variant="top" src={album.image} className="card-img" />
                <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <div><b>Artist: </b>{artist.name}</div>
                    <div><b>Year: </b>{album.releaseYear}</div>
                    <div className="d-flex justify-content-end">
                        <Button
                            variant='danger'
                            size='sm'
                            className="me-1"
                            onClick={() => dispatch(deleteAlbumThunk(album.id))}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                        <Button variant='warning' size='sm' onClick={() => selectAlbum(album)}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AlbumCard;