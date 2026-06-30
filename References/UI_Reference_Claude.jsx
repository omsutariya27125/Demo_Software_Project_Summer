import React, { useState, useEffect, useRef, useMemo } from "react";
import { Flame, Zap, Trophy, Target, Clock, ChevronRight, Sparkles, BookOpen, Home, Map, Dumbbell, Bot, User, Check, X, Lock, TrendingUp, Award, Moon, Sun, Sunrise, RefreshCw, Send, Lightbulb, AlertTriangle, CalendarDays, Flag, ArrowLeft, Play, Shield, BrainCircuit, ListChecks } from "lucide-react";

/* ============================================================
   ASCENT — JEE Maths · personalized pathway prototype
   Design: "night-study desk" — ink blue + graph paper + lamp amber
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600;700&display=swap');
:root{
  --ink:#0A0F1F; --ink2:#0C1226; --card:#121A33; --card2:#172244; --cardHi:#1B2A55;
  --line:rgba(140,158,210,.14); --line2:rgba(140,158,210,.30);
  --txt:#EAEFFD; --mut:#93A0C9; --dim:#5C6890;
  --lamp:#FFB454; --lampDim:rgba(255,180,84,.13);
  --blue:#6C8CFF; --blueDim:rgba(108,140,255,.14);
  --ok:#3DDC97; --okDim:rgba(61,220,151,.13);
  --bad:#FF5C7A; --badDim:rgba(255,92,122,.13);
  --vio:#A78BFA; --vioDim:rgba(167,139,250,.14);
  --grid:rgba(108,140,255,.045);
  --disp:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;
  --body:'IBM Plex Sans',ui-sans-serif,system-ui,sans-serif;
  --mono:'IBM Plex Mono',ui-monospace,Menlo,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
.asc-root{min-height:100vh;background:var(--ink);color:var(--txt);font-family:var(--body);
  background-image:radial-gradient(1100px 500px at 50% -150px, rgba(108,140,255,.10), transparent 60%),
  linear-gradient(var(--grid) 1px, transparent 1px),linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size:auto,30px 30px,30px 30px;}
.frame{max-width:520px;margin:0 auto;min-height:100vh;position:relative;padding:18px 18px 104px}
.disp{font-family:var(--disp)} .mono{font-family:var(--mono)}
h1,h2,h3{font-family:var(--disp);font-weight:700;letter-spacing:-.01em}
.eyebrow{font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--dim)}
.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:16px}
.card.hi{background:linear-gradient(160deg,var(--card2),var(--card));border-color:var(--line2)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;
  font-family:var(--disp);font-weight:600;font-size:15px;border-radius:14px;padding:13px 18px;
  transition:transform .12s ease, filter .15s ease, background .2s;color:var(--ink)}
.btn:active{transform:scale(.97)}
.btn.primary{background:linear-gradient(135deg,#7C9AFF,var(--blue));color:#0A0F1F;box-shadow:0 6px 22px rgba(108,140,255,.28)}
.btn.lamp{background:linear-gradient(135deg,#FFC97E,var(--lamp));color:#231300;box-shadow:0 6px 22px rgba(255,180,84,.25)}
.btn.ghost{background:transparent;border:1px solid var(--line2);color:var(--txt)}
.btn.soft{background:var(--card2);color:var(--txt);border:1px solid var(--line)}
.btn:disabled{opacity:.45;cursor:not-allowed;filter:grayscale(.4)}
.btn.full{width:100%}
.chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;font-weight:600;
  padding:5px 10px;border-radius:999px;border:1px solid var(--line);color:var(--mut);background:rgba(255,255,255,.02)}
.chip.lamp{color:var(--lamp);border-color:rgba(255,180,84,.35);background:var(--lampDim)}
.chip.blue{color:var(--blue);border-color:rgba(108,140,255,.35);background:var(--blueDim)}
.chip.ok{color:var(--ok);border-color:rgba(61,220,151,.35);background:var(--okDim)}
.chip.bad{color:var(--bad);border-color:rgba(255,92,122,.35);background:var(--badDim)}
.chip.vio{color:var(--vio);border-color:rgba(167,139,250,.35);background:var(--vioDim)}
.stamp{font-family:var(--mono);font-weight:700;font-size:12px;padding:3px 8px;border-radius:7px;display:inline-block}
.stamp.plus{color:#0A2417;background:var(--ok);transform:rotate(-2deg)}
.stamp.minus{color:#3A0D17;background:var(--bad);transform:rotate(2deg)}
.stamp.zero{color:var(--mut);background:var(--card2);border:1px solid var(--line)}
.bar{height:8px;border-radius:99px;background:var(--card2);overflow:hidden;position:relative}
.bar>i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#7C9AFF,var(--blue));transition:width .7s cubic-bezier(.2,.8,.2,1)}
.bar.lamp>i{background:linear-gradient(90deg,#FFC97E,var(--lamp))}
.bar.ok>i{background:linear-gradient(90deg,#6FE7B7,var(--ok))}
.tap{cursor:pointer;transition:transform .12s ease,border-color .15s,background .2s}
.tap:active{transform:scale(.985)}
.opt{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;background:var(--card);border:1.5px solid var(--line);
  border-radius:14px;padding:14px;color:var(--txt);font-family:var(--body);font-size:15px;cursor:pointer;transition:all .15s}
.opt:hover{border-color:var(--line2)}
.opt.sel{border-color:var(--blue);background:var(--blueDim)}
.opt.right{border-color:var(--ok);background:var(--okDim)}
.opt.wrong{border-color:var(--bad);background:var(--badDim)}
.optkey{font-family:var(--mono);font-weight:600;font-size:12px;min-width:24px;height:24px;border-radius:7px;border:1px solid var(--line2);
  display:flex;align-items:center;justify-content:center;color:var(--mut);flex-shrink:0;margin-top:1px}
.opt.sel .optkey{border-color:var(--blue);color:var(--blue)}
.input{width:100%;background:var(--ink2);border:1.5px solid var(--line2);border-radius:14px;padding:14px 16px;color:var(--txt);
  font-family:var(--mono);font-size:18px;outline:none;transition:border-color .15s}
.input:focus{border-color:var(--blue)}
.input.sm{font-family:var(--body);font-size:15px;padding:12px 14px}
.nav{position:fixed;bottom:0;left:0;right:0;z-index:50;display:flex;justify-content:center;pointer-events:none}
.navin{pointer-events:auto;display:flex;gap:2px;background:rgba(13,18,38,.92);backdrop-filter:blur(14px);
  border:1px solid var(--line);border-radius:20px;padding:8px;margin:0 14px 14px;width:min(492px,calc(100% - 28px))}
.navbtn{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 4px;border:none;background:transparent;
  color:var(--dim);font-family:var(--disp);font-size:10px;font-weight:600;border-radius:14px;cursor:pointer;transition:all .15s}
.navbtn.on{color:var(--lamp);background:var(--lampDim)}
.ring-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center}
.fadeup{animation:fadeup .45s cubic-bezier(.2,.8,.2,1) both}
.pop{animation:pop .35s cubic-bezier(.2,.9,.3,1.4) both}
.pulse{animation:pulse 2.2s ease-in-out infinite}
.shimmer{position:relative;overflow:hidden}
.shimmer::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%);
  animation:shim 1.4s linear infinite}
@keyframes fadeup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}
@keyframes shim{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
@keyframes flicker{0%,100%{transform:scale(1)}50%{transform:scale(1.12) rotate(-3deg)}}
.flame{animation:flicker 1.6s ease-in-out infinite;transform-origin:bottom center}
.toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:100;background:var(--card2);border:1px solid var(--line2);
  color:var(--txt);padding:11px 18px;border-radius:14px;font-size:13.5px;font-weight:500;display:flex;gap:8px;align-items:center;
  box-shadow:0 12px 40px rgba(0,0,0,.5);animation:fadeup .3s ease both;max-width:min(440px,90vw)}
.sheet-bg{position:fixed;inset:0;background:rgba(5,8,18,.7);backdrop-filter:blur(3px);z-index:60;animation:fadein .2s both}
.sheet{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(520px,100%);max-height:86vh;z-index:61;
  background:var(--ink2);border:1px solid var(--line2);border-bottom:none;border-radius:24px 24px 0 0;padding:20px 18px 28px;
  overflow-y:auto;animation:slideup .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@keyframes slideup{from{transform:translate(-50%,40px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
.seg{display:flex;background:var(--ink2);border:1px solid var(--line);border-radius:13px;padding:4px;gap:4px}
.seg>button{flex:1;border:none;background:transparent;color:var(--mut);font-family:var(--disp);font-weight:600;font-size:13px;
  padding:9px 6px;border-radius:10px;cursor:pointer;transition:all .15s}
.seg>button.on{background:var(--card2);color:var(--txt);box-shadow:0 2px 10px rgba(0,0,0,.3)}
.qmath{font-size:16px;line-height:1.65;color:var(--txt)}
.scroll-x{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;margin:0 -18px;padding-left:18px;padding-right:18px;scrollbar-width:none}
.scroll-x::-webkit-scrollbar{display:none}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
`;

/* ================= OFFICIAL NTA JEE MAIN 2026 SYLLABUS — MATHEMATICS (14 units) ================= */
const AREAS = { algebra: "Algebra", calculus: "Calculus", geometry: "Geometry & Vectors", probability: "Statistics & Probability" };

const UNITS = [
  { id: "sets", n: 1, name: "Sets, Relations & Functions", short: "Sets & Functions", area: "algebra", phase: 1, yield: 4, topics: ["Sets, union, intersection, complement", "Power set", "Types of relations, equivalence relations", "One-one, into, onto functions", "Composition of functions"], prereq: [] },
  { id: "complex", n: 2, name: "Complex Numbers & Quadratic Equations", short: "Complex & Quadratic", area: "algebra", phase: 1, yield: 7, topics: ["a+ib form, Argand diagram", "Modulus & argument", "Algebra of complex numbers", "Roots & coefficients, nature of roots", "Forming quadratics from roots"], prereq: ["sets"] },
  { id: "matrices", n: 3, name: "Matrices & Determinants", short: "Matrices & Det.", area: "algebra", phase: 2, yield: 9, hi: true, topics: ["Algebra & types of matrices", "Determinants of order 2 & 3", "Area of triangle by determinants", "Adjoint & inverse", "Consistency of linear systems"], prereq: ["sets"] },
  { id: "pnc", n: 4, name: "Permutations & Combinations", short: "P & C", area: "algebra", phase: 1, yield: 6, topics: ["Fundamental principle of counting", "P(n,r) and C(n,r)", "Simple applications"], prereq: [] },
  { id: "binomial", n: 5, name: "Binomial Theorem", short: "Binomial", area: "algebra", phase: 1, yield: 5, topics: ["Binomial theorem (positive integral index)", "General & middle term", "Simple applications"], prereq: ["pnc"] },
  { id: "sequences", n: 6, name: "Sequence & Series", short: "Seq & Series", area: "algebra", phase: 1, yield: 7, hi: true, topics: ["Arithmetic progressions", "Geometric progressions", "A.M. & G.M., their relation"], prereq: [] },
  { id: "limits", n: 7, name: "Limits, Continuity & Differentiability", short: "Limits & Derivatives", area: "calculus", phase: 2, yield: 11, hi: true, topics: ["Limits, continuity, differentiability", "Differentiation rules (all function types)", "Derivatives up to order two", "Rate of change, monotonicity", "Maxima & minima of one variable"], prereq: ["sets"] },
  { id: "integrals", n: 8, name: "Integral Calculus", short: "Integrals", area: "calculus", phase: 2, yield: 11, hi: true, topics: ["Anti-derivatives, fundamental integrals", "Substitution, by parts, partial fractions", "Standard forms", "Definite integrals & properties", "Area under simple curves"], prereq: ["limits"] },
  { id: "diffeq", n: 9, name: "Differential Equations", short: "Diff. Equations", area: "calculus", phase: 3, yield: 6, hi: true, topics: ["Order & degree", "Separation of variables", "Homogeneous equations", "Linear: dy/dx + p(x)y = q(x)"], prereq: ["integrals"] },
  { id: "coord", n: 10, name: "Co-ordinate Geometry", short: "Coordinate Geom.", area: "geometry", phase: 2, yield: 12, hi: true, topics: ["Straight lines: forms, angle, distance", "Centroid, orthocentre, circumcentre", "Circle: standard & general form", "Parabola, ellipse, hyperbola (standard)"], prereq: [] },
  { id: "threed", n: 11, name: "Three Dimensional Geometry", short: "3D Geometry", area: "geometry", phase: 3, yield: 8, hi: true, topics: ["Distance & section formula in space", "Direction ratios & cosines", "Equation of a line", "Skew lines, shortest distance"], prereq: ["vectors"] },
  { id: "vectors", n: 12, name: "Vector Algebra", short: "Vectors", area: "geometry", phase: 2, yield: 7, hi: true, topics: ["Vectors & scalars, addition", "Components in 2D & 3D", "Scalar (dot) product", "Vector (cross) product"], prereq: [] },
  { id: "stats", n: 13, name: "Statistics & Probability", short: "Stats & Probability", area: "probability", phase: 2, yield: 8, hi: true, topics: ["Mean, median, mode", "Std deviation, variance, mean deviation", "Addition & multiplication theorems", "Bayes' theorem", "Probability distribution of a random variable"], prereq: ["pnc"] },
  { id: "trig", n: 14, name: "Trigonometry", short: "Trigonometry", area: "probability", phase: 1, yield: 3, topics: ["Trigonometric identities & functions", "Inverse trig functions & properties"], prereq: [] },
];
const UMAP = Object.fromEntries(UNITS.map(u => [u.id, u]));
const AREA_UNITS = { algebra: ["sets","complex","matrices","pnc","binomial","sequences"], calculus: ["limits","integrals","diffeq"], geometry: ["coord","threed","vectors"], probability: ["stats","trig"] };

