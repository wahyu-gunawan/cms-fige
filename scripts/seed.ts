import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataDir = path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    console.log('No data directory found, skipping seed.');
    return;
  }

  // Seed Articles
  const articlesPath = path.join(dataDir, 'articles.json');
  if (fs.existsSync(articlesPath)) {
    const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    for (const article of articles) {
      await prisma.article.upsert({
        where: { id: article.id },
        update: {},
        create: {
          ...article,
          createdAt: new Date(article.createdAt),
          updatedAt: new Date(article.updatedAt)
        }
      });
    }
    console.log(`Seeded ${articles.length} articles`);
  }

  // Seed Services
  const servicesPath = path.join(dataDir, 'services.json');
  if (fs.existsSync(servicesPath)) {
    const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
    for (const service of services) {
      await prisma.service.upsert({
        where: { id: service.id },
        update: {},
        create: service
      });
    }
    console.log(`Seeded ${services.length} services`);
  }

  // Seed Team Members
  const teamPath = path.join(dataDir, 'team.json');
  if (fs.existsSync(teamPath)) {
    const team = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
    for (const member of team) {
      await prisma.teamMember.upsert({
        where: { id: member.id },
        update: {},
        create: member
      });
    }
    console.log(`Seeded ${team.length} team members`);
  }

  // Seed Messages
  const messagesPath = path.join(dataDir, 'messages.json');
  if (fs.existsSync(messagesPath)) {
    const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    for (const msg of messages) {
      await prisma.contactMessage.upsert({
        where: { id: msg.id },
        update: {},
        create: {
          ...msg,
          createdAt: new Date(msg.createdAt)
        }
      });
    }
    console.log(`Seeded ${messages.length} messages`);
  }

  // Seed Settings
  const settingsPath = path.join(dataDir, 'settings.json');
  if (fs.existsSync(settingsPath)) {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        ...settings
      }
    });
    console.log('Seeded settings');
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
