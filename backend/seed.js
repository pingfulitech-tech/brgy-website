// Run with: npm run seed
// Populates MongoDB Atlas with sample officials, services, announcements, and a default admin account.
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const Official = require("./models/Official");
const Service = require("./models/Service");
const Announcement = require("./models/Announcement");
const Admin = require("./models/Admin");

const officials = [
  { name: "Juan Dela Cruz", position: "Punong Barangay", order: 0 },
  { name: "Maria Santos", position: "Barangay Kagawad", committee: "Committee on Health", order: 1 },
  { name: "Pedro Reyes", position: "Barangay Kagawad", committee: "Committee on Peace and Order", order: 2 },
  { name: "Ana Bautista", position: "Barangay Kagawad", committee: "Committee on Education", order: 3 },
  { name: "Jose Ramos", position: "Barangay Kagawad", committee: "Committee on Infrastructure", order: 4 },
  { name: "Linda Garcia", position: "Barangay Kagawad", committee: "Committee on Women and Family", order: 5 },
  { name: "Carlos Mendoza", position: "Barangay Kagawad", committee: "Committee on Environment", order: 6 },
  { name: "Rosa Fernandez", position: "SK Chairperson", order: 7 },
  { name: "Elena Torres", position: "Barangay Secretary", order: 8 },
  { name: "Ricardo Villanueva", position: "Barangay Treasurer", order: 9 },
];

const services = [
  {
    name: "Barangay Clearance",
    description: "Certifies that the resident has no derogatory record with the barangay. Commonly required for employment, business permits, and other transactions.",
    requirements: ["Valid ID", "Proof of residency (utility bill or lease)", "Community Tax Certificate (Cedula)"],
    fee: "₱50.00",
    processingTime: "Same day",
    icon: "document",
  },
  {
    name: "Certificate of Indigency",
    description: "Issued to qualified residents for use in availing free medical, legal, or educational assistance.",
    requirements: ["Valid ID", "Proof of residency", "Barangay social worker assessment"],
    fee: "Free",
    processingTime: "1-2 days",
    icon: "heart",
  },
  {
    name: "Business Permit Clearance",
    description: "Required before applying for a Mayor's Permit to operate a business within the barangay.",
    requirements: ["Valid ID", "DTI/SEC registration", "Lease contract or land title", "Barangay Clearance"],
    fee: "₱200.00",
    processingTime: "1-3 days",
    icon: "briefcase",
  },
  {
    name: "Barangay Protection Order",
    description: "Emergency protection issued for victims of domestic violence under RA 9262.",
    requirements: ["Sworn statement", "Valid ID", "Supporting evidence if available"],
    fee: "Free",
    processingTime: "Same day (emergency)",
    icon: "shield",
  },
  {
    name: "Lupong Tagapamayapa (Barangay Justice)",
    description: "Mediation and conciliation of disputes between residents before matters proceed to court.",
    requirements: ["Complaint letter", "Valid ID of complainant"],
    fee: "Free",
    processingTime: "Scheduled hearing",
    icon: "scale",
  },
  {
    name: "Community Tax Certificate (Cedula)",
    description: "Basic identification document and tax receipt required for most government transactions.",
    requirements: ["Valid ID", "Proof of income (if applicable)"],
    fee: "Varies by income",
    processingTime: "Same day",
    icon: "id",
  },
];

const announcements = [
  {
    title: "Free Anti-Rabies Vaccination for Pets",
    body: "The Barangay Health Center, in partnership with the City Veterinary Office, will conduct a free anti-rabies vaccination drive for dogs and cats. Bring your pets on a leash or in a carrier. First come, first served.",
    category: "Health",
    isPinned: true,
  },
  {
    title: "Schedule of Garbage Collection",
    body: "Biodegradable waste is collected Mondays, Wednesdays, and Fridays. Non-biodegradable waste is collected Tuesdays and Thursdays. Please segregate your waste properly before collection time.",
    category: "Advisory",
    isPinned: false,
  },
  {
    title: "Barangay Assembly Meeting",
    body: "All residents are invited to the quarterly Barangay Assembly to discuss community concerns, budget updates, and upcoming projects. Attendance is highly encouraged.",
    category: "Event",
    isPinned: true,
  },
  {
    title: "Job Fair for Out-of-School Youth",
    body: "The SK Council, in coordination with PESO, will hold a job fair open to all qualified out-of-school youth residents. Bring resume, valid ID, and NBI clearance.",
    category: "Job",
    isPinned: false,
  },
];

const seed = async () => {
  await connectDB();

  await Promise.all([
    Official.deleteMany({}),
    Service.deleteMany({}),
    Announcement.deleteMany({}),
  ]);

  await Official.insertMany(officials);
  await Service.insertMany(services);
  await Announcement.insertMany(announcements);

  const existingAdmin = await Admin.findOne({ username: "admin" });
  if (!existingAdmin) {
    await Admin.create({
      username: "admin",
      password: "ChangeMe123!", // hashed automatically by the Admin model
      name: "Barangay Administrator",
    });
    console.log("Default admin created -> username: admin | password: ChangeMe123!");
    console.log("IMPORTANT: change this password after first login.");
  }

  console.log("Seed data inserted successfully.");
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
