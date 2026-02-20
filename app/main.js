const fs = require("fs");
const path = require("path");

const notesDir = path.join(__dirname, "..", "notes");

const editor = document.getElementById("editor");
const notesList = document.getElementById("notes-list");
const newNoteBtn = document.getElementById("new-note");
const saveBtn = document.getElementById("save-note");

let currentNote = null;
let isDraft = false;
let isDirty = false;

// Ensure notes directory exists
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

// -------------------- UI --------------------

function updateSaveButton() {
  if (isDirty) {
    saveBtn.innerText = "💾 Save";
    saveBtn.classList.add("unsaved");
  } else {
    saveBtn.innerText = "✅ Saved";
    saveBtn.classList.remove("unsaved");
  }
}

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

function titleToFilename(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 50) || "untitled"
  );
}

function getTitleFromEditor() {
  return editor.value.split("\n")[0].trim();
}

// -------------------- AUTO SAVE --------------------

function autoSaveIfDirty() {
  if (!currentNote || !isDirty) return;

  const filePath = path.join(notesDir, currentNote);
  fs.writeFileSync(filePath, editor.value);

  isDirty = false;
  updateSaveButton();
}

// -------------------- EDITOR TRACKING --------------------

editor.addEventListener("input", () => {
  if (!currentNote) return;
  isDirty = true;
  updateSaveButton();
});

// -------------------- LOAD NOTES LIST --------------------

function loadNotes() {
  notesList.innerHTML = "";

  const files = fs
    .readdirSync(notesDir)
    .filter(f => f.endsWith(".md"))
    .sort();

  files.forEach(file => {
    const li = document.createElement("li");
    li.textContent = file;

    li.addEventListener("click", () => {
      autoSaveIfDirty();
      loadNote(file);
    });

    notesList.appendChild(li);
  });
}

// -------------------- LOAD NOTE --------------------

function loadNote(filename) {
  filename = path.basename(filename);

  const filePath = path.join(notesDir, filename);

  if (!fs.existsSync(filePath)) return;

  editor.value = fs.readFileSync(filePath, "utf-8");

  currentNote = filename;
  isDraft = filename.startsWith("draft-");
  isDirty = false;

  updateSaveButton();

  editor.readOnly = false;
  editor.disabled = false;
  editor.focus();
}

// -------------------- NEW NOTE --------------------

newNoteBtn.onclick = () => {
  autoSaveIfDirty();

  const name = getNextUntitled("draft-untitled");
  const filePath = path.join(notesDir, name);

  fs.writeFileSync(filePath, "");

  currentNote = name;
  isDraft = true;

  editor.value = "";
  editor.readOnly = false;
  editor.disabled = false;
  editor.focus();

  isDirty = false;
  updateSaveButton();
  loadNotes();
};

// -------------------- SAVE BUTTON --------------------

saveBtn.onclick = () => {
  if (!currentNote) return;

  let filePath = path.join(notesDir, currentNote);
  let renamed = false;

  if (currentNote.startsWith("draft-")) {
    let finalName;

    if (isEditorEmpty()) {
      finalName = getNextUntitled("untitled");
    } else {
      const title = getTitleFromEditor();
      const safeName = titleToFilename(title);

      let candidate = `${safeName}.md`;
      let n = 1;

      while (
        fs.existsSync(path.join(notesDir, candidate)) &&
        candidate !== currentNote
      ) {
        candidate = `${safeName}-${n++}.md`;
      }

      finalName = candidate;
    }

    const finalPath = path.join(notesDir, finalName);

    fs.renameSync(filePath, finalPath);

    currentNote = finalName;
    filePath = finalPath;
    isDraft = false;
    renamed = true;
  }

  fs.writeFileSync(filePath, editor.value);

  isDirty = false;
  updateSaveButton();
  editor.focus();

  if (renamed) loadNotes();
};

// -------------------- INIT --------------------

loadNotes();
updateSaveButton();