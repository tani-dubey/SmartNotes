<!-- Don't delete it -->
<div name="readme-top"></div>

<!-- Organization Logo -->
<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 16px;">
  <img alt="AOSSIE" src="public/aossie-logo.svg" width="175">
  <img src="public/todo-project-logo.svg" width="175" />
</div>

&nbsp;

<!-- Organization Name -->
<div align="center">

[![Static Badge](https://img.shields.io/badge/aossie.org/TODO-228B22?style=for-the-badge&labelColor=FFC517)](https://TODO.aossie.org/)

<!-- Correct deployed url to be added -->

</div>

<!-- Organization/Project Social Handles -->
<p align="center">
<!-- Telegram -->
<a href="https://t.me/StabilityNexus">
<img src="https://img.shields.io/badge/Telegram-black?style=flat&logo=telegram&logoColor=white&logoSize=auto&color=24A1DE" alt="Telegram Badge"/></a>
&nbsp;&nbsp;
<!-- X (formerly Twitter) -->
<a href="https://x.com/aossie_org">
<img src="https://img.shields.io/twitter/follow/aossie_org" alt="X (formerly Twitter) Badge"/></a>
&nbsp;&nbsp;
<!-- Discord -->
<a href="https://discord.gg/hjUhu33uAn">
<img src="https://img.shields.io/discord/1022871757289422898?style=flat&logo=discord&logoColor=white&logoSize=auto&label=Discord&labelColor=5865F2&color=57F287" alt="Discord Badge"/></a>
&nbsp;&nbsp;
<!-- Medium -->
<a href="https://news.stability.nexus/">
  <img src="https://img.shields.io/badge/Medium-black?style=flat&logo=medium&logoColor=black&logoSize=auto&color=white" alt="Medium Badge"></a>
&nbsp;&nbsp;
<!-- LinkedIn -->
<a href="https://www.linkedin.com/company/aossie/">
  <img src="https://img.shields.io/badge/LinkedIn-black?style=flat&logo=LinkedIn&logoColor=white&logoSize=auto&color=0A66C2" alt="LinkedIn Badge"></a>
&nbsp;&nbsp;
<!-- Youtube -->
<a href="https://www.youtube.com/@StabilityNexus">
  <img src="https://img.shields.io/youtube/channel/subscribers/UCZOG4YhFQdlGaLugr_e5BKw?style=flat&logo=youtube&logoColor=white&logoSize=auto&labelColor=FF0000&color=FF0000" alt="Youtube Badge"></a>
</p>

---

<div align="center">
<h1>Smart Notes</h1>
</div>

[Smart Notes](https://github.com/tani-dubey/Smart-Notes) is a local-first, privacy-focused desktop application for personal knowledge management.
It provides a markdown-based note editor with safe file persistence, draft handling, and dynamic titles, forming a solid foundation for future AI-powered semantic search and RAG features.

The project prioritizes offline usage, user data ownership, and incremental feature development.

---

## 🚀 Features

Core Editor (Current Prototype)

- **📝 Markdown note editing**: raw text, no rendering yet
- **💾 Explicit Save / Saved state** with dirty-tracking
- **📄 Draft-based note creation**: 
   - Auto-creates drafts on first typing
   - Finalizes drafts on save
- **🏷️ Dynamic note titles**: 
   - Filename derived from first line of content
   - Empty notes handled as `untitled.md`
- **🔁 Safe file switching**: 
   - Open, edit, and update multiple notes
   - No accidental overwrites or data loss
- **📂 Local filesystem storage**: 
   - Notes stored as `.md` files on disk
   - Fully offline by default

   ⚠️ AI features (semantic search, embeddings, RAG) are planned and intentionally not included yet.

---

## 💻 Tech Stack

### Desktop Application
- **Electron** — cross-platform desktop shell
- **HTML / CSS / JavaScript** — UI and editor logic
- **Node.js (fs, path)** — local filesystem access

### Storage
- Local markdown files `(.md)`
- No database, no cloud dependency

### AI/ML (Planned)
- Ollama (local LLMs)
- Embeddings + vector store (local)
- Retrieval-Augmented Generation (RAG)

---

## ✅ Project Checklist

- ### Editor
   - [x] Local-first design
   - [x] Draft handling
   - [x] Safe save/load
   - [x] Dynamic file naming
   - [ ] Markdown rendering (planned)
   - [ ] Search (planned)

- ### AI / ML (Planned)
   - [ ] Local embedding pipeline
   - [ ] Hybrid search (keyword + vector)
   - [ ] On-device RAG
   - [ ] Model backend selection

---

## 🏗️ Architecture Diagram

```
smart-notes/
├─ app/
│  ├─ index.html
│  ├─ style.css
│  └─ main.js
|
├─ notes/ (optional to have)
│  └─ (your .md files go here)
|
├─ main.js (Entrypoint)
├─ package.json
└─ README.md

```
### Planned Extension
- Python backend for embeddings & RAG
- Local IPC between Electron and backend

---

## 🔄 User Flow
<img width="719" height="713" alt="image" src="https://github.com/user-attachments/assets/c66c9d9e-86a7-4334-863c-4481da0680c3" />

### Key User Journeys

### User Journey: Create & Save a Note
1. User opens the app
2. Starts typing → draft is auto-created
3. First line becomes the title
4. Clicks Save
5. Draft is finalized and stored as a markdown file

### User Journey: Edit Existing Note
1. User clicks a note in the sidebar
2. Content loads into editor
3. User edits content
4. Save updates the file safely

---

## �🍀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

TODO: Provide detailed setup instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/AOSSIE-Org/SmartNotes.git
cd SmartNotes
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Run the app

```bash
npm start
```

---

## 📱 App Screenshots

TODO: Add screenshots showcasing your application

|  |  |  |
|---|---|---|
| Screenshot 1 | Screenshot 2 | Screenshot 3 |

---

## 🙌 Contributing

⭐ Don't forget to star this repository if you find it useful! ⭐

Thank you for considering contributing to this project! Contributions are highly appreciated and welcomed. To ensure smooth collaboration, please refer to our [Contribution Guidelines](./CONTRIBUTING.md).

---

## ✨ Maintainers

- [Maintainer Name](https://github.com/username)
- [Maintainer Name](https://github.com/username)

---

## 📍 License

This project is licensed under the GNU General Public License v3.0.
See the [LICENSE](LICENSE) file for details.

---

## 💪 Thanks To All Contributors

Thanks a lot for spending your time helping Smart-Notes grow. Keep rocking 🥂

[![Contributors](https://contrib.rocks/image?repo=AOSSIE-Org/Smart-Notes)](https://github.com/AOSSIE-Org/Smart-Notes/graphs/contributors)

© 2025 AOSSIE 