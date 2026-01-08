// Translation dictionaries for the OEUK Medical Screening Application

export const translations = {
  en: {
    // Language selector
    selectLanguage: "Select Language / Seleccione Idioma",
    english: "English",
    spanish: "Español",
    continue: "Continue",

    // Common UI elements
    back: "Back",
    submit: "Submit",
    required: "*",
    selectOption: "Select an option",
    yes: "Yes",
    no: "No",

    // Header
    doctorName: "Juan José Reátiga, MD",
    doctorTitle: "OGUK/OEUK Certified Occupational Physician",

    // Success message
    thankYou: "Thank you!",
    submissionSuccess: "Your medical questionnaire has been submitted successfully.",
    submitAnother: "Submit Another Form",

    // Error messages
    errorSubmitting: "Error submitting form. Please try again.",
    errorConnecting: "Error connecting to server. Please try again.",

    // Section names
    background: "Background",
    currentJob: "Current Job",
    certifications: "Certifications",
    healthHabits: "Health Habits",
    occupationalHistory: "Occupational History",
    currentMedical: "Current Medical",
    medicalHistory: "Medical History",
    verification: "Verification",

    // Questions
    questions: {
      surname: "Surname",
      first_name: "First name",
      id_type: "ID Type",
      id_number: "ID Number",
      date_of_birth: "Date of birth",
      address: "Address",
      city: "City",
      telephone: "Telephone",
      exam_date: "Exam Date",

      current_employer: "Current Employer",
      position_held: "Position held",
      time_in_office_months: "Time in current position (months)",
      contract_type: "Contract type",
      country_work: "Country where you will work?",
      date_of_travel: "Date of travel?",
      shift_scheme: "Shift Scheme",
      work_involves: "Your work involves (select all that apply)",

      recent_oeuk_exam: "Have you had a previous OEUK medical exam?",
      recent_oeuk_exam_date: "Date of the most recent OEUK medical exam",
      recent_oeuk_provider: "Provider of the most recent OEUK medical exam",
      recent_training: "Have you had a previous training assessment?",
      recent_training_date: "Date of the most recent training assessment",
      recent_training_provider: "Provider of the most recent training assessment",
      next_foet: "Do you have a scheduled FOET/BOSIET exam?",
      next_foet_date: "Date of the next FOET/BOSIET exam",

      smoking: "Do you currently smoke or vape?",
      smoking_quantity: "If you smoke/vape, how many per day?",
      smoking_years: "How many years have you smoked?",
      alcohol: "Alcohol consumption",
      physical_activity: "Do you engage in leisure-time physical activity?",
      physical_frequency: "How many times per week?",
      physical_duration: "Duration per session",

      occupational_diseases: "Have you had any occupational diseases?",
      workplace_accidents: "Have you had any workplace accidents?",
      medical_evacuations: "Have you had any medical evacuations?",
      missed_trips: "Have you had any missed trips?",
      previous_oeuk: "Previous OEUK exam results (if applicable)",

      current_diagnoses: "Current Medical Diagnoses",
      undiagnosed_symptoms: "Undiagnosed symptoms",
      recurring_appointments: "Actual or planned recurring appointments",
      current_medication: "Current medication",

      hospital_admissions: "Have you had any hospital admissions?",
      surgeries: "Have you had any surgeries?",
      chronic_diseases: "Do you have any chronic diseases?",
      high_blood_pressure: "High blood pressure?",
      cardiovascular: "Cardiovascular disease?",
      neurological: "Neurological disease?",
      anxiety_depression: "Anxiety/depression?",
      alcohol_disorder: "Alcohol use disorder?",
      substance_abuse: "Substance abuse?",
      asthma: "Asthma?",
      copd: "COPD?",
      pneumothorax: "Pneumothorax?",
      diabetes: "Diabetes?",
      thyroid: "Thyroid disorder?",
      addisons: "Addison's disease?",
      peptic_ulcer: "Peptic ulcer?",
      ibd: "Inflammatory bowel disease?",
      pancreatitis: "Pancreatitis?",
      liver: "Liver disease?",
      amputation: "Limb amputation?",
      arthritis: "Arthritis?",
      joint_replacement: "Joint replacement?",
      muscle_pain: "Muscle pain, myalgias?",
      back_pain: "Back pain, Low back pain?",
      dermatitis: "Dermatitis?",
      kidney: "Kidney disease, stones?",
      blood_disorders: "Blood disorders, anemia?",
      transplantation: "Organ transplantation?",
      cancer: "Cancer?",
      infectious: "Infectious disease: TB, HIV?",
      hearing: "Hearing loss?",
      dizziness: "Dizziness/vertigo?",
      eardrum: "Perforation of the eardrum?",
      visual: "Visual impairment?",
      dental: "Caries dental?",
      allergic: "Allergic Disorders?",
      immunodeficiency: "Immunodeficiency?",
      pregnancy: "Current pregnancy?",
      self_disability: "Do you consider yourself to have a disability?",
      classified_disabled: "Have you been officially classified as disabled?",

      photo: "Please take or upload a photo of yourself",
      signature: "Please sign below to confirm the information provided is accurate",
    },

    // Tooltips
    tooltips: {
      time_in_office_months: "How many months have you been working in your current job position?",
      shift_scheme: "Rotation schedule: weeks working vs weeks off. Example: 2:3 means 2 weeks on, 3 weeks off.",
      work_involves: "Select activities that are part of your job duties offshore.",
      next_foet: "FOET = Further Offshore Emergency Training. BOSIET = Basic Offshore Safety Induction and Emergency Training. These are mandatory safety courses for offshore workers.",
      missed_trips: "Trips to offshore that you could not complete due to medical reasons or failed fitness tests.",
      previous_oeuk: "Deferred = your certification was postponed pending additional medical review. Restricted = you were certified but with certain job limitations.",
      self_disability: "Any physical or mental condition that you feel limits your daily activities or work capacity.",
      classified_disabled: "Official disability status recognized by a government agency or medical board.",
    },

    // Options
    options: {
      idTypes: ["Passport", "National ID", "Driver License", "Other"],
      contractTypes: ["Fixed", "Eventual"],
      shiftSchemes: ["2:3", "3:3", "Other"],
      workInvolves: ["Food Handling", "Crane Operations", "Emergency Response Team (ERT)", "Normally Unmanned Installations (NUI)"],
      smokingStatuses: ["Currently", "Former smoker", "Never"],
      alcoholLevels: ["Never", "Occasionally (1-2 drinks/week)", "Moderate (3-7 drinks/week)", "Heavy (>7 drinks/week)", "Prefer not to say"],
      physicalActivities: ["None", "Walking", "Running", "Gym/Fitness", "Sports (specify)", "Cycling", "Swimming", "Other"],
      activityFrequencies: ["1-2 times", "3-4 times", "5-6 times", "Daily"],
      activityDurations: ["Less than 30 min", "30-60 min", "1-2 hours", "More than 2 hours"],
      previousOeukLabels: ["Deferred (postponed for further review)", "Restricted (approved with limitations)"],
    },

    // Placeholders
    placeholders: {
      occupational_diseases: "Please describe if any",
      workplace_accidents: "Please describe if any",
      medical_evacuations: "Please describe if any",
      missed_trips: "Please describe if any",
      current_diagnoses: "List any current medical diagnoses",
      undiagnosed_symptoms: "Describe any symptoms you are experiencing",
      current_medication: "List all current medications",
    },

    // Component-specific translations
    signaturePad: {
      clear: "Clear",
      captured: "Signature captured",
    },
    photoCapture: {
      takePhoto: "Take Photo",
      uploadFile: "Upload File",
      remove: "Remove",
      cancel: "Cancel",
      or: "or",
      errorCamera: "Could not access camera. Please use file upload instead.",
    },
  },

  es: {
    // Language selector
    selectLanguage: "Select Language / Seleccione Idioma",
    english: "English",
    spanish: "Español",
    continue: "Continuar",

    // Common UI elements
    back: "Atrás",
    submit: "Enviar",
    required: "*",
    selectOption: "Seleccione una opción",
    yes: "Sí",
    no: "No",

    // Header
    doctorName: "Juan José Reátiga, MD",
    doctorTitle: "Médico Ocupacional Certificado OGUK/OEUK",

    // Success message
    thankYou: "¡Gracias!",
    submissionSuccess: "Su cuestionario médico ha sido enviado exitosamente.",
    submitAnother: "Enviar Otro Formulario",

    // Error messages
    errorSubmitting: "Error al enviar el formulario. Por favor intente nuevamente.",
    errorConnecting: "Error de conexión con el servidor. Por favor intente nuevamente.",

    // Section names
    background: "Información Personal",
    currentJob: "Trabajo Actual",
    certifications: "Certificaciones",
    healthHabits: "Hábitos de Salud",
    occupationalHistory: "Historia Ocupacional",
    currentMedical: "Situación Médica Actual",
    medicalHistory: "Historia Médica",
    verification: "Verificación",

    // Questions
    questions: {
      surname: "Apellido",
      first_name: "Nombre",
      id_type: "Tipo de Documento",
      id_number: "Número de Documento",
      date_of_birth: "Fecha de nacimiento",
      address: "Dirección",
      city: "Ciudad",
      telephone: "Teléfono",
      exam_date: "Fecha del Examen",

      current_employer: "Empleador Actual",
      position_held: "Cargo desempeñado",
      time_in_office_months: "Tiempo en el cargo actual (meses)",
      contract_type: "Tipo de contrato",
      country_work: "¿País donde trabajará?",
      date_of_travel: "¿Fecha de viaje?",
      shift_scheme: "Esquema de Turnos",
      work_involves: "Su trabajo involucra (seleccione todas las que apliquen)",

      recent_oeuk_exam: "¿Ha tenido un examen médico OEUK previo?",
      recent_oeuk_exam_date: "Fecha del examen médico OEUK más reciente",
      recent_oeuk_provider: "Proveedor del examen médico OEUK más reciente",
      recent_training: "¿Ha tenido una evaluación de entrenamiento previa?",
      recent_training_date: "Fecha de la evaluación de entrenamiento más reciente",
      recent_training_provider: "Proveedor de la evaluación de entrenamiento más reciente",
      next_foet: "¿Tiene programado un examen FOET/BOSIET?",
      next_foet_date: "Fecha del próximo examen FOET/BOSIET",

      smoking: "¿Actualmente fuma o vapea?",
      smoking_quantity: "Si fuma/vapea, ¿cuántos por día?",
      smoking_years: "¿Cuántos años ha fumado?",
      alcohol: "Consumo de alcohol",
      physical_activity: "¿Realiza actividad física en su tiempo libre?",
      physical_frequency: "¿Cuántas veces por semana?",
      physical_duration: "Duración por sesión",

      occupational_diseases: "¿Ha tenido enfermedades ocupacionales?",
      workplace_accidents: "¿Ha tenido accidentes laborales?",
      medical_evacuations: "¿Ha tenido evacuaciones médicas?",
      missed_trips: "¿Ha tenido viajes perdidos?",
      previous_oeuk: "Resultados de exámenes OEUK previos (si aplica)",

      current_diagnoses: "Diagnósticos Médicos Actuales",
      undiagnosed_symptoms: "Síntomas sin diagnosticar",
      recurring_appointments: "Citas médicas recurrentes actuales o planeadas",
      current_medication: "Medicación actual",

      hospital_admissions: "¿Ha tenido hospitalizaciones?",
      surgeries: "¿Ha tenido cirugías?",
      chronic_diseases: "¿Tiene enfermedades crónicas?",
      high_blood_pressure: "¿Presión arterial alta?",
      cardiovascular: "¿Enfermedad cardiovascular?",
      neurological: "¿Enfermedad neurológica?",
      anxiety_depression: "¿Ansiedad/depresión?",
      alcohol_disorder: "¿Trastorno por consumo de alcohol?",
      substance_abuse: "¿Abuso de sustancias?",
      asthma: "¿Asma?",
      copd: "¿EPOC?",
      pneumothorax: "¿Neumotórax?",
      diabetes: "¿Diabetes?",
      thyroid: "¿Trastorno tiroideo?",
      addisons: "¿Enfermedad de Addison?",
      peptic_ulcer: "¿Úlcera péptica?",
      ibd: "¿Enfermedad inflamatoria intestinal?",
      pancreatitis: "¿Pancreatitis?",
      liver: "¿Enfermedad hepática?",
      amputation: "¿Amputación de extremidades?",
      arthritis: "¿Artritis?",
      joint_replacement: "¿Reemplazo articular?",
      muscle_pain: "¿Dolor muscular, mialgias?",
      back_pain: "¿Dolor de espalda, lumbalgia?",
      dermatitis: "¿Dermatitis?",
      kidney: "¿Enfermedad renal, cálculos?",
      blood_disorders: "¿Trastornos sanguíneos, anemia?",
      transplantation: "¿Trasplante de órganos?",
      cancer: "¿Cáncer?",
      infectious: "¿Enfermedad infecciosa: TB, VIH?",
      hearing: "¿Pérdida auditiva?",
      dizziness: "¿Mareo/vértigo?",
      eardrum: "¿Perforación del tímpano?",
      visual: "¿Deterioro visual?",
      dental: "¿Caries dental?",
      allergic: "¿Trastornos alérgicos?",
      immunodeficiency: "¿Inmunodeficiencia?",
      pregnancy: "¿Embarazo actual?",
      self_disability: "¿Se considera a sí mismo con una discapacidad?",
      classified_disabled: "¿Ha sido clasificado oficialmente como discapacitado?",

      photo: "Por favor tome o suba una foto suya",
      signature: "Por favor firme a continuación para confirmar que la información proporcionada es precisa",
    },

    // Tooltips
    tooltips: {
      time_in_office_months: "¿Cuántos meses ha estado trabajando en su posición laboral actual?",
      shift_scheme: "Esquema de rotación: semanas trabajando vs semanas libres. Ejemplo: 2:3 significa 2 semanas trabajando, 3 semanas libres.",
      work_involves: "Seleccione las actividades que son parte de sus funciones laborales en alta mar.",
      next_foet: "FOET = Entrenamiento Adicional de Emergencia en Alta Mar. BOSIET = Inducción Básica de Seguridad y Entrenamiento de Emergencia en Alta Mar. Estos son cursos de seguridad obligatorios para trabajadores offshore.",
      missed_trips: "Viajes a instalaciones offshore que no pudo completar debido a razones médicas o pruebas de aptitud fallidas.",
      previous_oeuk: "Diferido = su certificación fue pospuesta pendiente de revisión médica adicional. Restringido = fue certificado pero con ciertas limitaciones laborales.",
      self_disability: "Cualquier condición física o mental que usted sienta que limita sus actividades diarias o capacidad laboral.",
      classified_disabled: "Estado de discapacidad oficial reconocido por una agencia gubernamental o junta médica.",
    },

    // Options
    options: {
      idTypes: ["Pasaporte", "Cédula de Ciudadanía", "Licencia de Conducir", "Otro"],
      contractTypes: ["Fijo", "Eventual"],
      shiftSchemes: ["2:3", "3:3", "Otro"],
      workInvolves: ["Manipulación de Alimentos", "Operación de Grúas", "Equipo de Respuesta a Emergencias (ERT)", "Instalaciones Normalmente No Tripuladas (NUI)"],
      smokingStatuses: ["Actualmente", "Ex fumador", "Nunca"],
      alcoholLevels: ["Nunca", "Ocasionalmente (1-2 tragos/semana)", "Moderado (3-7 tragos/semana)", "Abundante (>7 tragos/semana)", "Prefiero no decir"],
      physicalActivities: ["Ninguna", "Caminar", "Correr", "Gimnasio/Fitness", "Deportes (especificar)", "Ciclismo", "Natación", "Otro"],
      activityFrequencies: ["1-2 veces", "3-4 veces", "5-6 veces", "Diario"],
      activityDurations: ["Menos de 30 min", "30-60 min", "1-2 horas", "Más de 2 horas"],
      previousOeukLabels: ["Diferido (pospuesto para revisión adicional)", "Restringido (aprobado con limitaciones)"],
    },

    // Placeholders
    placeholders: {
      occupational_diseases: "Por favor describa si aplica",
      workplace_accidents: "Por favor describa si aplica",
      medical_evacuations: "Por favor describa si aplica",
      missed_trips: "Por favor describa si aplica",
      current_diagnoses: "Liste cualquier diagnóstico médico actual",
      undiagnosed_symptoms: "Describa cualquier síntoma que esté experimentando",
      current_medication: "Liste todos los medicamentos actuales",
    },

    // Component-specific translations
    signaturePad: {
      clear: "Limpiar",
      captured: "Firma capturada",
    },
    photoCapture: {
      takePhoto: "Tomar Foto",
      uploadFile: "Subir Archivo",
      remove: "Eliminar",
      cancel: "Cancelar",
      or: "o",
      errorCamera: "No se pudo acceder a la cámara. Por favor use la opción de subir archivo.",
    },
  },
};

// Helper function to get translated text
export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return value || key;
};
