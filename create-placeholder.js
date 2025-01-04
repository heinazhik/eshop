const fs = require('fs');
const path = require('path');
const { LoremIpsum } = require('lorem-ipsum');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Beauty',
  'Sports',
];

const products = [];

for (let i = 1; i <= 50; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  products.push({
    id: i,
    name: lorem.generateWords(Math.floor(Math.random() * 3) + 1),
    description: lorem.generateSentences(Math.floor(Math.random() * 3) + 1),
    price: parseFloat((Math.random() * 1000).toFixed(2)),
    imageUrl: `https://placekitten.com/300/200?image=${i}`,
    category,
    createdAt: new Date(),
  });
}

const filePath = path.join(__dirname, 'src', 'placeholder-data.json');
fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

console.log(`Placeholder data with categories and createdAt generated at ${filePath}`);