/* ================= QUESTION BANK — verified PYQ-style items (2023-25 patterns) ================= */
/* diff ratings: easy 1300 · medium 1550 · hard 1800 — used by the adaptive (Elo) engine */
const BANK = [
  // — Sets, Relations & Functions
  { id:"q-sets-1", unit:"sets", topic:"Equivalence relations", diff:"easy", type:"mcq", q:"The number of equivalence relations that can be defined on the set A = {1, 2, 3} is:", options:["3","5","8","9"], answer:1, sol:"Equivalence relations on a set correspond to its partitions. Partitions of {1,2,3}: {{1},{2},{3}}, {{1,2},{3}}, {{1,3},{2}}, {{2,3},{1}}, {{1,2,3}} → 5 (Bell number B₃ = 5)." },
  { id:"q-sets-2", unit:"sets", topic:"One-one functions", diff:"easy", type:"mcq", q:"The number of one-one (injective) functions from a set with 3 elements to a set with 5 elements is:", options:["15","60","125","243"], answer:1, sol:"First element has 5 choices, second 4, third 3 → 5 × 4 × 3 = 60." },
  // — Complex Numbers & Quadratic Equations
  { id:"q-cx-1", unit:"complex", topic:"Powers of i", diff:"easy", type:"mcq", q:"If z = (1 + i)/(1 − i), then z²⁰²⁴ equals:", options:["1","−1","i","−i"], answer:0, sol:"z = (1+i)/(1−i) = (1+i)²/((1−i)(1+i)) = 2i/2 = i. So z²⁰²⁴ = i²⁰²⁴ = (i⁴)⁵⁰⁶ = 1." },
  { id:"q-cx-2", unit:"complex", topic:"Exponential equations", diff:"easy", type:"mcq", q:"The number of real solutions of (√3 + √2)ˣ + (√3 − √2)ˣ = 10 is:", options:["0","1","2","4"], answer:2, sol:"Let t = (√3+√2)ˣ. Since (√3−√2) = 1/(√3+√2), the equation is t + 1/t = 10 → t² − 10t + 1 = 0 → t = 5 ± 2√6. Note (√3+√2)² = 5 + 2√6, so x = 2 or x = −2. Two solutions." },
  { id:"q-cx-3", unit:"complex", topic:"Power sums of roots", diff:"hard", type:"num", q:"If α and β are the roots of x² − √2·x + 2 = 0, then the value of α¹⁴ + β¹⁴ is: (JEE Main 2024)", answer:-128, sol:"Roots: (√2 ± i√6)/2 with |α| = √2 and argument ±60°. So α¹⁴ + β¹⁴ = 2·(√2)¹⁴·cos(14×60°) = 2·128·cos 840° = 256·cos 120° = 256·(−½) = −128." },
  // — Matrices & Determinants
  { id:"q-mat-1", unit:"matrices", topic:"Determinant of scalar multiple", diff:"easy", type:"num", q:"If A is a 3×3 matrix with det A = 2, then det(2A) equals:", answer:16, sol:"det(kA) = kⁿ·det A for an n×n matrix → det(2A) = 2³ × 2 = 16." },
  { id:"q-mat-2", unit:"matrices", topic:"Determinant products", diff:"medium", type:"num", q:"Let A = [[√2, 1], [−1, √2]], B = [[1, 0], [1, 1]], C = ABAᵀ and X = AᵀC²A. Then det X equals: (JEE Main 2024, 1 Feb S1)", answer:729, sol:"det A = 2+1 = 3, det B = 1. det C = det A · det B · det Aᵀ = 3·1·3 = 9. det X = det Aᵀ · (det C)² · det A = 3 · 81 · 3 = 729." },
  { id:"q-mat-3", unit:"matrices", topic:"Cayley–Hamilton", diff:"medium", type:"num", q:"If A = [[2, 3], [3, 5]], then det(A²⁰²⁵ − 3A²⁰²⁴ + A²⁰²³) equals: (JEE Main 2025)", answer:16, sol:"Factor: A²⁰²³(A² − 3A + I). Characteristic equation: λ² − 7λ + 1 = 0 → A² = 7A − I → A² − 3A + I = 4A. det A = 10−9 = 1, so det = (det A)²⁰²³ · det(4A) = 1 · 4²·1 = 16." },
  // — Permutations & Combinations
  { id:"q-pnc-1", unit:"pnc", topic:"Arrangements with restriction", diff:"medium", type:"num", q:"The number of words that can be formed using all letters of the word DAUGHTER so that all the vowels are never together is: (JEE Main 2025)", answer:36000, sol:"Total = 8! = 40320. Vowels A, U, E together: treat as a block → 6!·3! = 4320. Required = 40320 − 4320 = 36000." },
  { id:"q-pnc-2", unit:"pnc", topic:"Alphabetical selections", diff:"medium", type:"num", q:"Five letters are chosen from the English alphabet and arranged in alphabetical order. The number of such words in which the middle (3rd) letter is M is: (JEE Main 2025)", answer:5148, sol:"M is the 13th letter. Choose 2 letters from the 12 before M and 2 from the 13 after M: ¹²C₂ × ¹³C₂ = 66 × 78 = 5148." },
  { id:"q-pnc-3", unit:"pnc", topic:"Counting numbers", diff:"easy", type:"num", q:"The number of 4-digit numbers with all distinct digits is:", answer:4536, sol:"First digit: 9 choices (1–9), then 9, 8, 7 from remaining digits → 9 × 9 × 8 × 7 = 4536." },
  // — Binomial Theorem
  { id:"q-bin-1", unit:"binomial", topic:"Coefficients", diff:"easy", type:"mcq", q:"The coefficient of x² in the expansion of (1 + x)⁵ is:", options:["5","10","20","32"], answer:1, sol:"Coefficient of xʳ is ⁵Cᵣ → ⁵C₂ = 10." },
  { id:"q-bin-2", unit:"binomial", topic:"Remainders via binomial", diff:"easy", type:"num", q:"The remainder when 428²⁰²⁴ is divided by 21 is: (JEE Main 2024, 9 Apr)", answer:1, sol:"428 = 21×20 + 8 → 428 ≡ 8 (mod 21). 8² = 64 ≡ 1 (mod 21). Since 2024 is even, 8²⁰²⁴ = (8²)¹⁰¹² ≡ 1." },
  { id:"q-bin-3", unit:"binomial", topic:"Identifying terms", diff:"medium", type:"num", q:"If the 2nd, 3rd and 4th terms of (x + y)ⁿ are 135, 30 and 10/3 respectively, then 6(n³ + x² + y) equals: (JEE Main 2024, 6 Apr)", answer:806, sol:"T₃/T₂ = ((n−1)/2)(y/x) = 2/9 and T₄/T₃ = ((n−2)/3)(y/x) = 1/9. Dividing → 3(n−1)/2(n−2) = 2 → n = 5, then y/x = 1/9. From T₂: 5x⁴y = 135 → (5/9)x⁵ = 135 → x = 3, y = 1/3. So 6(125 + 9 + 1/3) = 806." },
  // — Sequence & Series
  { id:"q-seq-1", unit:"sequences", topic:"AP sum tricks", diff:"medium", type:"num", q:"In an A.P. a₁, a₂, a₃, …, if a₁ + (a₅ + a₁₀ + a₁₅ + … + a₂₀₂₀) + a₂₀₂₄ = 2233, then the sum of the first 2024 terms is: (JEE Main 2024)", answer:11132, sol:"a₅ + a₂₀₂₀ = a₁ + a₂₀₂₄ (indices sum to 2025). The middle bracket has 404 terms = 202(a₁ + a₂₀₂₄). Total: 203(a₁ + a₂₀₂₄) = 2233 → a₁ + a₂₀₂₄ = 11. Sum = (2024/2)·11 = 11132." },
  { id:"q-seq-2", unit:"sequences", topic:"Infinite GP", diff:"easy", type:"mcq", q:"An infinite G.P. has first term 2 and sum to infinity 4. Its second term is:", options:["1/2","1","3/2","2"], answer:1, sol:"S∞ = a/(1−r) → 4 = 2/(1−r) → r = 1/2. Second term = 2 × 1/2 = 1." },
  // — Limits, Continuity & Differentiability
  { id:"q-lim-1", unit:"limits", topic:"Standard limits", diff:"easy", type:"mcq", q:"limₓ→₀ (1 − cos 2x)/x² equals:", options:["0","1","2","4"], answer:2, sol:"1 − cos 2x = 2 sin²x → limit = 2·(sin x / x)² → 2 × 1 = 2." },
  { id:"q-lim-2", unit:"limits", topic:"Self-referential derivatives", diff:"medium", type:"num", q:"If f(x) = x³ + x²·f′(1) + x·f″(2) + f‴(3) for all x ∈ ℝ, then f′(10) equals: (JEE Main 2024, 27 Jan S1)", answer:202, sol:"Let A = f′(1), B = f″(2), C = f‴(3). Then f‴(x) = 6 → C = 6. f″(x) = 6x + 2A → B = 12 + 2A. f′(x) = 3x² + 2Ax + B → A = 3 + 2A + B → A + B + 3 = 0 → A = −5, B = 2. f′(10) = 300 − 100 + 2 = 202." },
  { id:"q-lim-3", unit:"limits", topic:"Maxima & minima", diff:"medium", type:"num", q:"f(x) = 2x³ − 9ax² + 12a²x + 1 (a > 0) attains a local maximum at x = p and a local minimum at x = q such that p² = q. Then f(3) equals: (JEE Main 2024)", answer:37, sol:"f′(x) = 6(x − a)(x − 2a) → max at p = a, min at q = 2a. p² = q → a² = 2a → a = 2. f(3) = 54 − 162 + 144 + 1 = 37." },
  { id:"q-lim-4", unit:"limits", topic:"Extreme values on interval", diff:"medium", type:"num", q:"The maximum value of f(x) = x³ − 3x + 2 on the interval [0, 2] is:", answer:4, sol:"f′(x) = 3x² − 3 = 0 → x = 1 (in [0,2]). f(0) = 2, f(1) = 0, f(2) = 4 → maximum is 4." },
  // — Integral Calculus
  { id:"q-int-1", unit:"integrals", topic:"Integration by parts", diff:"medium", type:"mcq", q:"∫₀^π x·sin x dx equals:", options:["π/2","π","2π","π²"], answer:1, sol:"By parts: [−x cos x]₀^π + ∫₀^π cos x dx = (π) + (0) = π." },
  { id:"q-int-2", unit:"integrals", topic:"King's property", diff:"hard", type:"mcq", q:"∫₀^π (x·sin x)/(1 + cos²x) dx equals:", options:["π²/2","π²/4","π/4","π²"], answer:1, sol:"Using ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a−x)dx: 2I = π∫₀^π sin x/(1+cos²x) dx = π[−tan⁻¹(cos x)]₀^π = π(π/4 + π/4) = π²/2 → I = π²/4." },
  { id:"q-int-3", unit:"integrals", topic:"Definite integrals", diff:"easy", type:"mcq", q:"∫₀^(π/2) sin²x dx equals:", options:["π/2","π/4","1","π"], answer:1, sol:"sin²x = (1 − cos 2x)/2 → integral = [x/2 − sin 2x/4]₀^(π/2) = π/4." },
  // — Differential Equations
  { id:"q-de-1", unit:"diffeq", topic:"Linear first order", diff:"medium", type:"num", q:"If dy/dx + y/x = x², with y(1) = 1, then 8·y(2) equals:", answer:19, sol:"Integrating factor = x → d(xy)/dx = x³ → xy = x⁴/4 + C. y(1) = 1 → C = 3/4. y(2) = (4 + 3/4)/2 = 19/8 → 8·y(2) = 19." },
  { id:"q-de-2", unit:"diffeq", topic:"Order & degree", diff:"easy", type:"mcq", q:"The order and degree of the differential equation (d²y/dx²)³ + (dy/dx)⁴ = 0 are respectively:", options:["2 and 3","3 and 2","2 and 4","3 and 4"], answer:0, sol:"Highest derivative is d²y/dx² → order 2. Its power is 3 → degree 3." },
  // — Co-ordinate Geometry
  { id:"q-cg-1", unit:"coord", topic:"Parallel lines", diff:"easy", type:"mcq", q:"The distance between the parallel lines 3x + 4y = 9 and 6x + 8y = 15 is:", options:["3/2","3/10","6","9/10"], answer:1, sol:"Second line: 3x + 4y = 15/2. Distance = |9 − 15/2| / √(9+16) = (3/2)/5 = 3/10." },
  { id:"q-cg-2", unit:"coord", topic:"Parabola", diff:"easy", type:"num", q:"A parabola has vertex (2, −1) and directrix 4x − 3y = 21. The length of its latus rectum is:", answer:8, sol:"a = distance from vertex to directrix = |4(2) − 3(−1) − 21|/√(16+9) = 10/5 = 2. Latus rectum = 4a = 8." },
  { id:"q-cg-3", unit:"coord", topic:"Ellipse eccentricity", diff:"medium", type:"mcq", q:"If the minor axis of an ellipse is equal to half the distance between its foci, the eccentricity is:", options:["1/√5","2/√5","√3/2","1/2"], answer:1, sol:"2b = (1/2)(2c) → c = 2b. b² = a² − c² → b² = a² − 4b² → a² = 5b². e = c/a = 2b/(√5·b) = 2/√5." },
  { id:"q-cg-4", unit:"coord", topic:"Circle through points", diff:"medium", type:"num", q:"The radius of the circle passing through (0, 0), (6, 0) and (0, 8) is:", answer:5, sol:"The angle at the origin is 90°, so (6,0)–(0,8) is a diameter of length √(36+64) = 10 → radius 5." },
  // — Three Dimensional Geometry
  { id:"q-3d-1", unit:"threed", topic:"Direction cosines", diff:"easy", type:"mcq", q:"The direction cosines of the line along the vector 2î − 3ĵ + 6k̂ are:", options:["(2, −3, 6)","(2/7, −3/7, 6/7)","(2/5, −3/5, 6/5)","(1/7, −1/7, 1/7)"], answer:1, sol:"Magnitude = √(4 + 9 + 36) = 7 → direction cosines = (2/7, −3/7, 6/7)." },
  { id:"q-3d-2", unit:"threed", topic:"Shortest distance", diff:"medium", type:"mcq", q:"The shortest distance between the lines (x−1)/2 = (y−2)/3 = (z−3)/4 and (x−2)/3 = (y−4)/4 = (z−5)/5 is:", options:["1/√6","1/6","√6","0"], answer:0, sol:"b₁×b₂ = (−1, 2, −1), a₂−a₁ = (1, 2, 2). |(a₂−a₁)·(b₁×b₂)| = |−1+4−2| = 1, |b₁×b₂| = √6 → distance = 1/√6." },
  // — Vector Algebra
  { id:"q-vec-1", unit:"vectors", topic:"Angle between vectors", diff:"easy", type:"mcq", q:"If |a| = 3, |b| = 4 and a·b = 6, the angle between a and b is:", options:["30°","45°","60°","90°"], answer:2, sol:"cos θ = (a·b)/(|a||b|) = 6/12 = 1/2 → θ = 60°." },
  { id:"q-vec-2", unit:"vectors", topic:"Cross product identity", diff:"medium", type:"mcq", q:"If |a| = 3, |b| = 4 and a·b = 6, then |a × b| equals:", options:["6","6√3","12","3√6"], answer:1, sol:"|a×b|² + (a·b)² = |a|²|b|² → |a×b|² = 144 − 36 = 108 → |a×b| = 6√3." },
  // — Statistics & Probability
  { id:"q-st-1", unit:"stats", topic:"Variance", diff:"easy", type:"mcq", q:"The variance of the observations 1, 3, 5, 7, 9 is:", options:["5","8","10","16"], answer:1, sol:"Mean = 5. Σ(xᵢ − 5)² = 16+4+0+4+16 = 40 → variance = 40/5 = 8." },
  { id:"q-st-2", unit:"stats", topic:"Bayes' theorem", diff:"medium", type:"mcq", q:"Bags X, Y, Z contain ₹1 and ₹5 coins: X(5, 4), Y(4, 5), Z(3, 6). A bag is chosen at random and a coin drawn turns out to be ₹1. The probability it came from bag Y is: (JEE Main 2024, 9 Apr)", options:["1/4","1/3","4/9","5/12"], answer:1, sol:"P(₹1) = (1/3)(5/9 + 4/9 + 3/9) = 12/27. P(Y and ₹1) = (1/3)(4/9) = 4/27. Bayes → (4/27)/(12/27) = 1/3." },
  { id:"q-st-3", unit:"stats", topic:"Classical probability", diff:"medium", type:"mcq", q:"Three letters are posted at random into 5 letter boxes. The probability that they go into exactly two boxes is: (JEE Main 2024, 6 Apr)", options:["6/25","12/25","18/25","3/5"], answer:1, sol:"Total = 5³ = 125. Choose 2 boxes: ⁵C₂ = 10; onto distributions into 2 boxes: 2³ − 2 = 6 → favourable 60. P = 60/125 = 12/25." },
  { id:"q-st-4", unit:"stats", topic:"Independent events", diff:"easy", type:"mcq", q:"A and B attempt a problem independently with P(A solves) = 1/2 and P(B solves) = 1/3. The probability that the problem is solved is:", options:["1/2","2/3","5/6","1/6"], answer:1, sol:"P(neither) = (1/2)(2/3) = 1/3 → P(solved) = 1 − 1/3 = 2/3." },
  // — Trigonometry
  { id:"q-tr-1", unit:"trig", topic:"Inverse trig", diff:"easy", type:"mcq", q:"sin⁻¹( sin(5π/6) ) equals:", options:["5π/6","π/6","−π/6","π/3"], answer:1, sol:"sin(5π/6) = 1/2 and sin⁻¹ returns values in [−π/2, π/2] → sin⁻¹(1/2) = π/6." },
  { id:"q-tr-2", unit:"trig", topic:"Identities", diff:"medium", type:"mcq", q:"If sin θ + cos θ = 1/5 with 0 < θ < π, then sin θ·cos θ equals:", options:["12/25","−12/25","−24/25","13/25"], answer:1, sol:"Squaring: 1 + 2 sin θ cos θ = 1/25 → sin θ cos θ = (1/25 − 1)/2 = −12/25." },
];
const DIFF_RATING = { easy: 1300, medium: 1550, hard: 1800 };
const DIFF_XP = { easy: 10, medium: 20, hard: 30 };

