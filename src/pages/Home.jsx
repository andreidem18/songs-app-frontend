import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SongForm from '../components/Home/SongForm';
import SongItem from '../components/Home/SongItem';

const Home = () => {
    const {songs, artists, genres} = useSelector(state => state);

    const [ songsFiltered, setSongsFiltered ] = useState([]);
    useEffect(() => setSongsFiltered(songs), [songs]);

    const filterSongs = (itemId, itemFilter) => {
        const filtered = songs.filter(song => 
            song[itemFilter].some(item => item.id === itemId)
        )
        setSongsFiltered(filtered);
    }

    const [showSongForm, setShowSongForm] = useState(false);
    const [songSelected, setSongSelected] = useState(null);

    const selectSong = (song) => {
        setSongSelected(song);
        setShowSongForm(true);
    }

    const closeForm = () => {
        setSongSelected(null);
        setShowSongForm(false);
    }

    return (
        <Row>
            <Col md={3} xl={2}>
                <div><b>Filter by artist</b></div>
                <ul>
                    {artists?.map(artist => (
                        <li
                            key={artist.id}
                            className="filter-option"
                            onClick={() => filterSongs(artist.id, "artists")}
                        >
                            {artist.name}
                        </li>
                    ))}
                </ul>
                <div><b>Filter by genre</b></div>
                <ul>
                    {genres?.map(genre => (
                        <li
                            key={genre.id}
                            className="filter-option"
                            onClick={() => filterSongs(genre.id, "genres")}
                        >
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </Col>
            <Col>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h1>Songs</h1>
                    <Button onClick={() => setShowSongForm(true)}>
                        Create new song
                    </Button>
                </div>

                <SongForm
                    show={showSongForm}
                    handleClose={closeForm}
                    songSelected={songSelected}
                />

                <Table hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Release year</th>
                            <th>Genre</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songsFiltered.map(song => (
                            <SongItem song={song} selectSong={selectSong} key={song.id} />
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default Home;