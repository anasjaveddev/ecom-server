import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./Utils/mongodb.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Connect to MongoDB
ConnectMongoDb();

const app = express();

// ========== CORS Configuration (Fix for Vercel) ==========
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ecom-client-seven-khaki.vercel.app",
  "https://ecom-client.vercel.app",
  "https://*.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For development, allow all (optional - remove in production)
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// Handle preflight requests (OPTIONS)
app.options("*", cors());

// ========== Middleware ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== Health Check Route ==========
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API is running",
    status: "ok",
    timestamp: new Date().toISOString(),
    endpoints: {
      products: "GET /api/products",
      product: "GET /api/products/:id",
      addProduct: "POST /api/products (Auth required)",
      updateProduct: "PUT /api/products/:id (Auth required)",
      deleteProduct: "DELETE /api/products/:id (Auth required)",
      register: "POST /api/auth/register",
      login: "POST /api/auth/login"
    }
  });
});

// ========== API Routes ==========
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ========== 404 Handler for unknown routes ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// ========== Global Error Handler ==========
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/`);
  console.log(`✅ Products API: http://localhost:${PORT}/api/products`);
  console.log(`✅ Auth API: http://localhost:${PORT}/api/auth`);
});
