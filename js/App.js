import NoteApi from "./NoteAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.root = root;
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(this.root, this._handlers());
    this._refreshNote();
  }
  _refreshNote() {
    const notes = NoteApi.getAllNotes();
    this.notes = notes;
    this.view.updateNoteList(notes);
  }
  _handlers() {
    return {
      onNoteAdd: (title, body, color) => {
        const newNote = {
          title,
          body,
          color,
        };
        NoteApi.saveNote(newNote);
        this._refreshNote();
      },
      onNoteSelect: (id) => {
        console.log(id);
        const selectedNote = this.notes.find((note) => String(note.id) === id);
        this.activeNote = selectedNote;
        this.view.updateNoteItem(selectedNote);
      },
      onNoteEdit: (newTitle, newBody, color) => {
        NoteApi.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
          color: color,
        });
        this._refreshNote();
      },
      onNoteDelete: (id) => {
        NoteApi.deleteNote(id);
        this._refreshNote();
      },
    };
  }
}
