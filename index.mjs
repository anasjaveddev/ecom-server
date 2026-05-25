import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS - Allow Vercel & Localhost
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ecom-client-seven-khaki.vercel.app",
  "https://ecom-client.vercel.app",
  "https://*.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for development
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health Check
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "E-Commerce API is running",
    endpoints: {
      products: "/api/products",
      auth: "/api/auth"
    }
  });
});

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled for Vercel frontend`);
});