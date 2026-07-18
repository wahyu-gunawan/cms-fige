import fs from 'fs';
import path from 'path';
import { Article, Service, TeamMember, ContactMessage, SiteSettings } from './types';

const dataDir = path.join(process.cwd(), 'data');

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    return (filename.endsWith('.json') && !filename.includes('settings') ? [] : {}) as T;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ============================================================
// Articles
// ============================================================
export function getArticles(): Article[] {
  return readJSON<Article[]>('articles.json');
}

export function getPublishedArticles(): Article[] {
  return getArticles().filter((a) => a.published).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getArticleById(id: string): Article | undefined {
  return getArticles().find((a) => a.id === id);
}

export function createArticle(article: Article): Article {
  const articles = getArticles();
  articles.push(article);
  writeJSON('articles.json', articles);
  return article;
}

export function updateArticle(id: string, updates: Partial<Article>): Article | null {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;
  articles[index] = { ...articles[index], ...updates, updatedAt: new Date().toISOString() };
  writeJSON('articles.json', articles);
  return articles[index];
}

export function deleteArticle(id: string): boolean {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  writeJSON('articles.json', filtered);
  return true;
}

// ============================================================
// Services
// ============================================================
export function getServices(): Service[] {
  return readJSON<Service[]>('services.json');
}

export function getPublishedServices(): Service[] {
  return getServices().filter((s) => s.published).sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return getServices().find((s) => s.id === id);
}

export function createService(service: Service): Service {
  const services = getServices();
  services.push(service);
  writeJSON('services.json', services);
  return service;
}

export function updateService(id: string, updates: Partial<Service>): Service | null {
  const services = getServices();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index], ...updates };
  writeJSON('services.json', services);
  return services[index];
}

export function deleteService(id: string): boolean {
  const services = getServices();
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  writeJSON('services.json', filtered);
  return true;
}

// ============================================================
// Team Members
// ============================================================
export function getTeamMembers(): TeamMember[] {
  return readJSON<TeamMember[]>('team.json');
}

export function getPublishedTeamMembers(): TeamMember[] {
  return getTeamMembers().filter((t) => t.published).sort((a, b) => a.order - b.order);
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return getTeamMembers().find((t) => t.slug === slug);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return getTeamMembers().find((t) => t.id === id);
}

export function createTeamMember(member: TeamMember): TeamMember {
  const members = getTeamMembers();
  members.push(member);
  writeJSON('team.json', members);
  return member;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
  const members = getTeamMembers();
  const index = members.findIndex((t) => t.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...updates };
  writeJSON('team.json', members);
  return members[index];
}

export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers();
  const filtered = members.filter((t) => t.id !== id);
  if (filtered.length === members.length) return false;
  writeJSON('team.json', filtered);
  return true;
}

// ============================================================
// Contact Messages
// ============================================================
export function getMessages(): ContactMessage[] {
  return readJSON<ContactMessage[]>('messages.json');
}

export function getUnreadMessages(): ContactMessage[] {
  return getMessages().filter((m) => !m.read);
}

export function createMessage(message: ContactMessage): ContactMessage {
  const messages = getMessages();
  messages.push(message);
  writeJSON('messages.json', messages);
  return message;
}

export function markMessageAsRead(id: string): boolean {
  const messages = getMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return false;
  messages[index].read = true;
  writeJSON('messages.json', messages);
  return true;
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  writeJSON('messages.json', filtered);
  return true;
}

// ============================================================
// Site Settings
// ============================================================
export function getSettings(): SiteSettings {
  return readJSON<SiteSettings>('settings.json');
}

export function updateSettings(updates: Partial<SiteSettings>): SiteSettings {
  const settings = getSettings();
  const updated = { ...settings, ...updates };
  writeJSON('settings.json', updated);
  return updated;
}
