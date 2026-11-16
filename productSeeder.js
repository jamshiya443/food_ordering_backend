
const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("../frontend/src/data/products.json");

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        let added = 0;
        let skipped = 0;

        for (const product of products) {
            const existingProduct = await Product.findOne({
                name: product.name
            });

            if (existingProduct) {
                console.log(`Skipped: ${product.name} already exists`);
                skipped++;
                continue;
            }

            await Product.create({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                image: product.image
            });

            console.log(`Added: ${product.name}`);
            added++;
        }

        console.log("\nImport completed!");
        console.log(`Products added: ${added}`);
        console.log(`Products skipped: ${skipped}`);

    } catch (error) {
        console.error("Import error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

require("dotenv").config();
seedProducts();
