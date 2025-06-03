export default class NoteApi {
  static getAllNotes() {
    const saveNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return saveNotes.sort((a, b) =>
      new Date(a.updated) > new Date(b.updated) ? -1 : 1
    );
  }
  static saveNote(noteToSave) {
    const notes = NoteApi.getAllNotes();
    const existedNote = notes.find((note) => note.id == noteToSave.id);

    if (existedNote) {
      existedNote.color = noteToSave.color;
      (existedNote.title = noteToSave.title),
        (existedNote.body = noteToSave.body),
        (existedNote.updated = new Date().toISOString());
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const allnotes = NoteApi.getAllNotes();
    console.log(typeof id);

    const filteredNotes = allnotes.filter((item) => item.id !== Number(id));
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
