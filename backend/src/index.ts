import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { PropertyListing } from "./types";
import { runMaharashtraScraper } from "../scripts/scrape-maharashtra";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & Middleware
app.use(cors({ origin: ["http://localhost:3000", "*"] }));
app.use(express.json());

const DATA_FILE_PATH = path.join(__dirname, "../data/maharashtra_properties.json");

// Helper to load properties
function getProperties(): PropertyListing[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("[API Error] Reading properties JSON failed:", error);
  }

  return [];
}

// Health Check Endpoint
app.get("/api/health", (req: Request, res: Response) => {
  const properties = getProperties();
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    totalProperties: properties.length,
    service: "PropFlow Maharashtra Real Estate API",
  });
});

// Properties Endpoint with City Filtering
app.get("/api/properties", async (req: Request, res: Response) => {
  let properties = getProperties();

  // Auto-generate data if missing
  if (properties.length === 0) {
    console.log("[API] maharashtra_properties.json missing or empty. Auto-running scraper...");
    try {
      properties = await runMaharashtraScraper();
    } catch (err) {
      console.error("[API] Scraper auto-run failed:", err);
    }
  }

  const { city, minPrice, maxPrice, bhk } = req.query;

  let filtered = [...properties];

  if (city && typeof city === "string") {
    const cityClean = city.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.location.city.toLowerCase() === cityClean ||
        p.location.locality.toLowerCase().includes(cityClean)
    );
  }

  if (bhk && typeof bhk === "string") {
    const bhkClean = bhk.trim().toLowerCase();
    filtered = filtered.filter((p) => p.bhk.toLowerCase().includes(bhkClean));
  }

  if (minPrice && !isNaN(Number(minPrice))) {
    filtered = filtered.filter((p) => p.numericPrice >= Number(minPrice));
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    filtered = filtered.filter((p) => p.numericPrice <= Number(maxPrice));
  }

  res.json({
    success: true,
    total: filtered.length,
    cityFilter: city || "All",
    data: filtered,
  });
});

// Single Property Endpoint
app.get("/api/properties/:id", (req: Request, res: Response) => {
  const properties = getProperties();
  const property = properties.find((p) => p.id === req.params.id);

  if (!property) {
    return res.status(404).json({ success: false, message: "Property not found" });
  }

  res.json({ success: true, data: property });
});

// Start Express Server
app.listen(PORT, () => {
  console.log("==================================================");
  console.log(`🚀 PropFlow Backend API server running on port ${PORT}`);
  console.log(`🌐 Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`🏢 Properties endpoint: http://localhost:${PORT}/api/properties`);
  console.log("==================================================");
});