/* ================= GAMIFICATION DATA ================= */
const RANKS = [
  { xp: 0, name: "Aspirant", icon: "🌱" }, { xp: 250, name: "Solver", icon: "✏️" }, { xp: 700, name: "Grinder", icon: "🔩" },
  { xp: 1500, name: "Ranker", icon: "📈" }, { xp: 2800, name: "Top 1 Percenter", icon: "🎯" }, { xp: 4800, name: "AIR Contender", icon: "🏆" },
];
const BADGE_DEFS = [
  { id: "first", name: "First Blood", desc: "Complete your first quiz", icon: "🚀", check: s => s.history.length >= 1 },
  { id: "streak3", name: "Ignition", desc: "3-day streak", icon: "🔥", check: s => s.streak.count >= 3 },
  { id: "streak7", name: "Unbreakable", desc: "7-day streak", icon: "⚡", check: s => s.streak.count >= 7 },
  { id: "perfect", name: "Flawless", desc: "Score 100% in a quiz of 5+ questions", icon: "💎", check: s => s.history.some(h => h.total >= 5 && h.correct === h.total) },
  { id: "fifty", name: "Half Century", desc: "Attempt 50 questions", icon: "🏏", check: s => Object.values(s.units).reduce((a, u) => a + u.attempts, 0) >= 50 },
  { id: "century", name: "Century", desc: "Attempt 100 questions", icon: "💯", check: s => Object.values(s.units).reduce((a, u) => a + u.attempts, 0) >= 100 },
  { id: "calc", name: "Calculus Crusher", desc: "Average 60%+ mastery across Calculus", icon: "∫", check: s => avgMastery(s, AREA_UNITS.calculus) >= 60 },
  { id: "explorer", name: "Cartographer", desc: "Practice every one of the 14 units", icon: "🗺️", check: s => UNITS.every(u => (s.units[u.id] || {}).attempts > 0) },
];
const BOTS = ["Aarav S.", "Diya P.", "Ishaan K.", "Ananya R.", "Vihaan M.", "Sara T.", "Kabir J.", "Mira D.", "Advait N."];

/* ================= HELPERS ================= */
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const fmtClock = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const hashStr = str => { let h = 0; for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) | 0; } return Math.abs(h); };
const weekKey = () => { const d = new Date(); const onejan = new Date(d.getFullYear(), 0, 1); return d.getFullYear() + "-w" + Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7); };
const rankFor = xp => { let r = RANKS[0], next = null; for (let i = 0; i < RANKS.length; i++) { if (xp >= RANKS[i].xp) r = RANKS[i]; else { next = RANKS[i]; break; } } return { ...r, next }; };
const avgMastery = (s, ids) => Math.round(ids.reduce((a, id) => a + ((s.units[id] || {}).mastery || 0), 0) / ids.length);
const masteryLabel = m => m >= 80 ? "Mastered" : m >= 55 ? "Proficient" : m >= 30 ? "Familiar" : m > 0 ? "Attempted" : "Not started";
const masteryColor = m => m >= 80 ? "var(--ok)" : m >= 55 ? "var(--blue)" : m >= 30 ? "var(--lamp)" : "var(--dim)";
const SR_INTERVALS = [1, 3, 7, 14, 30];

const SELF_SEED = { weak: 1320, ok: 1450, strong: 1580 };
function freshUnits(selfRating) {
  const out = {};
  UNITS.forEach(u => { const lvl = selfRating ? selfRating[u.area] : "ok"; out[u.id] = { rating: SELF_SEED[lvl] || 1450, mastery: 0, attempts: 0, correct: 0, srBox: 0, nextReview: null, lastSeen: null }; });
  return out;
}
const eloExpected = (r, q) => 1 / (1 + Math.pow(10, (q - r) / 400));
function applyElo(rating, qDiff, got) { return Math.round(rating + 24 * (got - eloExpected(rating, qDiff))); }

