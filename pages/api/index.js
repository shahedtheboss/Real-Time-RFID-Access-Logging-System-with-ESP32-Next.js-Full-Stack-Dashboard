import dbConnect from "@/util/db.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import nc from "next-connect";

// Initialize Firestore instance
const db = dbConnect();

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      // GET: Fetch all products
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(products);
    } else if (req.method === "POST") {
      // POST: Create a new product
      const docRef = await addDoc(collection(db, "products"), req.body);
      res.status(201).json({ id: docRef.id, ...req.body });
    } else {
      // Method Not Allowed
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

export default handler;