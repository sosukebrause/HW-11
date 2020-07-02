const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      // let parsedNotes;
      console.log(notes);

      let parsedNotes = [].concat(JSON.parse(notes));
      return parsedNotes;
    });
  }

  createNote(entry) {
    console.log(entry);

    const { title, text } = entry;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    // Add a unique id to the note using uuid package
    const newNote = { title, text };
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, entry])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => entry);
  }
  //   createNote(entry) {
  //     console.log("hit store");

  //     const { title, text } = entry;
  //     if (!title || !text) {
  //       throw new Error("Fill in both fields");
  //     }
  //     const newNote = { title, text, id: uuidv4() };
  //     return this.getNotes()
  //       .then((notes) => {
  //         [...notes, newNote];
  //       })
  //       .then((updatedNotes) => {
  //         this.write(updatedNotes);
  //       })
  //       .then(() => {
  //         newNote;
  //       });
  //   }
}
module.exports = new Store();
