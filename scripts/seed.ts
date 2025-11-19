import { db } from '../lib/db';
import { assets, users } from '../lib/db/schema';

async function main() {
  console.log('Seeding database...');

  // Create a demo user
  const [user] = await db.insert(users).values({
    email: 'demo@vantage.com',
    name: 'Demo Trader',
    role: 'user',
  }).returning();

  console.log('Created user:', user.id);

  // Seed Assets
  await db.insert(assets).values([
    {
      id: 'VBUT',
      symbol: 'VBUT',
      name: 'Vitalik Buterin',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/VitalikButerinProfile.jpg',
      totalSupply: '1000000',
      circulatingSupply: '850000',
      currentPrice: '450.20',
      marketCap: '450200000',
      vantageScore: 98
    },
    {
      id: 'SALT',
      symbol: 'SALT',
      name: 'Sam Altman',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Sam_Altman_TechCrunch_Disrupt_2019_%28cropped%29.jpg/800px-Sam_Altman_TechCrunch_Disrupt_2019_%28cropped%29.jpg',
      totalSupply: '2000000',
      circulatingSupply: '1500000',
      currentPrice: '1250.50',
      marketCap: '2501000000',
      vantageScore: 95
    },
    // ... add others
  ]);

  console.log('Seeding complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