/* deterministic-ish sampler that respects adaptive band + avoids repeats */
function pickQuestions(unitIds, n, state, fixedDiff) {
  const seen = new Set(state.qSeen || []);
  let pool = BANK.filter(q => unitIds.includes(q.unit));
  if (fixedDiff && fixedDiff !== "adaptive") pool = pool.filter(q => q.diff === fixedDiff);
  const scored = pool.map(q => {
    const r = (state.units[q.unit] || {}).rating || 1450;
    const gap = Math.abs(DIFF_RATING[q.diff] - r);
    return { q, key: gap + (seen.has(q.id) ? 600 : 0) + Math.random() * 220 };
  }).sort((a, b) => a.key - b.key);
  const picked = []; const usedTopics = new Set();
  for (const s of scored) { if (picked.length >= n) break; if (usedTopics.has(s.q.topic) && scored.length > n + 2) continue; picked.push(s.q); usedTopics.add(s.q.topic); }
  for (const s of scored) { if (picked.length >= n) break; if (!picked.includes(s.q)) picked.push(s.q); }
  return picked.slice(0, n).sort(() => Math.random() - 0.5);
}
function weightedMixedUnits(state, k) {
  const w = UNITS.map(u => ({ id: u.id, w: (100 - ((state.units[u.id] || {}).mastery || 0)) * (u.yield / 6 + 0.5) }));
  const out = []; const poolW = [...w];
  for (let i = 0; i < k && poolW.length; i++) {
    const tot = poolW.reduce((a, x) => a + x.w, 0); let r = Math.random() * tot;
    let idx = 0; for (let j = 0; j < poolW.length; j++) { r -= poolW[j].w; if (r <= 0) { idx = j; break; } }
    out.push(poolW[idx].id); poolW.splice(idx, 1);
  }
  return out;
}
const weakestUnit = state => UNITS.map(u => u.id).sort((a, b) => ((state.units[a] || {}).mastery || 0) - ((state.units[b] || {}).mastery || 0))[0];
const dueReviews = state => UNITS.filter(u => { const s = state.units[u.id]; return s && s.attempts > 0 && s.nextReview && s.nextReview <= todayISO(); }).map(u => u.id);
const recommendedUnit = state => {
  const unlocked = UNITS.filter(u => u.prereq.every(p => ((state.units[p] || {}).mastery || 0) >= 25));
  const cands = (unlocked.length ? unlocked : UNITS).filter(u => ((state.units[u.id] || {}).mastery || 0) < 80);
  if (!cands.length) return UNITS[0];
  const score = u => (((state.units[u.id] || {}).mastery || 0)) - u.yield * 2.2;
  return cands.sort((a, b) => score(a) - score(b))[0];
};

/* ---- daily plan by chronotype (task-based, topper-style) ---- */
function planFor(chrono, state) {
  const T = { early: ["6:00 AM", "9:30 AM", "5:30 PM", "9:30 PM"], day: ["8:30 AM", "12:30 PM", "6:00 PM", "10:00 PM"], night: ["11:00 AM", "4:00 PM", "9:00 PM", "12:30 AM"] }[chrono] || ["8:30 AM", "12:30 PM", "6:00 PM", "10:00 PM"];
  const weakId = weakestUnit(state); const recId = recommendedUnit(state).id; const due = dueReviews(state);
  const isSun = new Date().getDay() === 0;
  const tasks = [
    { id: "power", time: T[0], title: "Power Hour", sub: "Hit your weakest unit while your mind is freshest — " + UMAP[weakId].short, icon: "⚡", cfg: { units: [weakId], n: 5, diff: "adaptive", label: "Power Hour · " + UMAP[weakId].short } },
    { id: "dpp", time: T[1], title: "Daily Practice Problems", sub: "DPP on your current pathway unit — " + UMAP[recId].short, icon: "📘", cfg: { units: [recId], n: 5, diff: "adaptive", label: "DPP · " + UMAP[recId].short } },
    isSun
      ? { id: "mock", time: T[2], title: "Sunday Mock", sub: "10-question mixed mock under exam timing", icon: "🏁", cfg: { units: "mixed", n: 10, diff: "adaptive", label: "Sunday Mock" } }
      : { id: "drill", time: T[2], title: "Speed Drill", sub: "Mixed 5-question drill across units, exam pace", icon: "⏱️", cfg: { units: "mixed", n: 5, diff: "adaptive", label: "Speed Drill" } },
    { id: "review", time: T[3], title: chrono === "night" ? "Overnight Revision Queue" : "Night Revision Queue", sub: due.length ? "Spaced review due: " + due.map(d => UMAP[d].short).join(", ") : "Nothing due — light recap of today's mistakes", icon: "🌙", cfg: { units: due.length ? due : [weakId], n: 4, diff: "adaptive", label: "Revision Queue", review: true } },
  ];
  return tasks;
}

/* ================= AI AGENT LAYER (Claude API) ================= */
async function claudeCall(system, messages, maxTokens = 1800) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTokens, system, messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "API error");
  return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
}
const stripJSON = t => { let s = t.replace(/```json|```/g, "").trim(); const i = Math.min(...["[", "{"].map(c => { const k = s.indexOf(c); return k === -1 ? 1e9 : k; })); return s.slice(i); };

async function agentGenerateQuestions(unit, diff, n) {
  const u = UMAP[unit];
  const sys = "You are a JEE Main mathematics question setter for the NTA JEE Main 2026 exam. You write original, computation-clean questions strictly within the official NTA syllabus. Use Unicode math symbols (², ³, √, π, ∫, θ, ≤, →, î ĵ k̂) — never LaTeX. Numerical answers must be integers or simple decimals. Respond with ONLY a valid JSON array, no markdown, no commentary.";
  const user = `Generate ${n} original JEE Main questions on the unit "${u.name}" (subtopics: ${u.topics.join("; ")}) at ${diff === "adaptive" ? "mixed easy/medium" : diff} difficulty. Mix MCQ and numerical-value types (JEE pattern). JSON schema per item: {"type":"mcq"|"num","q":"question text","options":["A","B","C","D"] (mcq only),"answer": index 0-3 for mcq OR number for num,"sol":"concise step-by-step solution","diff":"easy"|"medium"|"hard"}`;
  const text = await claudeCall(sys, [{ role: "user", content: user }], 2400);
  const arr = JSON.parse(stripJSON(text));
  if (!Array.isArray(arr) || !arr.length) throw new Error("Bad AI output");
  return arr.filter(x => x.q && (x.type === "num" ? typeof x.answer === "number" : Array.isArray(x.options))).slice(0, n).map((x, i) => ({
    id: "ai-" + Date.now() + "-" + i, unit, topic: "AI · " + u.short, diff: x.diff || (diff === "adaptive" ? "medium" : diff),
    type: x.type === "num" ? "num" : "mcq", q: String(x.q), options: x.options ? x.options.map(String) : undefined,
    answer: x.type === "num" ? Number(x.answer) : Number(x.answer), sol: String(x.sol || "—"), ai: true,
  }));
}
async function agentTutor(question, studentAns, history) {
  const sys = "You are Ascent's AI maths tutor for JEE aspirants. Be warm, precise and concise. Explain step-by-step using Unicode math (no LaTeX). Diagnose the likely mistake if the student's answer is wrong. Keep replies under 180 words. End with one short check-for-understanding question when natural.";
  const ctx = `QUESTION: ${question.q}\n${question.options ? "OPTIONS: " + question.options.map((o, i) => "ABCD"[i] + ") " + o).join("  ") : "TYPE: numerical"}\nCORRECT ANSWER: ${question.type === "mcq" ? "ABCD"[question.answer] + ") " + question.options[question.answer] : question.answer}\nOFFICIAL SOLUTION: ${question.sol}\nSTUDENT'S ANSWER: ${studentAns === null || studentAns === undefined || studentAns === "" ? "(left blank)" : question.type === "mcq" ? "ABCD"[studentAns] : studentAns}`;
  const msgs = [{ role: "user", content: ctx + "\n\nExplain this to me." }, ...history.map(m => ({ role: m.role, content: m.text }))];
  return claudeCall(sys, msgs, 700);
}
async function agentCoach(state) {
  const stats = UNITS.map(u => { const s = state.units[u.id] || {}; return `${u.short}: mastery ${s.mastery || 0}%, ${s.correct || 0}/${s.attempts || 0} correct, yield ~${u.yield}%`; }).join("\n");
  const days = state.profile.examDate ? Math.max(0, daysBetween(todayISO(), state.profile.examDate)) : "?";
  const sys = 'You are Ascent\'s AI coach for a JEE Main maths aspirant. Analyze their per-unit stats and return ONLY valid JSON (no markdown): {"headline":"one punchy line","analysis":"3-4 sentences, specific and honest, reference units by name","focus":["unitShortName1","unitShortName2","unitShortName3"],"plan":[{"title":"...","why":"..."},{"title":"...","why":"..."},{"title":"...","why":"..."}],"pep":"one genuine motivating line, no clichés"}';
  const user = `Student: ${state.profile.name}. Days to exam: ${days}. Daily hours: ${state.profile.hours}. Streak: ${state.streak.count}. Chronotype: ${state.profile.chrono}.\nPer-unit stats (yield = approx weight in paper):\n${stats}\n\nGive me coaching.`;
  const text = await claudeCall(sys, [{ role: "user", content: user }], 900);
  return JSON.parse(stripJSON(text));
}

/* ================= SMALL UI ATOMS ================= */
function Ring({ pct, size = 54, stroke = 5, color = "var(--blue)", children }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--card2)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - clamp(pct, 0, 100) / 100)} style={{ transition: "stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
}
function Toast({ toast }) { if (!toast) return null; return <div className="toast">{toast.icon}<span>{toast.msg}</span></div>; }
function Sheet({ open, onClose, children }) {
  if (!open) return null;
  return (<><div className="sheet-bg" onClick={onClose} /><div className="sheet">{children}</div></>);
}
function SectionTitle({ eyebrow, title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "22px 2px 10px" }}>
      <div>{eyebrow && <div className="eyebrow" style={{ marginBottom: 3 }}>{eyebrow}</div>}<h3 style={{ fontSize: 17 }}>{title}</h3></div>
      {right}
    </div>
  );
}

