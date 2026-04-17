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

const customersRef = collection(db, "customers");

export async function getCustomers() {
  const q = query(customersRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function addCustomer(customer) {
  const payload = {
    firstName: customer.firstName.trim(),
    lastName: customer.lastName.trim(),
    phone: customer.phone.trim(),
    email: customer.email.trim().toLowerCase(),
    status: customer.status || "Active",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(customersRef, payload);
  return docRef.id;
}

export async function updateCustomer(id, customer) {
  const customerDoc = doc(db, "customers", id);

  await updateDoc(customerDoc, {
    firstName: customer.firstName.trim(),
    lastName: customer.lastName.trim(),
    phone: customer.phone.trim(),
    email: customer.email.trim().toLowerCase(),
    status: customer.status,
  });
}

export async function deleteCustomer(id) {
  const customerDoc = doc(db, "customers", id);
  await deleteDoc(customerDoc);
}

export async function toggleCustomerStatus(id, currentStatus) {
  const customerDoc = doc(db, "customers", id);

  await updateDoc(customerDoc, {
    status: currentStatus === "Active" ? "Suspended" : "Active",
  });
}
