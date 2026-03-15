import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

// ✅ Sab blogs fetch karo (Home page)
export const fetchBlogs = async () => {
  const snap = await getDocs(
    query(collection(db, "blogs"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
};

// ✅ Sirf logged-in user ke blogs (Dashboard)
export const fetchMyBlogs = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, "blogs"),
    where("author._id", "==", user.uid),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
};

// ✅ Single blog fetch
export const getSingleBlog = async (id) => {
  const snap = await getDoc(doc(db, "blogs", id));
  if (!snap.exists()) throw new Error("Blog not found");
  return { _id: snap.id, ...snap.data() };
};

// ✅ Blog create karo
export const createBlog = async ({ title, content }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return await addDoc(collection(db, "blogs"), {
    title,
    content,
    author: {
      _id: user.uid,
      username: user.displayName || "Unknown",
      email: user.email,
    },
    createdAt: serverTimestamp(),
  });
};

// ✅ Blog update karo
export const updateBlog = async (id, { title, content }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const blogRef = doc(db, "blogs", id);
  const snap = await getDoc(blogRef);
  if (!snap.exists()) throw new Error("Blog not found");
  if (snap.data().author._id !== user.uid) throw new Error("Not authorized");

  await updateDoc(blogRef, { title, content });
};

// ✅ Blog delete karo
export const deleteBlog = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const blogRef = doc(db, "blogs", id);
  const snap = await getDoc(blogRef);
  if (!snap.exists()) throw new Error("Blog not found");
  if (snap.data().author._id !== user.uid) throw new Error("Not authorized");

  await deleteDoc(blogRef);
};

// ✅ Login
export const loginUser = async ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ✅ Register
export const registerUser = async ({ username, email, password }) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName: username });
  await setDoc(doc(db, "users", res.user.uid), {
    username,
    email,
    uid: res.user.uid,
  });
  return res;
};

// ✅ Logout
export const logoutUser = () => signOut(auth);
