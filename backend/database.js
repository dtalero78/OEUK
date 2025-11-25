import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'oeuk.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS medical_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Background Information
    surname TEXT,
    first_name TEXT,
    id_type TEXT,
    id_number TEXT,
    date_of_birth TEXT,
    address TEXT,
    city TEXT,
    telephone TEXT,
    exam_date TEXT,

    -- Current Job Data
    current_employer TEXT,
    position_held TEXT,
    time_in_office_months INTEGER,
    contract_type TEXT,
    country_work TEXT,
    date_of_travel TEXT,
    shift_scheme TEXT,
    work_involves_food BOOLEAN,
    work_involves_cranes BOOLEAN,
    work_involves_ert BOOLEAN,
    work_involves_inu BOOLEAN,

    -- Employment History (JSON array)
    employment_history TEXT,

    -- Previous Certifications
    has_recent_oeuk_exam TEXT,
    recent_oeuk_exam_date TEXT,
    recent_oeuk_exam_provider TEXT,
    has_recent_training TEXT,
    recent_training_date TEXT,
    recent_training_provider TEXT,
    has_next_foet TEXT,
    next_foet_bosiet_date TEXT,

    -- Health Habits
    smoking_status TEXT,
    smoking_quantity_day INTEGER,
    smoking_time_years INTEGER,
    alcohol_consumption TEXT,
    physical_activity TEXT,
    physical_activity_frequency TEXT,
    physical_activity_duration TEXT,

    -- Occupational Medical History
    occupational_diseases TEXT,
    workplace_accidents TEXT,
    medical_evacuations TEXT,
    missed_trips TEXT,
    previous_oeuk_deferred BOOLEAN,
    previous_oeuk_restricted BOOLEAN,

    -- Current Medical History
    current_diagnoses TEXT,
    undiagnosed_symptoms TEXT,
    recurring_appointments TEXT,
    current_medication TEXT,

    -- Medical History (Yes/No fields with details)
    hospital_admissions TEXT,
    surgeries TEXT,
    chronic_diseases TEXT,
    high_blood_pressure TEXT,
    cardiovascular_disease TEXT,
    neurological_disease TEXT,
    anxiety_depression TEXT,
    alcohol_use_disorder TEXT,
    substance_abuse TEXT,
    asthma TEXT,
    copd TEXT,
    pneumothorax TEXT,
    diabetes TEXT,
    thyroid_disorder TEXT,
    addisons_disease TEXT,
    peptic_ulcer TEXT,
    inflammatory_bowel_disease TEXT,
    pancreatitis TEXT,
    liver_disease TEXT,
    limb_amputation TEXT,
    arthritis TEXT,
    joint_replacement TEXT,
    muscle_pain TEXT,
    back_pain TEXT,
    dermatitis TEXT,
    kidney_disease TEXT,
    blood_disorders TEXT,
    organ_transplantation TEXT,
    cancer TEXT,
    infectious_disease TEXT,
    hearing_loss TEXT,
    dizziness_vertigo TEXT,
    eardrum_perforation TEXT,
    visual_impairment TEXT,
    caries_dental TEXT,
    allergic_disorders TEXT,
    immunodeficiency TEXT,
    current_pregnancy TEXT,
    self_perception_disability TEXT,
    classified_disabled TEXT,

    physician_comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reviewed BOOLEAN DEFAULT 0,
    reviewed_at DATETIME
  )
`);

export default db;
