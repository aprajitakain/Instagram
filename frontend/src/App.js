import React, { useState, useEffect } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [editedNote, setEditedNote] = useState({ id: null, text: '' });

  useEffect(() => {
    // Fetch all notes when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newNoteText }),
      });

      if (response.ok) {
        console.log('Note added successfully');
        // Fetch the updated list of notes
        fetchNotes();
        // Clear the input field
        setNewNoteText('');
      } else {
        console.error('Error adding note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async () => {
    try {
      const response = await fetch(`/api/notes/${editedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editedNote.text }),
      });

      if (response.ok) {
        console.log('Note updated successfully');
        // Fetch the updated list of notes
        fetchNotes();
        // Clear the editedNote state
        setEditedNote({ id: null, text: '' });
      } else {
        console.error('Error updating note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Note deleted successfully');
        // Fetch the updated list of notes
        fetchNotes();
      } else {
        console.error('Error deleting note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((noteArray) => (
          <li key={noteArray[0]}>
            {editedNote.id === noteArray[0] ? (
              <>
                <input
                  type="text"
                  value={editedNote.text}
                  onChange={(e) => setEditedNote({ ...editedNote, text: e.target.value })}
                />
                <button onClick={updateNote}>Update</button>
              </>
            ) : (
              <>
                {noteArray[1]}
                <button onClick={() => setEditedNote({ id: noteArray[0], text: noteArray[1] })}>
                  Edit
                </button>
                <button onClick={() => deleteNote(noteArray[0])}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
    </div>
  );
};

export default App;
