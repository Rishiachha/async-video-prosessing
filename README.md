# async-video-prosessing
video-forge/
├── backend/
├── frontend/
├── README.md

Video Forge is a full-stack, asynchronous video processing system that allows users to upload videos, process them in the background using FFmpeg, and download the processed outputs once ready.

work flow :
User uploads a video
Backend stores task in database with state QUEUED
Worker picks the task and updates state to PROCESSING
FFmpeg processes the video
On success → state becomes COMPLETED
Frontend detects update and enables Download

Tech Used:
Frontend:React (Vite),Tailwind CSS,Axios
Backend:Node.js,Express.js,PostgreSQL
Processing:FFmpeg,Background worker model

Architecture:
video-forge/
├── backend/
│   ├── api/
│   │   ├── upload.js
│   │   └── tasks.js
│   ├── worker/
│   │   └── worker.js
│   ├── db.js
│   ├── server.js
│   └── outputs/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.css
│   └── index.html
│
├── screenshots/
└── README.md