/* ================= ONBOARDING ================= */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [attempt, setAttempt] = useState("jan27");
  const [hours, setHours] = useState(4);
  const [chrono, setChrono] = useState("day");
  const [ratings, setRatings] = useState({ algebra: "ok", calculus: "weak", geometry: "ok", probability: "ok" });
  const ATTEMPTS = [{ id: "jan27", label: "Jan 2027", date: "2027-01-24" }, { id: "apr27", label: "Apr 2027", date: "2027-04-04" }, { id: "jan28", label: "Jan 2028", date: "2028-01-24" }];
  const steps = 4;
  const next = () => step < steps - 1 ? setStep(step + 1) : onDone({ name: name.trim() || "Aspirant", examDate: ATTEMPTS.find(a => a.id === attempt).date, attemptLabel: ATTEMPTS.find(a => a.id === attempt).label, hours, chrono, selfRating: ratings });
  return (
    <div className="frame" style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 40, minHeight: "100vh" }}>
      <div className="fadeup" key={step}>
        <div style={{ display: "flex", gap: 5, marginBottom: 26 }}>{Array.from({ length: steps }).map((_, i) => <div key={i} style={{ height: 4, flex: 1, borderRadius: 99, background: i <= step ? "var(--lamp)" : "var(--card2)", transition: "background .3s" }} />)}</div>
        {step === 0 && (<div>
          <div className="eyebrow" style={{ color: "var(--lamp)" }}>ASCENT · JEE MATHS</div>
          <h1 style={{ fontSize: 32, margin: "10px 0 8px", lineHeight: 1.15 }}>Maths, mastered.<br />Rank, earned.</h1>
          <p style={{ color: "var(--mut)", fontSize: 15, lineHeight: 1.6, marginBottom: 26 }}>A personalized pathway through the official NTA JEE Main 2026 syllabus — adaptive quizzes, exam-true grading, and an AI coach that studies <i>you</i>.</p>
          <div className="eyebrow" style={{ marginBottom: 8 }}>What should we call you?</div>
          <input className="input sm" placeholder="Your first name" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && next()} />
        </div>)}
        {step === 1 && (<div>
          <h2 style={{ fontSize: 24, marginBottom: 6 }}>Your target attempt</h2>
          <p style={{ color: "var(--mut)", fontSize: 14, marginBottom: 18 }}>We pace your pathway around the countdown.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ATTEMPTS.map(a => (
              <button key={a.id} className={"opt tap" + (attempt === a.id ? " sel" : "")} onClick={() => setAttempt(a.id)}>
                <span className="optkey">{attempt === a.id ? "✓" : ""}</span>
                <span><b className="disp">JEE Main {a.label}</b><br /><span style={{ color: "var(--mut)", fontSize: 13 }}>{Math.max(0, daysBetween(todayISO(), a.date))} days from today</span></span>
              </button>))}
          </div>
          <div className="eyebrow" style={{ margin: "22px 0 10px" }}>Daily maths study time — {hours}h</div>
          <input type="range" min="1" max="8" value={hours} onChange={e => setHours(+e.target.value)} style={{ width: "100%", accentColor: "var(--lamp)" }} />
        </div>)}
        {step === 2 && (<div>
          <h2 style={{ fontSize: 24, marginBottom: 6 }}>When does your brain peak?</h2>
          <p style={{ color: "var(--mut)", fontSize: 14, marginBottom: 18 }}>Your daily task cycle — Power Hour, DPP, drills, revision — gets scheduled around it.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ id: "early", t: "Early bird", d: "Power Hour at 6 AM · revision by 9:30 PM", I: Sunrise }, { id: "day", t: "Day grinder", d: "Power Hour at 8:30 AM · revision at 10 PM", I: Sun }, { id: "night", t: "Night owl", d: "Power Hour at 11 AM · overnight queue at 12:30 AM", I: Moon }].map(c => (
              <button key={c.id} className={"opt tap" + (chrono === c.id ? " sel" : "")} onClick={() => setChrono(c.id)}>
                <c.I size={20} style={{ color: chrono === c.id ? "var(--blue)" : "var(--dim)", flexShrink: 0, marginTop: 2 }} />
                <span><b className="disp">{c.t}</b><br /><span style={{ color: "var(--mut)", fontSize: 13 }}>{c.d}</span></span>
              </button>))}
          </div>
        </div>)}
        {step === 3 && (<div>
          <h2 style={{ fontSize: 24, marginBottom: 6 }}>Quick self-diagnostic</h2>
          <p style={{ color: "var(--mut)", fontSize: 14, marginBottom: 18 }}>Be honest — this seeds your adaptive difficulty and pathway order. The engine recalibrates with every question you solve.</p>
          {Object.entries(AREAS).map(([k, label]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <div className="eyebrow" style={{ marginBottom: 7 }}>{label}</div>
              <div className="seg">{["weak", "ok", "strong"].map(v => <button key={v} className={ratings[k] === v ? "on" : ""} onClick={() => setRatings({ ...ratings, [k]: v })}>{v === "weak" ? "Shaky" : v === "ok" ? "Okay" : "Strong"}</button>)}</div>
            </div>))}
        </div>)}
        <button className="btn primary full" style={{ marginTop: 26 }} onClick={next}>
          {step === steps - 1 ? "Build my pathway" : "Continue"} <ChevronRight size={17} />
        </button>
        {step > 0 && <button className="btn ghost full" style={{ marginTop: 10 }} onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>}
      </div>
    </div>
  );
}

/* ================= HOME ================= */
function HomeScr({ state, startQuiz, setTab }) {
  const rank = rankFor(state.xp);
  const nextXp = rank.next ? rank.next.xp : rank.xp;
  const prevXp = rank.xp;
  const pct = rank.next ? ((state.xp - prevXp) / (nextXp - prevXp)) * 100 : 100;
  const days = Math.max(0, daysBetween(todayISO(), state.profile.examDate));
  const plan = useMemo(() => planFor(state.profile.chrono, state), [state.units, state.profile.chrono]);
  const doneToday = state.done[todayISO()] || [];
  const due = dueReviews(state);
  const rec = recommendedUnit(state);
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Late-night grind";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }} className="fadeup">
        <div>
          <div className="eyebrow" style={{ color: "var(--lamp)" }}>ASCENT · JEE MATHS</div>
          <h1 style={{ fontSize: 24, marginTop: 4 }}>{greet}, {state.profile.name}</h1>
        </div>
        <div className="chip lamp" title="Daily streak"><Flame size={13} className={state.streak.count > 0 ? "flame" : ""} /> {state.streak.count}<span style={{ opacity: .6 }}>·</span><Shield size={11} /> {state.streak.freezes}</div>
      </div>
      <div className="card hi fadeup" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 18 }}>{rank.icon}</span><b className="disp" style={{ fontSize: 15 }}>{rank.name}</b></div>
          <span className="mono" style={{ fontSize: 12, color: "var(--mut)" }}>{state.xp} XP{rank.next ? " / " + rank.next.xp : ""}</span>
        </div>
        <div className="bar lamp"><i style={{ width: pct + "%" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span className="chip"><CalendarDays size={12} /> <span className="mono">{days}</span> days to {state.profile.attemptLabel}</span>
          {rank.next && <span style={{ fontSize: 11.5, color: "var(--dim)" }}>next: {rank.next.name}</span>}
        </div>
      </div>
      {due.length > 0 && (
        <button className="card tap fadeup" style={{ width: "100%", textAlign: "left", display: "flex", gap: 12, alignItems: "center", marginBottom: 12, borderColor: "rgba(167,139,250,.4)", background: "linear-gradient(140deg, rgba(167,139,250,.10), var(--card))" }}
          onClick={() => startQuiz({ units: due, n: Math.min(6, due.length * 2 + 2), diff: "adaptive", label: "Revision Queue", review: true, taskId: "review" })}>
          <RefreshCw size={18} style={{ color: "var(--vio)", flexShrink: 0 }} />
          <span style={{ flex: 1 }}><b className="disp" style={{ fontSize: 14 }}>Memory fading on {due.length} unit{due.length > 1 ? "s" : ""}</b><br /><span style={{ fontSize: 12.5, color: "var(--mut)" }}>Spaced review due: {due.map(d => UMAP[d].short).join(", ")}</span></span>
          <ChevronRight size={16} style={{ color: "var(--dim)" }} />
        </button>)}
      <SectionTitle eyebrow={"Your " + (state.profile.chrono === "early" ? "early-bird" : state.profile.chrono === "night" ? "night-owl" : "daytime") + " cycle"} title="Today's plan" right={<span className="mono" style={{ fontSize: 11, color: "var(--dim)" }}>{doneToday.length}/{plan.length} done</span>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {plan.map((t, i) => {
          const done = doneToday.includes(t.id);
          return (
            <button key={t.id} className="card tap fadeup" style={{ width: "100%", textAlign: "left", display: "flex", gap: 12, alignItems: "center", opacity: done ? .55 : 1, animationDelay: i * 60 + "ms" }}
              onClick={() => !done && startQuiz({ ...t.cfg, taskId: t.id })}>
              <span style={{ fontSize: 20, filter: done ? "grayscale(1)" : "none" }}>{t.icon}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}><b className="disp" style={{ fontSize: 14.5 }}>{t.title}</b><span className="mono" style={{ fontSize: 10.5, color: "var(--dim)" }}>{t.time}</span></span>
                <span style={{ fontSize: 12.5, color: "var(--mut)", display: "block", marginTop: 2 }}>{t.sub}</span>
              </span>
              {done ? <span className="chip ok"><Check size={12} /> +25</span> : <Play size={16} style={{ color: "var(--lamp)" }} />}
            </button>);
        })}
      </div>
      <SectionTitle eyebrow="Pathway" title="Up next for you" right={<button className="btn ghost" style={{ padding: "7px 12px", fontSize: 12.5 }} onClick={() => setTab("path")}>Full path</button>} />
      <div className="card hi tap fadeup" onClick={() => startQuiz({ units: [rec.id], n: 5, diff: "adaptive", label: "Pathway · " + rec.short })} style={{ display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
        <Ring pct={(state.units[rec.id] || {}).mastery || 0} size={56} color={masteryColor((state.units[rec.id] || {}).mastery || 0)}>
          <span className="mono" style={{ fontSize: 11, fontWeight: 600 }}>{(state.units[rec.id] || {}).mastery || 0}%</span>
        </Ring>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}><b className="disp" style={{ fontSize: 15 }}>{rec.name}</b>{rec.hi && <span className="chip lamp" style={{ fontSize: 10 }}>⚡ high-yield ~{rec.yield}%</span>}</div>
          <span style={{ fontSize: 12.5, color: "var(--mut)" }}>{masteryLabel((state.units[rec.id] || {}).mastery || 0)} · picked by yield × your gaps</span>
        </div>
        <ChevronRight size={17} style={{ color: "var(--dim)" }} />
      </div>
      <SectionTitle eyebrow="Jump in" title="Quick actions" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 }} className="fadeup">
        {[{ t: "Quick DPP", d: "5Q mixed", icon: <Dumbbell size={17} />, cfg: { units: "mixed", n: 5, diff: "adaptive", label: "Quick DPP" } },
        { t: "AI Quiz", d: "fresh Qs", icon: <Sparkles size={17} />, cfg: { units: [rec.id], n: 4, diff: "adaptive", label: "AI Quiz · " + rec.short, ai: true } },
        { t: "Mini Mock", d: "10Q timed", icon: <Flag size={17} />, cfg: { units: "mixed", n: 10, diff: "adaptive", label: "Mini Mock" } }].map(a => (
          <button key={a.t} className="card tap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "15px 8px", border: "1px solid var(--line)", cursor: "pointer", background: "var(--card)" }} onClick={() => startQuiz(a.cfg)}>
            <span style={{ color: "var(--lamp)" }}>{a.icon}</span>
            <b className="disp" style={{ fontSize: 13, color: "var(--txt)" }}>{a.t}</b>
            <span className="mono" style={{ fontSize: 10, color: "var(--dim)" }}>{a.d}</span>
          </button>))}
      </div>
    </div>
  );
}

/* ================= PATHWAY ================= */
function PathScr({ state, startQuiz }) {
  const phases = [{ n: 1, t: "Foundations", d: "Class 11 pillars — counting, algebra, trig" }, { n: 2, t: "The Core", d: "Where ~70% of the paper lives" }, { n: 3, t: "Finishers", d: "Built on the core — close the loop" }];
  const rec = recommendedUnit(state);
  return (
    <div>
      <div className="fadeup"><div className="eyebrow" style={{ color: "var(--lamp)" }}>NTA JEE MAIN 2026 · MATHEMATICS</div>
        <h1 style={{ fontSize: 24, margin: "4px 0 2px" }}>Your pathway</h1>
        <p style={{ fontSize: 13.5, color: "var(--mut)" }}>All 14 official units · ordered by prerequisites, weighted by paper yield. Mastery moves both ways — keep it warm.</p></div>
      {phases.map(ph => (
        <div key={ph.n}>
          <SectionTitle eyebrow={"Phase " + ph.n + " — " + ph.d} title={ph.t} />
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {UNITS.filter(u => u.phase === ph.n).map((u, i) => {
              const s = state.units[u.id] || { mastery: 0, attempts: 0 };
              const locked = !u.prereq.every(p => ((state.units[p] || {}).mastery || 0) >= 25);
              const isRec = rec.id === u.id;
              return (
                <div key={u.id} className={"card tap fadeup" + (isRec ? " hi" : "")} style={{ display: "flex", gap: 13, alignItems: "center", animationDelay: i * 50 + "ms", borderColor: isRec ? "rgba(255,180,84,.45)" : undefined, boxShadow: isRec ? "0 0 26px rgba(255,180,84,.12)" : undefined, cursor: "pointer", opacity: locked ? .72 : 1 }}
                  onClick={() => startQuiz({ units: [u.id], n: 5, diff: "adaptive", label: u.short })}>
                  <Ring pct={s.mastery} size={50} color={masteryColor(s.mastery)}>
                    {locked ? <Lock size={13} style={{ color: "var(--dim)" }} /> : <span className="mono" style={{ fontSize: 10.5, fontWeight: 600 }}>{s.mastery}%</span>}
                  </Ring>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                      <span className="mono" style={{ fontSize: 10, color: "var(--dim)" }}>{String(u.n).padStart(2, "0")}</span>
                      <b className="disp" style={{ fontSize: 14.5 }}>{u.name}</b>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
                      <span className="chip" style={{ fontSize: 9.5, color: masteryColor(s.mastery), borderColor: "var(--line)" }}>{masteryLabel(s.mastery)}</span>
                      {u.hi && <span className="chip lamp" style={{ fontSize: 9.5 }}>⚡ ~{u.yield}% of paper</span>}
                      {isRec && <span className="chip lamp" style={{ fontSize: 9.5 }}>★ up next</span>}
                      {locked && <span className="chip" style={{ fontSize: 9.5 }}>needs {u.prereq.map(p => UMAP[p].short).join(", ")}</span>}
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--dim)", flexShrink: 0 }} />
                </div>);
            })}
          </div>
        </div>))}
      <p style={{ fontSize: 11.5, color: "var(--dim)", margin: "18px 4px", lineHeight: 1.6 }}>Yield % is an estimate from 2023–25 paper analyses (NTA publishes no official weightage). Locked units open at 25% mastery of prerequisites — tap one anyway to attempt it early.</p>
    </div>
  );
}

