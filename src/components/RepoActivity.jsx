import { useEffect, useState } from "react";
import "./RepoActivity.css";

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return "오늘";
  if (days < 30) return `${days}일 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  return `${Math.floor(months / 12)}년 전`;
}

export default function RepoActivity({ repo }) {
  const [state, setState] = useState({ status: "loading", commits: [] });

  useEffect(() => {
    let cancelled = false;
    const path = repo.replace("https://github.com/", "");
    fetch(`https://api.github.com/repos/${path}/commits?per_page=4`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setState({
          status: "ready",
          commits: data.map((c) => ({
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split("\n")[0],
            date: c.commit.author?.date,
          })),
        });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", commits: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return (
    <div className="repo-activity card">
      <div className="repo-activity-bar">
        <span className="repo-activity-dot" />
        <span className="repo-activity-dot" />
        <span className="repo-activity-dot" />
        <span className="repo-activity-title mono">git log --oneline -4</span>
      </div>
      <div className="repo-activity-body mono">
        {state.status === "loading" && <p className="repo-activity-msg">불러오는 중…</p>}
        {state.status === "error" && (
          <p className="repo-activity-msg">
            GitHub API를 지금 불러올 수 없습니다.{" "}
            <a href={repo} target="_blank" rel="noreferrer">
              레포에서 직접 확인 ↗
            </a>
          </p>
        )}
        {state.status === "ready" &&
          state.commits.map((c) => (
            <p key={c.sha} className="repo-activity-line">
              <span className="repo-activity-sha">{c.sha}</span> {c.message}
              <span className="repo-activity-time"> · {timeAgo(c.date)}</span>
            </p>
          ))}
      </div>
    </div>
  );
}
