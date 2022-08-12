import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg';

const NotePage = () => {

    const params = useParams();
    let navigate = useNavigate();

    let noteId = params.id; // we get the url parameter: id

    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [noteId])

    let getNote = async () => {
        if (noteId === 'new') return;
        let response = await fetch(`/api/notes/${noteId}`);
        let data = await response.json();
        setNote(data);
    }

    let createNote = async () => {
        fetch(`http://localhost:8000/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async() => {
        fetch(`http://localhost:8000/api/notes/${noteId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate("/", { replace: true });
    }

    let handleSubmit = () => {
        if (noteId !=='new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note.body != null) {
            createNote()
        }
        navigate("/", { replace: true });
    }

    let handleChange = (value) => {
        setNote(note => ({...note, 'body': value}))
    }

    return (
        <div className="note">
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' ? (
                     <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
               
                
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage