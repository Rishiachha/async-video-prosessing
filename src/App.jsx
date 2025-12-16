import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  const uploadVideo = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("video", file);

    try {
      setUploading(true);
      await api.post("/upload", form);
      setFile(null);
      fetchTasks();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass w-full max-w-4xl p-8 shadow-2xl">

        <h1 className="text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-3">
           <span>VIDEO FORGE</span>
        </h1>

        <div className="glass p-6 mb-10 text-center border border-dashed border-white/20 rounded-xl">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 block mx-auto"
          />

          <button
            onClick={uploadVideo}
            disabled={uploading}
            className="px-6 py-3 rounded-full bg-neon text-black font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </div>

        <div className="glass p-6">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>

          {tasks.length === 0 && (
            <p className="text-center opacity-70">
              No tasks yet. Upload a video.
            </p>
          )}

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <div>
                  <p className="font-mono text-xs opacity-60">
                    {task.id}
                  </p>
                  <p className="mt-1">
                    {task.format.toUpperCase()} • {task.profile}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <StatusBadge state={task.state} />

                  {task.state === "COMPLETED" && (
                    <a
                      href={`http://localhost:4000/download/${task.id}`}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatusBadge({ state }) {
  const styles = {
    QUEUED: "bg-yellow-500/20 text-yellow-400",
    PROCESSING: "bg-blue-500/20 text-blue-400 animate-pulse",
    COMPLETED: "bg-green-500/20 text-green-400",
    FAILED: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-xs font-bold ${styles[state]}`}
    >
      {state}
    </span>
  );
}
