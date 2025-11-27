# CLAUDE.md - OEUK Medical Screening Application

## Project Overview

OEUK is a medical screening questionnaire application for offshore workers. It allows patients to complete medical history forms and physicians to review and comment on submissions. The application follows OGUK/OEUK (Offshore Energies UK) medical certification standards for offshore workers.

**Purpose**: Enable occupational physicians to collect and review medical history questionnaires from workers requiring OEUK offshore medical certifications.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite 5 |
| Backend | Node.js + Express 4 |
| Database | PostgreSQL (Digital Ocean managed) |
| Routing | react-router-dom v6 |
| Deployment | Docker (single container) |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Docker Container                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Node.js Express Server                  │   │
│  │  ┌─────────────────┐  ┌───────────────────────────┐ │   │
│  │  │  Static Files   │  │        REST API           │ │   │
│  │  │  (React build)  │  │  /api/medical-records     │ │   │
│  │  │  /public        │  │  /api/auth/doctor         │ │   │
│  │  └─────────────────┘  └───────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│                    ┌──────────────────┐                    │
│                    │   PostgreSQL     │                    │
│                    │ (Digital Ocean)  │                    │
│                    └──────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
OEUK/
├── backend/
│   ├── server.js          # Express server, API routes
│   ├── database.js        # PostgreSQL connection pool
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app with React Router
│   │   ├── main.jsx          # React entry point
│   │   ├── index.css         # Global styles (wizard theme)
│   │   ├── questionsConfig.js # Form questions configuration
│   │   ├── pages/
│   │   │   ├── PatientForm.jsx   # Multi-step wizard form
│   │   │   ├── DoctorPanel.jsx   # Doctor login & records list
│   │   │   └── RecordDetail.jsx  # Individual record view
│   │   └── components/
│   │       ├── SignaturePad.jsx  # Canvas signature capture
│   │       ├── PhotoCapture.jsx  # Camera/upload photo
│   │       └── Tooltip.jsx       # Help tooltips
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── Dockerfile             # Multi-stage build
├── README.md              # Basic setup instructions
├── INSTRUCCIONES.md       # Spanish usage instructions
└── cuestionario.pdf       # Reference questionnaire PDF
```

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Digital Ocean managed database)

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with database credentials
npm install
npm run dev    # Starts on http://localhost:3000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev    # Starts on http://localhost:5173
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Full PostgreSQL connection string |
| `DB_USER` | Database username (alternative to URL) |
| `DB_PASSWORD` | Database password |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port (default: 25060) |
| `DB_NAME` | Database name (default: defaultdb) |
| `PORT` | Server port (default: 3000) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/medical-records` | Create new medical record |
| `GET` | `/api/medical-records` | List all records |
| `GET` | `/api/medical-records/:id` | Get single record |
| `PUT` | `/api/medical-records/:id/physician-comments` | Update physician comments, mark reviewed |
| `POST` | `/api/auth/doctor` | Authenticate doctor (password: `oeuk2024`) |

### Response Format
All API responses follow this structure:
```json
{
  "success": true|false,
  "records": [...],      // For list endpoints
  "record": {...},       // For single record
  "error": "message"     // On failure
}
```

## Database Schema

Table: `oguk_medical_records`

### Personal Information Fields
- `id` (SERIAL PRIMARY KEY)
- `surname`, `first_name`, `id_type`, `id_number`
- `date_of_birth`, `address`, `city`, `telephone`, `exam_date`

### Employment Fields
- `current_employer`, `position_held`, `time_in_office_months`
- `contract_type`, `country_work`, `date_of_travel`, `shift_scheme`
- `work_involves_food`, `work_involves_cranes`, `work_involves_ert`, `work_involves_inu` (BOOLEAN)
- `employment_history`

### Certification History
- `has_recent_oeuk_exam`, `recent_oeuk_exam_date`, `recent_oeuk_exam_provider`
- `has_recent_training`, `recent_training_date`, `recent_training_provider`
- `has_next_foet`, `next_foet_bosiet_date`

### Health Habits
- `smoking_status`, `smoking_quantity_day`, `smoking_time_years`
- `alcohol_consumption`
- `physical_activity`, `physical_activity_frequency`, `physical_activity_duration`

### Occupational History
- `occupational_diseases`, `workplace_accidents`, `medical_evacuations`, `missed_trips`
- `previous_oeuk_deferred`, `previous_oeuk_restricted` (BOOLEAN)

