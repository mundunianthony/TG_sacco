import { Client, Account, Databases } from "appwrite";

// 🔹 Replace with your Appwrite details
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e11514002400b14c98"); // Change this to your Project ID

const account = new Account(client);
const databases = new Databases(client);

async function testAppwrite() {
  console.log("🔍 Running Appwrite tests...");

  // 1️⃣ Test API Connection
  try {
    const response = await fetch(client.config.endpoint);
    if (response.ok) {
      console.log("✅ Appwrite server is reachable.");
    } else {
      console.error("❌ Appwrite server is NOT reachable.");
    }
  } catch (err) {
    console.error("❌ Error connecting to Appwrite:", err);
  }

  // 2️⃣ Test Database Connection
  try {
    const collections = await databases.listCollections("YOUR_DATABASE_ID"); // Replace with your database ID
    console.log("✅ Database is running. Collections found:", collections);
  } catch (error) {
    console.error("❌ Database is not reachable:", error);
  }

  // 3️⃣ Test If User is Logged In
  try {
    const user = await account.get();
    console.log("✅ User session exists:", user);
  } catch (error) {
    console.error("❌ No active session:", error);
  }

  // 4️⃣ Test Login
  try {
    const session = await account.createEmailSession(
      "test@example.com", // Replace with a real email
      "password123" // Replace with the correct password
    );
    console.log("✅ User logged in successfully:", session);
  } catch (error) {
    console.error("❌ Login failed:", error);
  }
}

// Run the tests
testAppwrite();
