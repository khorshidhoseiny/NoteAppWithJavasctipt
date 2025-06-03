export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.activeNote = null;
    this.onNoteDelete = onNoteDelete;
    this.onNoteSelect = onNoteSelect;
    this.root.innerHTML = `<section class="bg-gray-100 ml-3 rounded-xl col-span-12">
        <!-- ADD NEW NOTE -->
        <div class="flex justify-center w-3/6 mx-auto space-y-2 items-center">
          <h2
            class="font-bold flex gap-x-5 text-stone-800 mt-10 p-3 bg-gradient-to-r to-blue-300/60 from-purple-300/60 transition-all duration-200 ease-in-out hover:bg-gradient-to-l rounded-lg bg-white text-xl"
          >
            یک یادداشت جدید اضافه کن ✍🏻
            <button
              class="bg-indigo-400  AddNote hover:bg-indigo-600 cursor-pointer rounded-lg flex justify-center w-10 h-10 p-2 items-center"
            >
              <i class="fa-solid text-white fa-plus"></i>
            </button>
          </h2>
        </div>
        <!-- add & modifier note -->
        <div
        id="note_modifier"
        class="border-t mt-4 hidden border-gray-300 w-full px-3 py-2">
       
        <button class="flex text-gray-500 rounded-full hover:text-gray-200 items-start justify-center w-7 h-7  hover:bg-gray-400 p-2" id="closeBtn"><i class="fa-solid fa-x"></i></button>
          <form
            class="addNoteForm justify-center p-3 items-center w-full space-y-3"
          >
            <label class="font-semibold text-gray-500 mb-3" for="note__title"
              >عنوان
            </label>
            <input
              id="note__title"
              type="text"
              class="bg-white border focus:shadow-lg border-gray-300 rounded-md w-full transition-all duration-200 ease-in-out ring-0 outline-none"
            />
            <label class="font-semibold text-gray-500 mb-3" for="note__body"
              >متن یادداشت</label
            >
            <textarea
              id="note__body"
              type="text"
              class="bg-white border border-gray-300 focus:shadow-lg rounded-md h-32 resize-none w-full transition-all duration-200 ease-in-out ring-0 outline-none"
            ></textarea>

            <h3 class="mb-5">رنگ پس زمینه ی یادداشت :</h3>
            <div class="flex mb-4 justify-start items-center gap-x-5">
            <label for="yellow">
              <input
                id="yellow"
                type="radio"
                value="yellow"
                name="noteColor"
                class="w-7 h-7 bg-yellow-500 focus:ring-yellow-500 focus:ring-2 focus:border-yellow-500 focus:border"
              />
              </label>
              <label for="green">
              <input
                id="green"
                type="radio"
                value="green"
                name="noteColor"
                class="w-7 h-7 bg-green-500 focus:ring-green-500 focus:ring-2 focus:border-green-500 focus:border"
              />
              </label>
              <label for="pink">
              <input
                id="pink"
                type="radio"
                value="pink"
                name="noteColor"
                class="w-7 h-7 bg-pink-500 focus:ring-pink-500 focus:ring-2 focus:border-pink-500 focus:border"
              />
              </label>
              <label for="blue">
              <input
                checked
                id="blue"
                type="radio"
                value="blue"
                name="noteColor"
                class="w-7 h-7 bg-blue-500 focus:ring-blue-500 focus:ring-2 focus:border"
              />
              </label>
            </div>
            <button
              id="AddNewNote"
              class="hover:bg-indigo-500 bg-indigo-300 transition-all duration-200 ease-in-out text-indigo-900 rounded-md w-full cursor-pointer hover:text-white font-bold flex justify-center items-center p-3 gap-x-4 px-4"
              type="submit"
            >
              تایید
              <i class="fa-solid fa-plus"></i>
            </button>
          </form>
        </div>
        <section
          class="grid notes justify-center rounded-xl mx-6 h-screen mt-12 gap-2 grid-cols-4  lg:grid-cols-6"
        ></section>
      </section>`;

    const createNoteBtn = this.root.querySelector("#AddNewNote");
    const openAddNoteFormBtn = this.root.querySelector(".AddNote");
    const btnClose = this.root.querySelector("#closeBtn");

    btnClose.addEventListener("click", () => {
      const noteForm = this.root.querySelector("#note_modifier");
      noteForm.classList.add("hidden");
    });

    openAddNoteFormBtn.addEventListener("click", () => this.onOpen());

    createNoteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.modifierNote();
    });
  }

  _createListItemHTML(id, title, body, updated, color = "bg-white") {
    const bgColor = {
      green: "bg-green-400/60",
      blue: "bg-blue-400",
      pink: "bg-pink-400/60",
      yellow: "bg-yellow-400",
    };
    return `<div  data-note-id="${id}"
            class="{note__item ${
              bgColor[color]
            } h-80 flex flex-col col-span-2 justify-between p-4 rounded-xl mx-4 w-72">
            <div>

            <h3 class="text-lg font-semibold border-b py-3 border-gray-400 ">
             ${title}
            </h3>
              <p class="flex mt-3 justify-center">
               ${body}
              </p>
            </div>
               <div class="flex justify-between items-center">
              <div class="flex gap-x-3 items-center">
            <span data-note-id="${id}"
                  class="note__list-edit bg-stone-800 cursor-pointer rounded-lg flex justify-center w-7 h-7 p-2 items-center"
                >
                  <i class="fa-solid text-white fa-pen"></i>
                </span>
                <span data-note-id="${id}"
                  class="note__list-trash bg-stone-800  cursor-pointer rounded-lg flex justify-center w-7 h-7 p-3 items-center"
                >
                  <i class="fa-solid text-white fa-trash"></i>
                </span>
            
            </div>
              <span class="text-gray-500 text-sm whitespace-nowrap truncate text-left">
                <i class="fa-regular fa-clock"></i> &nbsp;${new Date(
                  updated
                ).toLocaleString("fa", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>`;
  }
  onOpen() {
    const noteForm = this.root.querySelector("#note_modifier");
    noteForm.classList.remove("hidden");
  }
  modifierNote() {
    const noteTitleInput = this.root.querySelector("#note__title");
    const noteBodyInput = this.root.querySelector("#note__body");
    const color = this.root.querySelector(
      "input[name='noteColor']:checked"
    ).value;
    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();

    if (this.activeNote === true) {
      this.onNoteEdit(title, body, color);
    } else {
      this.onNoteAdd(title, body, color);
      noteBodyInput.value = "";
      noteTitleInput.value = "";
    }
    this.root.querySelector("#note_modifier").classList.add("hidden");
  }

  updateNoteList(notes) {
    const noteContainer = this.root.querySelector(".notes");
    let noteList = "";
    for (const note of notes) {
      const { id, title, body, updated, color } = note;
      const html = this._createListItemHTML(id, title, body, updated, color);
      noteList += html;
    }
    noteContainer.innerHTML = noteList;
    noteContainer.querySelectorAll(".note__list-trash").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteDelete(noteItem.dataset.noteId);
      });
    });

    // Edit
    noteContainer.querySelectorAll(".note__list-edit").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        const noteForm = this.root.querySelector("#note_modifier");
        noteForm.classList.remove("hidden");
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });
  }

  updateNoteItem(note) {
    const { id, color, title, body } = note;
    this.root.querySelector("#note__title").value = title;
    this.root.querySelector("#note__body").value = body;
    const colorInput = this.root.querySelector(`input[value='${color}']`);
    if (colorInput) colorInput.checked = true;
    this.activeNote = true;
  }
}
