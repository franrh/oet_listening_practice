# OET Nursing Listening Practice

**Universidad Anáhuac Online**

Interactive web application for practising OET Nursing Listening skills with 15 clinical scenarios and 138 questions.

![OET Listening Practice](https://img.shields.io/badge/OET-Nursing-FF5900)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)

## Features

- **Part A** — 8 nurse-patient consultation scripts with note completion questions
- **Part B** — 7 health presentation scripts with multiple choice questions
- **138 total questions** with instant feedback and scoring
- **Built-in audio player** — add your MP3 files to enable playback
- **Responsive design** — works on desktop, tablet, and mobile
- **Anáhuac Online branding** — institutional color palette

## Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/oet-listening-app.git
cd oet-listening-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## Adding Audio Files

Place your MP3 audio files in the `/public/audio/` directory:

```
public/audio/
├── partA_01_postop_pain.mp3
├── partA_02_diabetes_new.mp3
├── partA_03_paediatric_asthma.mp3
├── partA_04_fall_risk.mp3
├── partA_05_gestational_diabetes.mp3
├── partA_06_cardiac_rehab.mp3
├── partA_07_postnatal_depression.mp3
├── partA_08_diabetic_foot.mp3
├── partB_09_infection_control.mp3
├── partB_10_chronic_pain_elderly.mp3
├── partB_11_childhood_obesity.mp3
├── partB_12_smoking_cessation.mp3
├── partB_13_palliative_care.mp3
├── partB_14_medication_safety.mp3
└── partB_15_staff_mental_health.mp3
```

See the companion document `OET_Nursing_Listening_Scripts_TTS.docx` for scripts and TTS generation instructions.

## Deploy to Railway

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: OET Listening Practice App"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/oet-listening-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **New Project** → **Deploy from GitHub Repo**
3. Select your `oet-listening-app` repository
4. Railway will automatically detect the config from `railway.toml`
5. Wait for the build to complete (usually 1-2 minutes)
6. Click **Generate Domain** to get your public URL

Every push to `main` will trigger an automatic redeployment.

### Railway Environment

No environment variables are required for the basic app. The `railway.toml` handles:
- Build: `npm install && npm run build`
- Start: `npm start` (Express server serving the built files)

## Project Structure

```
oet-listening-app/
├── public/
│   └── audio/              # MP3 audio files (add your own)
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx
│   │   ├── Header.jsx
│   │   ├── MultipleChoiceQuestion.jsx
│   │   ├── NoteCompletionQuestion.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ResultsView.jsx
│   │   └── ScriptCard.jsx
│   ├── data/
│   │   └── questionBank.json   # 138 questions for 15 scripts
│   ├── styles/
│   │   ├── global.css
│   │   └── theme.js            # Anáhuac Online color palette
│   ├── views/
│   │   ├── HomeView.jsx
│   │   └── PracticeView.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── railway.toml
├── server.js                   # Express server for production
└── vite.config.js
```

## Tech Stack

- **React 18** + **Vite 6** — frontend
- **Express** — production server
- **DM Sans** — typography (Google Fonts)
- **Railway** — hosting & deployment

## License

Internal use — Universidad Anáhuac Online

---

Built with ❤️ for Anáhuac Online
