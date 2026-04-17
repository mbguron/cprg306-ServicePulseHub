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

const servicesRef = collection(db, "services");

export async function getServices() {
  const q = query(servicesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function addService(service) {
  const payload = {
    name: service.name.trim(),
    price: service.price.trim(),
    category: service.category.trim(),
    description: service.description.trim(),
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(servicesRef, payload);
  return docRef.id;
}

export async function updateService(id, service) {
  const serviceDoc = doc(db, "services", id);

  await updateDoc(serviceDoc, {
    name: service.name.trim(),
    price: service.price.trim(),
    category: service.category.trim(),
    description: service.description.trim(),
  });
}

export async function deleteService(id) {
  const serviceDoc = doc(db, "services", id);
  await deleteDoc(serviceDoc);
}
