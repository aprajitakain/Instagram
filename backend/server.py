from flask import Flask,request,jsonify
from flask_cors import CORS
from database import execute_query

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/notes', methods=['GET', 'POST', 'DELETE'])
def handle_notes():
    if request.method == 'GET':
        # Fetch all the notes
        query = 'SELECT * FROM notes;'
        notes = execute_query(query, fetchall=True)
        return jsonify(notes)
    elif request.method == 'POST':
        # Add a note
        data = request.json
        text = data.get('text', '')
        query = 'INSERT INTO notes (text) VALUES (%s) RETURNING *;'
        new_note = execute_query(query, (text,), fetchone=True)
        return jsonify(new_note)
    elif request.method == 'DELETE':
        note_id = request.args.get('id')
        query = 'DELETE FROM notes WHERE id = %s;'
        execute_query(query, (note_id,))
        return jsonify({'success': True})
# Add this route in your server.py

if __name__ == "__main__":
    app.run(debug=True)