/* ================= PRACTICE SETUP ================= */
function PracticeScr({ state, startQuiz }) {
  const [unit, setUnit] = useState("mixed");
  const [n, setN] = useState(5);
  const [diff, setDiff] = useState("adaptive");
  const [src, setSrc] = useState("bank");
  const label = (src === "ai" ? "AI Quiz · " : "") + (unit === "mixed" ? "Mixed practice" : UMAP[unit].short);
  return (
    <div>
      <div className="fadeup"><div className="eyebrow" style={{ color: "var(--lamp)" }}>BUILD A SESSION</div>
        <h1 style={{ fontSize: 24, margin: "4px 0 2px" }}>Practice</h1>
        <p style={{ fontSize: 13.5, color: "var(--mut)" }}>Exam-true grading: <span className="mono" style={{ color: "var(--ok)" }}>+4</span> correct · <span className="mono" style={{ color: "var(--bad)" }}>−1</span> wrong · 0 skipped — on MCQs and numericals, just like 2025-26.</p></div>
      <SectionTitle eyebrow="Scope" title="Pick a unit" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }} className="fadeup">
        <button className={"chip tap" + (unit === "mixed" ? " lamp" : "")} style={{ padding: "8px 13px", fontSize: 12, cursor: "pointer", fontFamily: "var(--disp)" }} onClick={() => setUnit("mixed")}>🎲 Mixed (smart-weighted)</button>
        {UNITS.map(u => (<button key={u.id} className={"chip tap" + (unit === u.id ? " blue" : "")} style={{ padding: "8px 13px", fontSize: 12, cursor: "pointer", fontFamily: "var(--disp)" }} onClick={() => setUnit(u.id)}>{u.short} <span className="mono" style={{ opacity: .65, fontSize: 10 }}>{(state.units[u.id] || {}).mastery || 0}%</span></button>))}
      </div>
      <SectionTitle eyebrow="Shape" title="Length & difficulty" />
      <div className="card fadeup" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><div className="eyebrow" style={{ marginBottom: 7 }}>Questions</div>
          <div className="seg">{[5, 10].map(v => <button key={v} className={n === v ? "on" : ""} onClick={() => setN(v)}>{v} · {v === 5 ? "DPP" : "Mock"}</button>)}</div></div>
        <div><div className="eyebrow" style={{ marginBottom: 7 }}>Difficulty</div>
          <div className="seg">{["adaptive", "easy", "medium", "hard"].map(v => <button key={v} className={diff === v ? "on" : ""} onClick={() => setDiff(v)}>{v === "adaptive" ? "🧠 Adaptive" : v[0].toUpperCase() + v.slice(1)}</button>)}</div>
          {diff === "adaptive" && <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 7 }}>Elo engine targets your current rating per unit — hard enough to stretch, kind enough to keep you in the game.</p>}</div>
        <div><div className="eyebrow" style={{ marginBottom: 7 }}>Source</div>
          <div className="seg">
            <button className={src === "bank" ? "on" : ""} onClick={() => setSrc("bank")}>📚 PYQ Bank</button>
            <button className={src === "ai" ? "on" : ""} onClick={() => { setSrc("ai"); if (unit === "mixed") setUnit(recommendedUnit(state).id); }}>✨ AI-generated</button>
          </div>
          {src === "ai" && <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 7 }}>The question-setter agent writes fresh, syllabus-bound questions live. Pick a single unit for best results.</p>}</div>
      </div>
      <button className="btn lamp full" style={{ marginTop: 16 }} onClick={() => startQuiz({ units: unit === "mixed" ? "mixed" : [unit], n, diff, label, ai: src === "ai" })}>
        <Play size={16} /> Start {n}-question session
      </button>
    </div>
  );
}

/* ================= QUIZ PLAYER ================= */
function QuizScr({ quiz, onFinish, onQuit }) {
  const { questions, cfg } = quiz;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const total = cfg.n * 90;
  const [left, setLeft] = useState(total);
  const leftRef = useRef(total);
  useEffect(() => {
    const t = setInterval(() => { leftRef.current -= 1; setLeft(leftRef.current); if (leftRef.current <= 0) { clearInterval(t); onFinish(answersRef.current, total); } }, 1000);
    return () => clearInterval(t);
  }, []);
  const answersRef = useRef(answers); answersRef.current = answers;
  const q = questions[idx];
  const set = v => { const a = [...answers]; a[idx] = v; setAnswers(a); };
  const attempted = answers.filter(a => a !== null && a !== "").length;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button className="btn ghost" style={{ padding: "8px 12px", fontSize: 12.5 }} onClick={onQuit}><X size={14} /> End</button>
        <div className="eyebrow">{cfg.label}</div>
        <span className="chip" style={{ color: left < 60 ? "var(--bad)" : "var(--lamp)", borderColor: left < 60 ? "rgba(255,92,122,.4)" : "rgba(255,180,84,.35)" }}><Clock size={12} /> <span className="mono">{fmtClock(Math.max(0, left))}</span></span>
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
        {questions.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className="mono" style={{ width: 30, height: 30, borderRadius: 9, border: "1px solid " + (i === idx ? "var(--lamp)" : "var(--line)"), cursor: "pointer", fontSize: 11.5, fontWeight: 600, background: answers[i] !== null && answers[i] !== "" ? "var(--blueDim)" : "transparent", color: i === idx ? "var(--lamp)" : answers[i] !== null && answers[i] !== "" ? "var(--blue)" : "var(--dim)" }}>{i + 1}</button>))}
      </div>
      <div className="card hi fadeup" key={idx}>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          <span className="chip blue" style={{ fontSize: 10 }}>{UMAP[q.unit].short}</span>
          <span className="chip" style={{ fontSize: 10 }}>{q.topic}</span>
          <span className={"chip " + (q.diff === "hard" ? "bad" : q.diff === "medium" ? "lamp" : "ok")} style={{ fontSize: 10 }}>{q.diff}</span>
          {q.ai && <span className="chip vio" style={{ fontSize: 10 }}>✨ AI</span>}
        </div>
        <p className="qmath" style={{ marginBottom: 16 }}><span className="mono" style={{ color: "var(--dim)", fontSize: 13 }}>Q{idx + 1}. </span>{q.q}</p>
        {q.type === "mcq" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {q.options.map((o, i) => (
              <button key={i} className={"opt" + (answers[idx] === i ? " sel" : "")} onClick={() => set(answers[idx] === i ? null : i)}>
                <span className="optkey">{"ABCD"[i]}</span><span className="qmath" style={{ fontSize: 14.5 }}>{o}</span>
              </button>))}
          </div>
        ) : (
          <div>
            <div className="eyebrow" style={{ marginBottom: 7 }}>Numerical answer</div>
            <input className="input" inputMode="decimal" placeholder="e.g. 42 or −3.5" value={answers[idx] ?? ""} onChange={e => set(e.target.value)} />
            <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 7 }}>Section-B style — negative marking applies here too (2025 pattern).</p>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
        <button className="btn soft" style={{ flex: 1 }} disabled={idx === 0} onClick={() => setIdx(idx - 1)}><ArrowLeft size={15} /> Prev</button>
        {idx < questions.length - 1
          ? <button className="btn primary" style={{ flex: 2 }} onClick={() => setIdx(idx + 1)}>Next <ChevronRight size={15} /></button>
          : <button className="btn lamp" style={{ flex: 2 }} onClick={() => onFinish(answers, total - left)}><Flag size={15} /> Submit ({attempted}/{questions.length})</button>}
      </div>
    </div>
  );
}

/* ================= AI LOADING ================= */
function QuizLoading({ cfg }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center" }}>
      <div className="card hi shimmer pop" style={{ width: 88, height: 88, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 26, marginBottom: 20 }}>
        <Sparkles size={34} style={{ color: "var(--lamp)" }} className="pulse" />
      </div>
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Question-setter agent at work…</h2>
      <p style={{ color: "var(--mut)", fontSize: 13.5, maxWidth: 300, lineHeight: 1.6 }}>Writing fresh, syllabus-bound questions for <b>{cfg.label}</b>. Falls back to the PYQ bank if the agent stalls.</p>
    </div>
  );
}

