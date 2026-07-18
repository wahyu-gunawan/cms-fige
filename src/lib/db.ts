import { PrismaClient } from '@prisma/client';
import { Article, Service, TeamMember, ContactMessage, SiteSettings } from './types';

// Use global pattern to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ============================================================
// Articles
// ============================================================
export async function getArticles() {
  return prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPublishedArticles() {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug }
  });
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id }
  });
}

export async function createArticle(article: Article) {
  const { createdAt, updatedAt, ...rest } = article;
  return prisma.article.create({
    data: {
      ...rest,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt)
    }
  });
}

export async function updateArticle(id: string, updates: Partial<Article>) {
  const data: any = { ...updates };
  if (updates.createdAt) data.createdAt = new Date(updates.createdAt);
  if (updates.updatedAt) data.updatedAt = new Date(updates.updatedAt);
  
  return prisma.article.update({
    where: { id },
    data
  });
}

export async function deleteArticle(id: string) {
  return prisma.article.delete({
    where: { id }
  });
}

// ============================================================
// Services
// ============================================================
export async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug }
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id }
  });
}

export async function createService(service: Service) {
  return prisma.service.create({
    data: service
  });
}

export async function updateService(id: string, updates: Partial<Service>) {
  return prisma.service.update({
    where: { id },
    data: updates
  });
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id }
  });
}

// ============================================================
// Team Members
// ============================================================
export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function getPublishedTeamMembers() {
  return prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  });
}

export async function getTeamMemberBySlug(slug: string) {
  return prisma.teamMember.findUnique({
    where: { slug }
  });
}

export async function getTeamMemberById(id: string) {
  return prisma.teamMember.findUnique({
    where: { id }
  });
}

export async function createTeamMember(member: TeamMember) {
  return prisma.teamMember.create({
    data: member
  });
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>) {
  return prisma.teamMember.update({
    where: { id },
    data: updates
  });
}

export async function deleteTeamMember(id: string) {
  return prisma.teamMember.delete({
    where: { id }
  });
}

// ============================================================
// Contact Messages
// ============================================================
export async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getUnreadMessages() {
  return prisma.contactMessage.findMany({
    where: { read: false },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getMessageById(id: string) {
  return prisma.contactMessage.findUnique({
    where: { id }
  });
}

export async function createMessage(message: Omit<ContactMessage, 'createdAt' | 'read'>) {
  return prisma.contactMessage.create({
    data: {
      ...message,
      read: false,
      createdAt: new Date()
    }
  });
}

export async function markMessageAsRead(id: string) {
  return prisma.contactMessage.update({
    where: { id },
    data: { read: true }
  });
}

export async function deleteMessage(id: string) {
  return prisma.contactMessage.delete({
    where: { id }
  });
}

// ============================================================
// Site Settings
// ============================================================
export async function getSettings() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' }
  });
  
  if (!settings) {
    // Fallback if not seeded yet
    return {
      siteName: "Kantor Hukum FIGE & Rekan",
      tagline: "Advokasi Profesional & Terpercaya",
      description: "Kami memberikan layanan hukum...",
      address: "Jl. Sudirman No. 123, Jakarta",
      phone: "+62 812 3456 7890",
      email: "info@figerekan.co.id",
      whatsapp: "+6281234567890",
      instagram: "@fige.rekan",
      facebook: "Fige & Rekan",
      heroTitle: "Keadilan Melalui Profesionalisme",
      heroSubtitle: "Melindungi hak-hak Anda dengan integritas dan dedikasi tinggi.",
      yearsExperience: 15,
      casesHandled: 500,
      clientSatisfaction: 98
    } as SiteSettings;
  }
  
  return settings;
}

export async function updateSettings(updates: Partial<SiteSettings>) {
  return prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: updates,
    create: {
      id: 'default',
      siteName: updates.siteName || "",
      tagline: updates.tagline || "",
      description: updates.description || "",
      address: updates.address || "",
      phone: updates.phone || "",
      email: updates.email || "",
      whatsapp: updates.whatsapp || "",
      instagram: updates.instagram || "",
      facebook: updates.facebook || "",
      heroTitle: updates.heroTitle || "",
      heroSubtitle: updates.heroSubtitle || "",
      yearsExperience: updates.yearsExperience || 0,
      casesHandled: updates.casesHandled || 0,
      clientSatisfaction: updates.clientSatisfaction || 0
    }
  });
}
