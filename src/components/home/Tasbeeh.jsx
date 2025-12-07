import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Tasbeeh() {
    const { t } = useTranslation();

    const [count, setCount] = useState(0);
    const [dailyGoal] = useState(100);
    const [pulse, setPulse] = useState(false);
    const holdRef = useRef(null);
    const wrapperRef = useRef(null);

    const tips = t("tasbeeh.tips", { returnObjects: true });

    const increment = (n = 1) => {
        setCount((c) => {
            if (c >= dailyGoal) return dailyGoal;
            return Math.min(c + n, dailyGoal);
        });

        setPulse(true);
        clearTimeout(holdRef.current?.pulseTimeout);
        holdRef.current.pulseTimeout = setTimeout(() => setPulse(false), 300);
    };

    const startHold = () => {
        increment();
        holdRef.current.auto = setTimeout(() => {
            holdRef.current.interval = setInterval(() => increment(), 120);
        }, 400);
    };

    const stopHold = () => {
        clearTimeout(holdRef.current?.auto);
        clearInterval(holdRef.current?.interval);
    };

    const handleReset = () => {
        setCount(0);
    };

    const progressPercent = Math.min((count / dailyGoal) * 100, 100);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const onKey = (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                increment();
            }
        };
        el.addEventListener("keydown", onKey);
        return () => el.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section className="tasbeeh-section">
            <div className="container">
                <div className="tasbeeh-wrapper">
                    <div className="tasbeeh-main">
                        <h2>{t("tasbeeh.title")}</h2>

                        <div
                            className={`sebha-container ${pulse ? "pulse" : ""}`}
                            ref={wrapperRef}
                            role="button"
                            tabIndex={0}
                            onMouseDown={startHold}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={startHold}
                            onTouchEnd={stopHold}
                            onClick={() => increment()}
                        >
                            <img
                                src="/icons/Sebha.svg"
                                alt={t("tasbeeh.imageAlt")}
                                className="sebha-img"
                                draggable={false}
                            />

                            <div className="sebha-counter">
                                <span className={pulse ? "pop" : ""}>{count}</span>
                                <small>
                                    {t("tasbeeh.from")} {dailyGoal}
                                </small>
                            </div>
                        </div>

                        <p className="sebha-hint">
                            {t("tasbeeh.hint")}
                        </p>

                        <div className="sebha-controls">
                            <button
                                className="btn btn-tasbeeh"
                                onClick={() => increment()}
                            >
                                {t("tasbeeh.buttons.tasbeeh")}
                            </button>
                            <button
                                className="btn btn-clear"
                                onClick={handleReset}
                            >
                                {t("tasbeeh.buttons.clear")}
                            </button>
                        </div>
                    </div>

                    <div className="tasbeeh-stats">
                        <div className="stat-card">
                            <div className="stat-value">
                                {progressPercent.toFixed(0)}%
                            </div>
                            <div className="stat-label">
                                {t("tasbeeh.stats.progress")}
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-value">
                                {Math.max(0, dailyGoal - count)}
                            </div>
                            <div className="stat-label">
                                {t("tasbeeh.stats.remaining")}
                            </div>
                        </div>

                        <div className="tips-card">
                            <div className="tips-header">
                                <i className="fas fa-lightbulb"></i>
                                {t("tasbeeh.tipsTitle")}
                            </div>
                            <ul className="tips-list">
                                {tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