/* ================= COUNT-UP ================= */
function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf; const t0 = performance.now();
    const tick = t => { const p = clamp((t - t0) / ms, 0, 1); setV(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

/* ================= RESULTS ================= */
function ResultScr({ result, onHome, onRetryWrong, openTutor }) {
  const marks = useCountUp(result.marks, 1100);
  const acc = result.total ? Math.round((result.correct / result.total) * 100) : 0;
  const [openSol, setOpenSol] = useState(null);
  return (
    <div>
      <div style={{ textAlign: "center", padding: "16px 0 4px" }} className="fadeup">
        <div className="eyebrow">{result.label} · graded NTA-style</div>
        <div className="mono" style={{ fontSize: 52, fontWeight: 700, color: result.marks >= 0 ? "var(--lamp)" : "var(--bad)", lineHeight: 1.1, margin: "8px 0 2px" }}>{marks >= 0 ? "+" : ""}{marks}</div>
        <div style={{ color: "var(--dim)", fontSize: 13 }} className="mono">out of {result.maxMarks} marks</div>
        {result.isBest && <span className="chip lamp pop" style={{ marginTop: 10 }}>🏅 New personal best</span>}
      </div>
      <div style={{ display: "flex", gap: 9, margin: "18px 0 12px" }} className="fadeup">
        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Ring pct={acc} size={58} color={acc >= 70 ? "var(--ok)" : acc >= 40 ? "var(--lamp)" : "var(--bad)"}><span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{acc}%</span></Ring>
          <span className="eyebrow">accuracy</span>
        </div>
        <div className="card" style={{ flex: 1.6 }}>
          {[["Correct", result.correct, "var(--ok)"], ["Wrong", result.wrong, "var(--bad)"], ["Skipped", result.skipped, "var(--dim)"]].map(([t, v, c]) => (
            <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13.5 }}><span style={{ color: "var(--mut)" }}>{t}</span><b className="mono" style={{ color: c }}>{v}</b></div>))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13.5, borderTop: "1px solid var(--line)", marginTop: 4, paddingTop: 8 }}>
            <span style={{ color: "var(--mut)" }}>Pace</span><b className="mono" style={{ color: "var(--txt)" }}>{Math.round(result.timeUsed / Math.max(1, result.total))}s / Q</b></div>
        </div>
      </div>
      <div className="card hi fadeup" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b className="disp" style={{ fontSize: 14 }}><Zap size={14} style={{ verticalAlign: -2, color: "var(--lamp)" }} /> +{result.xpGain} XP</b>
          <span style={{ fontSize: 11.5, color: "var(--dim)" }}>{result.xpNote}</span>
        </div>
        {result.ratingDeltas.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
            {result.ratingDeltas.map(d => (
              <span key={d.unit} className={"chip " + (d.to >= d.from ? "ok" : "bad")} style={{ fontSize: 10 }}>
                {UMAP[d.unit].short} <TrendingUp size={10} style={{ transform: d.to < d.from ? "scaleY(-1)" : "none" }} /> {d.to >= d.from ? "+" : ""}{d.to - d.from} skill
              </span>))}
          </div>)}
        {result.newBadges.length > 0 && <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>{result.newBadges.map(b => <span key={b.id} className="chip vio pop">{b.icon} {b.name} unlocked</span>)}</div>}
      </div>
      <SectionTitle eyebrow="Review with the +4 / −1 stamps" title="Question by question" />
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {result.perQ.map((p, i) => (
          <div key={i} className="card fadeup" style={{ animationDelay: i * 50 + "ms" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span className={"stamp " + (p.outcome === "right" ? "plus" : p.outcome === "wrong" ? "minus" : "zero")}>{p.outcome === "right" ? "+4" : p.outcome === "wrong" ? "−1" : "0"}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13.5, lineHeight: 1.55 }}>{p.q.q}</p>
                <p style={{ fontSize: 12, color: "var(--mut)", marginTop: 6 }}>
                  {p.outcome !== "skip" && <>You: <b style={{ color: p.outcome === "right" ? "var(--ok)" : "var(--bad)" }}>{p.q.type === "mcq" ? "ABCD"[p.given] + ") " + p.q.options[p.given] : p.given}</b> · </>}
                  Correct: <b style={{ color: "var(--ok)" }}>{p.q.type === "mcq" ? "ABCD"[p.q.answer] + ") " + p.q.options[p.q.answer] : p.q.answer}</b>
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 9 }}>
                  <button className="btn ghost" style={{ padding: "6px 11px", fontSize: 11.5 }} onClick={() => setOpenSol(openSol === i ? null : i)}><Lightbulb size={12} /> {openSol === i ? "Hide" : "Solution"}</button>
                  <button className="btn ghost" style={{ padding: "6px 11px", fontSize: 11.5, color: "var(--vio)", borderColor: "rgba(167,139,250,.4)" }} onClick={() => openTutor(p.q, p.given)}><Bot size={12} /> Ask AI tutor</button>
                </div>
                {openSol === i && <p className="fadeup" style={{ fontSize: 12.5, color: "var(--mut)", lineHeight: 1.65, marginTop: 9, padding: "10px 12px", background: "var(--ink2)", borderRadius: 10, border: "1px solid var(--line)" }}>{p.q.sol}</p>}
              </div>
            </div>
          </div>))}
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 16 }}>
        {result.wrong > 0 && <button className="btn soft" style={{ flex: 1 }} onClick={onRetryWrong}><RefreshCw size={14} /> Redo mistakes</button>}
        <button className="btn primary" style={{ flex: 1 }} onClick={onHome}><Home size={15} /> Done</button>
      </div>
    </div>
  );
}

/* ================= AI TUTOR / CHAT SHEET ================= */
function TutorSheet({ ctx, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ranRef = useRef(false);
  const ask = async (history, firstTime) => {
    setBusy(true);
    try {
      const reply = ctx.q
        ? await agentTutor(ctx.q, ctx.given, history)
        : await claudeCall("You are Ascent's friendly JEE Main maths tutor. Concise, step-by-step, Unicode math only (no LaTeX), under 180 words. Stay within the NTA syllabus.", history.length ? history.map(m => ({ role: m.role, content: m.text })) : [{ role: "user", content: "Hi" }], 700);
      setMsgs(m => [...m, { role: "assistant", text: reply }]);
    } catch (e) { setMsgs(m => [...m, { role: "assistant", text: "⚠️ The tutor agent couldn't connect right now. The written solution above still has you covered — try again in a moment." }]); }
    setBusy(false);
  };
  useEffect(() => { if (ctx.q && !ranRef.current) { ranRef.current = true; ask([], true); } }, []);
  const send = () => {
    const t = input.trim(); if (!t || busy) return;
    const h = [...msgs, { role: "user", text: t }]; setMsgs(h); setInput(""); ask(h);
  };
  return (
    <Sheet open onClose={onClose}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Bot size={18} style={{ color: "var(--vio)" }} /><b className="disp">AI Tutor</b></div>
        <button className="btn ghost" style={{ padding: "6px 10px" }} onClick={onClose}><X size={14} /></button>
      </div>
      {ctx.q && <div className="card" style={{ marginBottom: 12, fontSize: 12.5, color: "var(--mut)", lineHeight: 1.5 }}>{ctx.q.q}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 12, minHeight: 80 }}>
        {msgs.length === 0 && !busy && <p style={{ color: "var(--dim)", fontSize: 13, textAlign: "center", padding: 16 }}>Ask anything — a doubt, a concept, a shortcut.</p>}
        {msgs.map((m, i) => (
          <div key={i} className="fadeup" style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%", background: m.role === "user" ? "var(--blueDim)" : "var(--card)", border: "1px solid " + (m.role === "user" ? "rgba(108,140,255,.35)" : "var(--line)"), borderRadius: 14, padding: "10px 13px", fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.text}</div>))}
        {busy && <div className="card shimmer" style={{ alignSelf: "flex-start", padding: "10px 14px", fontSize: 13, color: "var(--dim)" }}>tutor is thinking…</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input className="input sm" style={{ flex: 1 }} placeholder={ctx.q ? "Follow-up question…" : "Ask a maths doubt…"} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button className="btn primary" style={{ padding: "12px 16px" }} onClick={send} disabled={busy}><Send size={15} /></button>
      </div>
    </Sheet>
  );
}

/* ================= AI COACH ================= */
function CoachScr({ state, openTutor, toastFn }) {
  const [busy, setBusy] = useState(false);
  const [coach, setCoach] = useState(null);
  const totalAtt = Object.values(state.units).reduce((a, u) => a + (u.attempts || 0), 0);
  const totalCor = Object.values(state.units).reduce((a, u) => a + (u.correct || 0), 0);
  const acc = totalAtt ? Math.round((totalCor / totalAtt) * 100) : 0;
  const sorted = [...UNITS].sort((a, b) => ((state.units[a.id] || {}).mastery || 0) - ((state.units[b.id] || {}).mastery || 0));
  const run = async () => {
    setBusy(true); setCoach(null);
    try { setCoach(await agentCoach(state)); }
    catch (e) { toastFn("⚠️", "Coach agent couldn't connect — try again in a moment."); }
    setBusy(false);
  };
  return (
    <div>
      <div className="fadeup"><div className="eyebrow" style={{ color: "var(--lamp)" }}>AGENT · PERFORMANCE ANALYST</div>
        <h1 style={{ fontSize: 24, margin: "4px 0 2px" }}>Coach</h1>
        <p style={{ fontSize: 13.5, color: "var(--mut)" }}>Reads your per-unit skill ratings, mastery and streak — then rebuilds your focus for the week.</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, margin: "16px 0 12px" }} className="fadeup">
        {[["Solved", totalCor + "/" + totalAtt], ["Accuracy", acc + "%"], ["Streak", state.streak.count + "d"]].map(([t, v]) => (
          <div key={t} className="card" style={{ textAlign: "center", padding: "13px 8px" }}>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: "var(--lamp)" }}>{v}</div>
            <div className="eyebrow" style={{ marginTop: 3 }}>{t}</div>
          </div>))}
      </div>
      <button className="btn lamp full" onClick={run} disabled={busy}><BrainCircuit size={16} /> {busy ? "Analyzing your prep…" : "Run my analysis"}</button>
      {totalAtt === 0 && <p style={{ fontSize: 12, color: "var(--dim)", textAlign: "center", marginTop: 8 }}>Tip: solve a quiz or two first so the coach has signal to work with.</p>}
      {busy && <div className="card shimmer" style={{ marginTop: 12, height: 110 }} />}
      {coach && (
        <div className="card hi fadeup" style={{ marginTop: 12 }}>
          <div className="eyebrow" style={{ color: "var(--lamp)", marginBottom: 6 }}>Coach's read</div>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>{coach.headline}</h2>
          <p style={{ fontSize: 13.5, color: "var(--mut)", lineHeight: 1.65 }}>{coach.analysis}</p>
          {Array.isArray(coach.focus) && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}>{coach.focus.map((f, i) => <span key={i} className="chip lamp">🎯 {f}</span>)}</div>}
          {Array.isArray(coach.plan) && coach.plan.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ color: "var(--dim)", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 13.5 }}><b className="disp">{p.title}</b><br /><span style={{ color: "var(--mut)", fontSize: 12.5 }}>{p.why}</span></span>
            </div>))}
          {coach.pep && <p style={{ fontSize: 13, color: "var(--lamp)", fontStyle: "italic", marginTop: 10 }}>“{coach.pep}”</p>}
        </div>)}
      <SectionTitle eyebrow="Mastery · weakest first" title="Where you stand" />
      <div className="card fadeup">
        {sorted.map(u => { const m = (state.units[u.id] || {}).mastery || 0; return (
          <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
            <span style={{ fontSize: 12.5, width: 122, color: "var(--mut)", flexShrink: 0 }}>{u.short}</span>
            <div className="bar" style={{ flex: 1 }}><i style={{ width: m + "%", background: masteryColor(m) }} /></div>
            <span className="mono" style={{ fontSize: 11, color: masteryColor(m), width: 36, textAlign: "right" }}>{m}%</span>
          </div>); })}
      </div>
      <button className="btn ghost full" style={{ marginTop: 12 }} onClick={() => openTutor(null, null)}><Bot size={15} /> Ask the tutor a doubt</button>
    </div>
  );
}

/* ================= PROFILE / LEAGUE ================= */
const STORAGE_KEY = "ascent-jee-v1";
const freshState = profile => ({
  profile, xp: 0, weekXP: 0, weekKey: weekKey(),
  streak: { count: 0, last: null, freezes: 1 },
  units: freshUnits(profile ? profile.selfRating : null),
  history: [], badges: [], done: {}, qSeen: [], best: -999,
});

