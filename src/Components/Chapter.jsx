import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import "./Chapter.css";

const getChaptersData = async (topicSlug) => {
  const topicName =
    Object.keys(topicChapters).find(
      (topic) => slugifyTopic(topic) === topicSlug,
    ) || "Calculus";
  const chapters = (topicChapters[topicName] || []).map((chapter) => ({
    name: chapter,
    question_count: chapterQuestionCounts[chapter] || 0,
  }));

  return { chapters };
};

const getTopicsProgression = async () => ({
  topics: Object.keys(topicChapters).map((name) => ({ name })),
});

const isDarkTheme = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("mathGeniusTheme") === "dark";
};

const setThemePreference = (darkMode) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("mathGeniusTheme", darkMode ? "dark" : "light");
  document.body.className = darkMode ? "dark-theme" : "";
};

export const topicChapters = {
  Calculus: ["Limits", "Differentiation", "Definite Integration"],
  "Linear Algebra": ["Matrices", "Determinants"],
  Trigonometry: ["Identities", "Functions", "Equations"],
  "Coordinate Geometry": ["Straight Lines", "Circles", "Conic Sections"],
  Probability: ["Basic Probability", "Axioms", "Distributions"],
  "Complex Numbers": ["Algebra", "Polar Form"],
  Vectors: ["Dot Product", "Magnitude", "Cross Product"],
  "3D Geometry": ["Distance Formula", "Planes", "Lines"],
};

export const slugifyTopic = (topic) =>
  topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const topicIcons = {
  Calculus: "fa-chart-area",
  "Linear Algebra": "fa-border-all",
  Trigonometry: "fa-draw-polygon",
  "Coordinate Geometry": "fa-chart-line",
  Probability: "fa-dice",
  "Complex Numbers": "fa-calculator",
  Vectors: "fa-arrow-right",
  "3D Geometry": "fa-cube",
};

const chapterQuestionCounts = {
  Limits: 1,
  Differentiation: 1,
  "Definite Integration": 1,
  Matrices: 2,
  Determinants: 1,
  Identities: 1,
  Functions: 1,
  Equations: 1,
  "Straight Lines": 1,
  Circles: 1,
  "Conic Sections": 1,
  "Basic Probability": 1,
  Axioms: 1,
  Distributions: 1,
  Algebra: 2,
  "Polar Form": 1,
  "Dot Product": 1,
  Magnitude: 1,
  "Cross Product": 1,
  "Distance Formula": 1,
  Planes: 1,
  Lines: 1,
};

const Chapter = () => {
  const { topicSlug } = useParams();
  const [darkMode, setDarkMode] = useState(() => isDarkTheme());
  const [chapterRows, setChapterRows] = useState([]);
  const [allTopics, setAllTopics] = useState(Object.keys(topicChapters));

  const topicName = useMemo(() => {
    return (
      Object.keys(topicChapters).find(
        (topic) => slugifyTopic(topic) === topicSlug,
      ) || "Calculus"
    );
  }, [topicSlug]);

  const chapters = chapterRows.length
    ? chapterRows.map((chapter) => chapter.name)
    : topicChapters[topicName];
  const totalQuestions = chapterRows.length
    ? chapterRows.reduce(
        (total, chapter) => total + (chapter.question_count || 0),
        0,
      )
    : chapters.reduce(
        (total, chapter) => total + (chapterQuestionCounts[chapter] || 0),
        0,
      );

  useEffect(() => {
    setThemePreference(darkMode);
  }, [darkMode]);

  useEffect(() => {
    let active = true;

    const loadChapters = async () => {
      try {
        const [chapterData, topicData] = await Promise.all([
          getChaptersData(topicSlug),
          getTopicsProgression(),
        ]);

        if (!active) return;

        if (chapterData?.chapters?.length) {
          setChapterRows(chapterData.chapters);
        }

        if (topicData?.topics?.length) {
          setAllTopics(topicData.topics.map((topic) => topic.name));
        }
      } catch (error) {
        console.error("Chapters API error:", error);
        setChapterRows([]);
      }
    };

    loadChapters();

    return () => {
      active = false;
    };
  }, [topicSlug]);

  return (
    <div className={`chapters-root ${darkMode ? "dark" : ""}`}>
      <main className="chapters-content">
        <section className="chapters-hero">
          <div className="chapters-hero-top">
            <Link to="/home" className="back-link">
              <i className="fas fa-arrow-left"></i>
              Back to Dashboard
            </Link>
            <button
              className="chapter-theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              title="Toggle theme"
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </div>

          <div className="chapters-hero-main">
            <div className="chapters-topic-icon">
              <i className={`fas ${topicIcons[topicName] || "fa-book"}`}></i>
            </div>
            <div className="chapters-hero-text">
              <p className="chapters-eyebrow">Selected Topic</p>
              <h1>{topicName}</h1>
              <p className="chapters-summary">
                {chapters.length} chapters available with {totalQuestions}{" "}
                mapped practice questions.
              </p>
            </div>
          </div>
        </section>

        <section className="chapters-layout">
          <div className="topic-list-panel">
            <h3>All Topics</h3>
            <div className="topic-list">
              {allTopics.map((topic) => (
                <Link
                  key={topic}
                  to={`/chapter/${slugifyTopic(topic)}`}
                  className={`topic-list-item ${topic === topicName ? "active" : ""}`}
                >
                  <i className={`fas ${topicIcons[topic] || "fa-book"}`}></i>
                  <span>{topic}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="chapter-grid">
            {chapters.map((chapter, index) => (
              <article className="chapter-card" key={chapter}>
                <div className="chapter-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="chapter-card-body">
                  <h3>{chapter}</h3>
                  <p>
                    {(chapterRows[index]?.question_count ??
                      chapterQuestionCounts[chapter]) ||
                      0}{" "}
                    practice question
                    {((chapterRows[index]?.question_count ??
                      chapterQuestionCounts[chapter]) ||
                      0) === 1
                      ? ""
                      : "s"}{" "}
                    ready
                  </p>
                </div>
                <Link to={`/question/Functions`} className="chapter-link">
                  <button className="chapter-action">
                    Start
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Chapter;