### Medical Conditions (Yes/No text fields)
- `high_blood_pressure`, `cardiovascular_disease`, `neurological_disease`
- `anxiety_depression`, `alcohol_use_disorder`, `substance_abuse`
- `asthma`, `copd`, `pneumothorax`, `diabetes`, `thyroid_disorder`
- `addisons_disease`, `peptic_ulcer`, `inflammatory_bowel_disease`
- `pancreatitis`, `liver_disease`, `limb_amputation`, `arthritis`
- `joint_replacement`, `muscle_pain`, `back_pain`, `dermatitis`
- `kidney_disease`, `blood_disorders`, `organ_transplantation`, `cancer`
- `infectious_disease`, `hearing_loss`, `dizziness_vertigo`, `eardrum_perforation`
- `visual_impairment`, `caries_dental`, `allergic_disorders`, `immunodeficiency`
- `current_pregnancy`, `self_perception_disability`, `classified_disabled`

### Verification
- `signature_base64`, `photo_base64` (TEXT, base64-encoded images)

### System Fields
- `physician_comments` (TEXT)
- `reviewed` (BOOLEAN)
- `reviewed_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)

## Key Patterns & Conventions

### Frontend Form Configuration
The questionnaire is driven by `questionsConfig.js`:
- Each question is an object with `id`, `section`, `question`, `type`, `field`
- Supported types: `text`, `number`, `date`, `textarea`, `select`, `radio`, `yesno`, `checkbox-group`, `signature`, `photo`
- Conditional display via `showIf` function: `showIf: (formData) => formData.field === "value"`
- Tooltips via `tooltip` property

### Adding New Questions
1. Add field to `initialFormData` object
2. Add question config to `questionSteps` array
3. Add corresponding column to database schema (manual migration required)
4. Update backend INSERT statement in `server.js`

### API URL Handling
Frontend uses environment-aware API URL:
```javascript
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api'
```

### Database Connection
- Uses `pg` library with connection pooling
- SSL enabled with `rejectUnauthorized: false` for Digital Ocean
- Connection string via `DATABASE_URL` or individual environment variables

## Docker Deployment

### Build
```bash
docker build -t oeuk-app .
```

### Run
```bash
docker run -p 8080:8080 \
  -e DATABASE_URL="postgresql://..." \
  oeuk-app
```

The Dockerfile:
1. Builds frontend with Vite (production build)
2. Copies built assets to `backend/public`
3. Express serves static files + API on port 8080

## Common Tasks

### Changing Doctor Password
Edit `backend/server.js` line 189:
```javascript
if (password === 'oeuk2024') {  // Change this value
```

### Modifying Questionnaire Sections
Edit `frontend/src/questionsConfig.js`:
- Add new sections by using unique `section` values
- Questions are displayed in array order
- Progress bar groups by visible questions only

### Adding Conditional Questions
```javascript
{
  id: "new_question",
  section: "Section Name",
  question: "Question text?",
  type: "text",
  field: "field_name",
  showIf: (formData) => formData.other_field === "Yes",
}
```

### Database Migrations
Currently manual. When adding fields:
1. Add column to PostgreSQL table
2. Add field to `initialFormData` in `questionsConfig.js`
3. Add to INSERT statement in `server.js`
4. Add question config if needed

## Important Notes

- **No authentication framework**: Doctor panel uses simple password check
- **Base64 images**: Photos and signatures are stored as base64 text (can be large)
- **SSL validation disabled**: Required for Digital Ocean managed databases
- **SPA routing**: Backend serves `index.html` for all non-API routes
- **After submission**: User is redirected to `https://www.medstar.com.co/en`

## Recent Changes (from git history)

1. Redirect to Medstar website after form submission
2. SSL certificate handling for Digital Ocean PostgreSQL
3. NUI label fix (Normally Unmanned Installations)
4. Tooltips for confusing questions
5. Numeric field validation improvements
6. Signature pad and photo capture functionality
7. Migration from SQLite to PostgreSQL
8. Docker support and doctor header info

## Troubleshooting

### Database Connection Issues
- Check `DATABASE_URL` format includes `?sslmode=require`
- SSL is disabled in code (`rejectUnauthorized: false`)
- Default port for Digital Ocean is `25060`

### Frontend Not Loading
- Ensure both servers running (dev) or Docker container (prod)
- Check browser console for CORS errors
- Verify `vite.config.js` port settings

### Form Not Submitting
- Check network tab for API response
- Verify all required fields are filled
- Check server logs for database errors
