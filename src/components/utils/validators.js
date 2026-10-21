// src/utils/validators.js

export function validatePatientName(value) {
  return value.trim().length >= 2;
}

export function validatePhone(value) {
  return /^01\d{9}$/.test(value.trim());
}

export function validateAppointmentDate(value) {
  if (!value) return false;

  const selectedDate = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return !Number.isNaN(selectedDate.getTime()) &&
    selectedDate >= today;
}

export function validateAppointmentTime(value) {
  return Boolean(value);
}

export function validateNote(value) {
  return value.length <= 200;
}

export function validateBookingForm(form) {
  return (
    validatePatientName(form.patientName) &&
    validatePhone(form.phone) &&
    Boolean(form.doctorId) &&
    validateAppointmentDate(form.date) &&
    validateAppointmentTime(form.time) &&
    validateNote(form.note)
  );
}