function ProfileScr({ state, setState, toastFn }) {
  const rank = rankFor(state.xp);
  const totalAtt = Object.values(state.units).reduce((a, u) => a + (u.attempts || 0), 0);
  const totalCor = Object.values(state.units).reduce((a, u) => a + (u.correct || 0), 0);
  const acc = totalAtt ? Math.round((totalCor / totalAtt) * 100) : 0;
  const wk = weekKey();
  const league = useMemo(() => [
    ...BOTS.map(n => ({ name: n, xp: 140 + (hashStr(n + wk) % 580), you: false })),
    { name: state.profile.name + " (you)", xp: state.weekKey === wk ? state.weekXP : 0, you: true },
  ].sort((a, b) => b.xp - a.xp), [state.weekXP, wk]);
  const [confirmReset, setConfirmReset] = useState(false);
  const pct = rank.next ? ((state.xp - rank.xp) / (rank.next.xp - rank.xp)) * 100 : 100;
  const doReset = async () => {
    if (!confirmReset) { setConfirmReset(true); setTimeout(() => setConfirmReset(false), 3500); return; }
    try { await window.storage.delete(STORAGE_KEY); } catch (e) {}
    setState(freshState(null));
  };
  return (
    <div>
      <div className="card hi fadeup" style={{ textAlign: "center", padding: "22px 16px" }}>
        <div style={{ fontSize: 38 }}>{rank.icon}</div>
        <h1 style={{ fontSize: 22, margin: "6px 0 2px" }}>{state.profile.name}</h1>
        <div className="eyebrow" style={{ color: "var(--lamp)" }}>{rank.name} · {state.xp} XP</div>
        <div className="bar lamp" style={{ marginTop: 12 }}><i style={{ width: pct + "%" }} /></div>
        {rank.next && <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 6 }}>{rank.next.xp - state.xp} XP to {rank.next.name}</div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginTop: 12 }} className="fadeup">
        {[["Questions answered", totalAtt], ["Accuracy", acc + "%"], ["Quizzes taken", state.history.length], ["Streak", state.streak.count + "d · " + state.streak.freezes + " 🧊"]].map(([t, v]) => (
          <div key={t} className="card" style={{ padding: "13px 14px" }}>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{v}</div>
            <div className="eyebrow" style={{ marginTop: 3 }}>{t}</div>
          </div>))}
      </div>
      <SectionTitle eyebrow="Resets every Monday · top 3 promote" title="Weekly league" />
      <div className="card fadeup">
        {league.map((p, i) => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
            <span className="mono" style={{ width: 26, color: i < 3 ? "var(--lamp)" : "var(--dim)", fontSize: 12, fontWeight: 700 }}>#{i + 1}</span>
            <span style={{ flex: 1, fontSize: 13.5, color: p.you ? "var(--lamp)" : "var(--txt)", fontWeight: p.you ? 600 : 400 }}>{p.name}</span>
            {i < 3 && <span className="chip ok" style={{ fontSize: 9 }}>▲</span>}
            <span className="mono" style={{ fontSize: 12, color: "var(--mut)" }}>{p.xp} XP</span>
          </div>))}
      </div>
      <SectionTitle eyebrow={state.badges.length + " of " + BADGE_DEFS.length + " unlocked"} title="Badges" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 9 }} className="fadeup">
        {BADGE_DEFS.map(b => { const on = state.badges.includes(b.id); return (
          <div key={b.id} className="card" title={b.desc} style={{ textAlign: "center", padding: "12px 6px", opacity: on ? 1 : .38, filter: on ? "none" : "grayscale(1)" }}>
            <div style={{ fontSize: 22 }}>{b.icon}</div>
            <div style={{ fontSize: 9.5, marginTop: 4, color: "var(--mut)", lineHeight: 1.3 }}>{b.name}</div>
          </div>); })}
      </div>
      <SectionTitle eyebrow="Tune the engine" title="Settings" />
      <div className="card fadeup" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><div className="eyebrow" style={{ marginBottom: 7 }}>Study cycle (re-plans daily tasks)</div>
          <div className="seg">{[["early", "Early bird"], ["day", "Day grinder"], ["night", "Night owl"]].map(([v, l]) => (
            <button key={v} className={state.profile.chrono === v ? "on" : ""} onClick={() => { setState({ ...state, profile: { ...state.profile, chrono: v } }); toastFn("🕑", "Daily cycle re-planned — " + l + " mode."); }}>{l}</button>))}
          </div></div>
        <button className="btn ghost full" style={{ color: "var(--bad)", borderColor: "rgba(255,92,122,.4)" }} onClick={doReset}>
          <AlertTriangle size={14} /> {confirmReset ? "Tap again — wipes all progress" : "Reset all progress"}
        </button>
      </div>
      <p style={{ fontSize: 11, color: "var(--dim)", margin: "16px 4px 0", lineHeight: 1.6, textAlign: "center" }}>Prototype · syllabus per NTA JEE Main 2026 bulletin · league rivals are simulated · progress saves to this device.</p>
    </div>
  );
}

/* ================= APP ROOT ================= */
export default function App() {
  const [state, setState] = useState(null);
  const [tab, setTab] = useState("home");
  const [quiz, setQuiz] = useState({ phase: "idle" });
  const [tutor, setTutor] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (icon, msg) => { setToast({ icon, msg }); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 3400); };

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) { setState(JSON.parse(r.value)); return; }
      } catch (e) {}
      setState(freshState(null));
    })();
  }, []);
  const saveTimer = useRef(null);
  useEffect(() => {
    if (!state || !state.profile) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => { try { await window.storage.set(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }, 700);
  }, [state]);

  const startQuiz = async cfg => {
    const unitIds = cfg.units === "mixed" ? weightedMixedUnits(state, Math.min(6, cfg.n)) : cfg.units;
    if (cfg.ai) {
      setQuiz({ phase: "loading", cfg });
      try {
        const qs = await agentGenerateQuestions(unitIds[0], cfg.diff, cfg.n);
        setQuiz({ phase: "active", cfg: { ...cfg, n: qs.length }, questions: qs, startedAt: Date.now() });
      } catch (e) {
        const qs = pickQuestions(unitIds, cfg.n, state, cfg.diff);
        showToast("📚", "AI agent stalled — pulled from the PYQ bank instead.");
        setQuiz({ phase: "active", cfg: { ...cfg, n: qs.length }, questions: qs, startedAt: Date.now() });
      }
      return;
    }
    const qs = pickQuestions(unitIds, cfg.n, state, cfg.diff);
    if (!qs.length) { showToast("⚠️", "No questions match that filter yet — try Adaptive."); return; }
    setQuiz({ phase: "active", cfg: { ...cfg, n: qs.length }, questions: qs, startedAt: Date.now() });
  };

  const finishQuiz = (answers, timeUsed) => {
    const { questions, cfg } = quiz;
    const s = JSON.parse(JSON.stringify(state));
    const DIFF_IDX = { easy: 0, medium: 1, hard: 2 };
    let correct = 0, wrong = 0, skipped = 0, marks = 0, xp = 0;
    const perQ = []; const ratingBefore = {}; const agg = {};
    questions.forEach((q, i) => {
      const a = answers[i];
      const blank = a === null || a === undefined || a === "";
      let got = false;
      if (!blank) {
        if (q.type === "mcq") got = a === q.answer;
        else { const num = parseFloat(String(a).replace("−", "-").trim()); got = isFinite(num) && Math.abs(num - q.answer) <= Math.max(0.01, Math.abs(q.answer) * 0.002); }
      }
      const u = s.units[q.unit] || (s.units[q.unit] = { rating: 1450, mastery: 0, attempts: 0, correct: 0, srBox: 0, nextReview: null, lastSeen: null });
      if (!(q.unit in ratingBefore)) ratingBefore[q.unit] = u.rating;
      const g = agg[q.unit] || (agg[q.unit] = { pres: 0, cor: 0, diffSum: 0 });
      g.pres += 1; g.diffSum += DIFF_IDX[q.diff] ?? 1;
      if (blank) { skipped += 1; perQ.push({ q, given: null, outcome: "skip" }); }
      else {
        u.attempts += 1;
        u.rating = applyElo(u.rating, DIFF_RATING[q.diff] || 1550, got ? 1 : 0);
        if (got) { correct += 1; marks += 4; xp += DIFF_XP[q.diff] || 15; u.correct += 1; g.cor += 1; perQ.push({ q, given: a, outcome: "right" }); }
        else { wrong += 1; marks -= 1; perQ.push({ q, given: a, outcome: "wrong" }); }
      }
    });
    Object.entries(agg).forEach(([uid, g]) => {
      const u = s.units[uid];
      const accU = g.cor / g.pres;
      const delta = Math.round((accU - 0.45) * (10 + 4 * (g.diffSum / g.pres)));
      u.mastery = clamp(u.mastery + delta, 0, 100);
      if (accU >= 0.7) u.srBox = Math.min(u.srBox + 1, SR_INTERVALS.length - 1); else u.srBox = Math.max(0, u.srBox - 1);
      const next = new Date(); next.setDate(next.getDate() + SR_INTERVALS[u.srBox]);
      u.nextReview = next.toISOString().slice(0, 10);
      u.lastSeen = todayISO();
    });
    const noteBits = [];
    xp += 15; noteBits.push("15 finish");
    if (correct) noteBits.unshift((xp - 15) + " correct");
    const t = todayISO();
    let frozeNote = false;
    if (s.streak.last !== t) {
      if (s.streak.last) {
        const gap = daysBetween(s.streak.last, t);
        if (gap === 1) s.streak.count += 1;
        else if (gap === 2 && s.streak.freezes > 0) { s.streak.freezes -= 1; s.streak.count += 1; frozeNote = true; }
        else if (gap > 1) s.streak.count = 1;
      } else s.streak.count = 1;
      s.streak.last = t; xp += 20; noteBits.push("20 streak day");
    }
    if (cfg.taskId) {
      const d = s.done[t] || (s.done[t] = []);
      if (!d.includes(cfg.taskId)) { d.push(cfg.taskId); xp += 25; noteBits.push("25 task"); }
    }
    const wk = weekKey();
    if (s.weekKey !== wk) { s.weekKey = wk; s.weekXP = 0; }
    s.weekXP += xp; s.xp += xp;
    s.qSeen = [...(s.qSeen || []), ...questions.filter(q => !q.ai).map(q => q.id)].slice(-24);
    s.history.push({ date: t, label: cfg.label, total: questions.length, correct, wrong, marks, timeUsed });
    const pctScore = questions.length ? marks / (4 * questions.length) : 0;
    let isBest = false;
    if (questions.length >= 5 && pctScore > (s.best ?? -999)) { isBest = s.best !== -999 || pctScore >= 0.5; s.best = pctScore; }
    const newBadges = BADGE_DEFS.filter(b => !s.badges.includes(b.id) && b.check(s));
    newBadges.forEach(b => s.badges.push(b.id));
    const ratingDeltas = Object.keys(ratingBefore).map(uid => ({ unit: uid, from: ratingBefore[uid], to: s.units[uid].rating })).filter(d => d.from !== d.to);
    const result = { label: cfg.label, total: questions.length, correct, wrong, skipped, marks, maxMarks: 4 * questions.length, timeUsed, perQ, xpGain: xp, xpNote: noteBits.join(" · "), ratingDeltas, newBadges, isBest };
    setState(s);
    setQuiz({ phase: "result", cfg, questions, result });
    if (newBadges.length) showToast(newBadges[0].icon, newBadges[0].name + " badge unlocked!");
    else if (frozeNote) showToast("🧊", "Streak freeze used — your " + s.streak.count + "-day streak survives.");
  };

  const retryWrong = () => {
    const wrongQs = quiz.result.perQ.filter(p => p.outcome === "wrong").map(p => p.q);
    if (!wrongQs.length) return;
    setQuiz({ phase: "active", cfg: { ...quiz.cfg, n: wrongQs.length, label: "Redo · mistakes", taskId: undefined }, questions: wrongQs, startedAt: Date.now() });
  };
  const openTutor = (q, given) => setTutor({ q, given });

  if (!state) return (<div className="asc-root"><style>{CSS}</style><div className="frame" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pulse eyebrow">opening your desk…</div></div></div>);
  if (!state.profile) return (<div className="asc-root"><style>{CSS}</style><Toast toast={toast} /><Onboarding onDone={p => { setState(freshState(p)); showToast("🎯", "Pathway built — " + (p.chrono === "night" ? "night-owl" : p.chrono === "early" ? "early-bird" : "daytime") + " cycle armed."); }} /></div>);

  const inQuiz = quiz.phase !== "idle";
  return (
    <div className="asc-root">
      <style>{CSS}</style>
      <Toast toast={toast} />
      <div className="frame">
        {quiz.phase === "loading" && <QuizLoading cfg={quiz.cfg} />}
        {quiz.phase === "active" && <QuizScr key={quiz.startedAt} quiz={quiz} onFinish={finishQuiz} onQuit={() => setQuiz({ phase: "idle" })} />}
        {quiz.phase === "result" && <ResultScr result={quiz.result} onHome={() => setQuiz({ phase: "idle" })} onRetryWrong={retryWrong} openTutor={openTutor} />}
        {quiz.phase === "idle" && (
          tab === "home" ? <HomeScr state={state} startQuiz={startQuiz} setTab={setTab} /> :
          tab === "path" ? <PathScr state={state} startQuiz={startQuiz} /> :
          tab === "practice" ? <PracticeScr state={state} startQuiz={startQuiz} /> :
          tab === "coach" ? <CoachScr state={state} openTutor={openTutor} toastFn={showToast} /> :
          <ProfileScr state={state} setState={setState} toastFn={showToast} />)}
      </div>
      {!inQuiz && (
        <div className="nav"><div className="navin">
          {[["home", Home, "Home"], ["path", Map, "Path"], ["practice", Dumbbell, "Practice"], ["coach", BrainCircuit, "Coach"], ["profile", User, "Me"]].map(([id, I, t]) => (
            <button key={id} className={"navbtn" + (tab === id ? " on" : "")} onClick={() => setTab(id)}><I size={19} />{t}</button>))}
        </div></div>)}
      {tutor && <TutorSheet ctx={tutor} onClose={() => setTutor(null)} />}
    </div>
  );
}
