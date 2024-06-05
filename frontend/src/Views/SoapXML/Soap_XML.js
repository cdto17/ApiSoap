import React, { useState } from 'react';
import './styles.css';

function SoapXML() {
    const [songs, setSongs] = useState([]);
    const [songsXML, setSongsXML] = useState('');
    const [showXML, setShowXML] = useState(false);
    const [showSongs, setShowSongs] = useState(false);

    const fetchSongs = () => {
        fetch('http://localhost:3001/xml/songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.text();
            })
            .then(str => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(str, "application/xml");
                const songsArray = Array.from(xmlDoc.getElementsByTagName("song")).map(song => ({
                    id: song.getElementsByTagName("id")[0].textContent,
                    title: song.getElementsByTagName("title")[0].textContent,
                    artist: song.getElementsByTagName("artist")[0].textContent,
                    year: song.getElementsByTagName("year")[0].textContent,
                    coverImage: song.getElementsByTagName("coverImage")[0].textContent,
                }));
                setSongs(songsArray);
                setSongsXML(str);
                setShowSongs(true);
            })
            .catch(error => console.error('Error fetching songs:', error));
    };

    const toggleShowXML = () => {
        setShowXML(!showXML);
    };

    return (
        <div className="container">
            <h2>Canciones Existentes</h2>
            <button onClick={fetchSongs} className="styled-button">
                Cargar Canciones y XML
            </button>
            {showSongs && (
                <div>
                    {songs.length > 0 ? (
                        <ul>
                            {songs.map(song => (
                                <li key={song.id}>
                                    <div>
                                        <h3>{song.title}</h3>
                                        <p><strong>Artista:</strong> {song.artist}</p>
                                        <p><strong>Año:</strong> {song.year}</p>
                                        <img src={song.coverImage} alt={song.title} style={{ maxWidth: '200px' }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay canciones disponibles.</p>
                    )}
                </div>
            )}
            <div className="button-container">
                <button onClick={toggleShowXML} className="styled-button">
                    {showXML ? 'Ocultar XML' : 'Mostrar XML'}
                </button>
            </div>
            {showXML && <pre className="xml-output">{songsXML}</pre>}
        </div>
    );
}

export default SoapXML;
