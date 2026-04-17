import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const appointmentsRef = collection(db, "appointments");

export async function getAppointments() {
  const q = query(appointmentsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function addAppointment(appointment) {
  const payload = {
    customer: appointment.customer.trim(),
    email: appointment.email.trim().toLowerCase(),
    phone: appointment.phone.trim(),
    service: appointment.service.trim(),
    device: appointment.device.trim(),
    date: appointment.date,
    time: appointment.time,
    status: appointment.status || "Pending",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(appointmentsRef, payload);
  return docRef.id;
}

export async function updateAppointment(id, appointment) {
  const appointmentDoc = doc(db, "appointments", id);

  await updateDoc(appointmentDoc, {
    customer: appointment.customer.trim(),
    email: appointment.email.trim().toLowerCase(),
    phone: appointment.phone.trim(),
    service: appointment.service.trim(),
    device: appointment.device.trim(),
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
  });
}

export async function updateAppointmentStatus(id, newStatus) {
  const appointmentDoc = doc(db, "appointments", id);

  await updateDoc(appointmentDoc, {
    status: newStatus,
  });
}

export async function deleteAppointment(id) {
  const appointmentDoc = doc(db, "appointments", id);
  await deleteDoc(appointmentDoc);
}
