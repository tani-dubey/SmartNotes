const fs = require("fs");
const path = require("path");

const notesDir = path.join(__dirname, "..", "notes");

const editor = document.getElementById("editor");
const notesList = document.getElementById("notes-list");
const newNoteBtn = document.getElementById("new-note");
const saveBtn = document.getElementById("save-note");

let currentNote = null;   //filename
let isDraft = false;
let isDirty = false;
let count = 0;

// Ensure notes directory exists
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

//UI helpers
function updateSaveButton() {
  if (isDirty) {
    saveBtn.innerText = "💾 Save";
    saveBtn.classList.add("unsaved");
  } else {
    saveBtn.innerText = "✅ Saved";
    saveBtn.classList.remove("unsaved");
  }
}
//check if file is empty
function isEditorEmpty() {
  return editor.value.trim().length === 0;
}
function getNextUntitled(prefix) {
  let count = 1;
  let name;

  do {
    name = `${prefix}-${count}.md`;
    count++;
  } while (fs.existsSync(path.join(notesDir, name)));

  return name;
}


//dynamic title
function titleToFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 50) || "untitled";
}
function getTitleFromEditor() {
  const firstLine = editor.value.split("\n")[0];
  return firstLine.trim();
}

//Editor change tracking
editor.addEventListener("input", () => {
  if (!currentNote) {
    // const safeName = titleToFilename( getTitleFromEditor());
    const name = `draft-${Date.now()}.md`;
    const filePath = path.join(notesDir, name);

    fs.writeFileSync(filePath, "");

    currentNote = name;
    isDraft = true;
  }

  isDirty = true;
  updateSaveButton();
});



//Load notes list
function loadNotes() {
  notesList.innerHTML = "";

  const files = fs.readdirSync(notesDir);

  files.forEach(file => {
    const li = document.createElement("li");
    li.textContent = file;
    li.onclick = () => loadNote(file);
    notesList.appendChild(li);
  });
}

//Load a note (EXISTING FILE ONLY)
function loadNote(filename) {
  filename = path.basename(filename); // safety

  const filePath = path.join(notesDir, filename);
  editor.value = fs.readFileSync(filePath, "utf-8");

  currentNote = filename;
  isDraft = filename.startsWith("draft-");
  isDirty = false;

  updateSaveButton();
}

// New note (creates a draft)
newNoteBtn.onclick = () => {
  // save current draft if needed
  if (currentNote && isDraft && isDirty) {
    const oldPath = path.join(notesDir, currentNote);
    fs.writeFileSync(oldPath, editor.value);
  }

  const name = getNextUntitled("draft-untitled");
  const filePath = path.join(notesDir, name);

  fs.writeFileSync(filePath, "");

  currentNote = name;
  isDraft = true;
  editor.value = "";

  isDirty = false;
  updateSaveButton();
  loadNotes();
};


//Save button
saveBtn.onclick = () => {
  if (!currentNote || !isDirty) return;

  let filePath = path.join(notesDir, currentNote);

  if (currentNote.startsWith("draft-")) {
    let finalName;

    if (isEditorEmpty()) {
      // empty content → untitled
      finalName = getNextUntitled("untitled");
    } else {
      // non-empty → title-based name
      const title = getTitleFromEditor();
      const safeName = titleToFilename(title);
      finalName = `${safeName}.md`;
    }

    const finalPath = path.join(notesDir, finalName);

    fs.renameSync(filePath, finalPath);
    currentNote = finalName;
    filePath = finalPath;
    isDraft = false;

    loadNotes();
  }

  fs.writeFileSync(filePath, editor.value);

  isDirty = false;
  updateSaveButton();
};



//Initial load
loadNotes();
updateSaveButton();