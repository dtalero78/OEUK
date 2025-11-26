import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Servir archivos estáticos del frontend en producción
app.use(express.static(path.join(__dirname, 'public')));

// Helper functions
const str = (val) => (val !== undefined && val !== null && val !== '') ? String(val) : null;
const num = (val) => (val !== undefined && val !== null && val !== '') ? Number(val) : null;
const bool = (val) => val ? true : false;

// Crear nuevo registro médico
app.post('/api/medical-records', async (req, res) => {
  try {
    const data = req.body;

    const result = await pool.query(`
      INSERT INTO oguk_medical_records (
        surname, first_name, id_type, id_number, date_of_birth, address, city, telephone, exam_date,
        current_employer, position_held, time_in_office_months, contract_type, country_work,
        date_of_travel, shift_scheme, work_involves_food, work_involves_cranes,
        work_involves_ert, work_involves_inu, employment_history,
        has_recent_oeuk_exam, recent_oeuk_exam_date, recent_oeuk_exam_provider,
        has_recent_training, recent_training_date, recent_training_provider,
        has_next_foet, next_foet_bosiet_date,
        smoking_status, smoking_quantity_day, smoking_time_years, alcohol_consumption,
        physical_activity, physical_activity_frequency, physical_activity_duration,
        occupational_diseases, workplace_accidents, medical_evacuations, missed_trips,
        previous_oeuk_deferred, previous_oeuk_restricted,
        current_diagnoses, undiagnosed_symptoms, recurring_appointments, current_medication,
        hospital_admissions, surgeries, chronic_diseases, high_blood_pressure,
        cardiovascular_disease, neurological_disease, anxiety_depression, alcohol_use_disorder,
        substance_abuse, asthma, copd, pneumothorax, diabetes, thyroid_disorder,
        addisons_disease, peptic_ulcer, inflammatory_bowel_disease, pancreatitis,
        liver_disease, limb_amputation, arthritis, joint_replacement, muscle_pain,
        back_pain, dermatitis, kidney_disease, blood_disorders, organ_transplantation,
        cancer, infectious_disease, hearing_loss, dizziness_vertigo, eardrum_perforation,
        visual_impairment, caries_dental, allergic_disorders, immunodeficiency,
        current_pregnancy, self_perception_disability, classified_disabled,
        signature_base64, photo_base64
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14,
        $15, $16, $17, $18,
        $19, $20, $21,
        $22, $23, $24,
        $25, $26, $27,
        $28, $29,
        $30, $31, $32, $33,
        $34, $35, $36,
        $37, $38, $39, $40,
        $41, $42,
        $43, $44, $45, $46,
        $47, $48, $49, $50,
        $51, $52, $53, $54,
        $55, $56, $57, $58, $59, $60,
        $61, $62, $63, $64,
        $65, $66, $67, $68, $69,
        $70, $71, $72, $73, $74,
        $75, $76, $77, $78, $79,
        $80, $81, $82, $83,
        $84, $85, $86,
        $87, $88
      ) RETURNING id
    `, [
      str(data.surname), str(data.first_name), str(data.id_type), str(data.id_number), str(data.date_of_birth),
      str(data.address), str(data.city), str(data.telephone), str(data.exam_date),
      str(data.current_employer), str(data.position_held), num(data.time_in_office_months), str(data.contract_type),
      str(data.country_work), str(data.date_of_travel), str(data.shift_scheme),
      bool(data.work_involves_food), bool(data.work_involves_cranes), bool(data.work_involves_ert), bool(data.work_involves_inu),
      str(data.employment_history),
      str(data.has_recent_oeuk_exam), str(data.recent_oeuk_exam_date), str(data.recent_oeuk_exam_provider),
      str(data.has_recent_training), str(data.recent_training_date), str(data.recent_training_provider),
      str(data.has_next_foet), str(data.next_foet_bosiet_date),
      str(data.smoking_status), num(data.smoking_quantity_day), num(data.smoking_time_years), str(data.alcohol_consumption),
      str(data.physical_activity), str(data.physical_activity_frequency), str(data.physical_activity_duration),
      str(data.occupational_diseases), str(data.workplace_accidents), str(data.medical_evacuations), str(data.missed_trips),
      bool(data.previous_oeuk_deferred), bool(data.previous_oeuk_restricted),
      str(data.current_diagnoses), str(data.undiagnosed_symptoms), str(data.recurring_appointments), str(data.current_medication),
      str(data.hospital_admissions), str(data.surgeries), str(data.chronic_diseases), str(data.high_blood_pressure),
      str(data.cardiovascular_disease), str(data.neurological_disease), str(data.anxiety_depression), str(data.alcohol_use_disorder),
      str(data.substance_abuse), str(data.asthma), str(data.copd), str(data.pneumothorax), str(data.diabetes), str(data.thyroid_disorder),
      str(data.addisons_disease), str(data.peptic_ulcer), str(data.inflammatory_bowel_disease), str(data.pancreatitis),
      str(data.liver_disease), str(data.limb_amputation), str(data.arthritis), str(data.joint_replacement), str(data.muscle_pain),
      str(data.back_pain), str(data.dermatitis), str(data.kidney_disease), str(data.blood_disorders), str(data.organ_transplantation),
      str(data.cancer), str(data.infectious_disease), str(data.hearing_loss), str(data.dizziness_vertigo), str(data.eardrum_perforation),
      str(data.visual_impairment), str(data.caries_dental), str(data.allergic_disorders), str(data.immunodeficiency),
      str(data.current_pregnancy), str(data.self_perception_disability), str(data.classified_disabled),
      str(data.signature_base64), str(data.photo_base64)
    ]);

    res.status(201).json({
      success: true,
      id: result.rows[0].id,
      message: 'Medical record created successfully'
    });
  } catch (error) {
    console.error('Error creating medical record:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating medical record'
    });
  }
});

// Obtener todos los registros médicos
app.get('/api/medical-records', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM oguk_medical_records ORDER BY created_at DESC');
    res.json({ success: true, records: result.rows });
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching medical records'
    });
  }
});

// Obtener un registro específico
app.get('/api/medical-records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM oguk_medical_records WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }

    res.json({ success: true, record: result.rows[0] });
  } catch (error) {
    console.error('Error fetching medical record:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching medical record'
    });
  }
});

// Actualizar comentarios del médico
app.put('/api/medical-records/:id/physician-comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { physician_comments } = req.body;

    await pool.query(`
      UPDATE oguk_medical_records
      SET physician_comments = $1, reviewed = TRUE, reviewed_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [physician_comments, id]);

    res.json({
      success: true,
      message: 'Physician comments updated successfully'
    });
  } catch (error) {
    console.error('Error updating physician comments:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating physician comments'
    });
  }
});

// Autenticación simple para médicos
app.post('/api/auth/doctor', (req, res) => {
  const { password } = req.body;

  if (password === 'oeuk2024') {
    res.json({ success: true, authenticated: true });
  } else {
    res.status(401).json({ success: false, authenticated: false });
  }
});

// Catch-all para SPA - servir index.html para rutas del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
