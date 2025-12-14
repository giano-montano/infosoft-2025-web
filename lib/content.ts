// lib/content.ts
import fs from "fs/promises";
import path from "path";
import { Speaker, DaySchedule, TeamMember } from "./types";

const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "data");
const IMAGES_PREFIX = "/content/images"; // URL base pública (configurar en nginx o servir estático)

async function readJSON<T>(filename: string): Promise<T> {
  const p = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw) as T;
}

export async function getSpeakers(): Promise<Speaker[]> {
  return readJSON<Speaker[]>("speakers.json");
}

export async function getSchedule(): Promise<DaySchedule[]> {
  return readJSON<DaySchedule[]>("schedule.json");
}

export async function getOrganization(): Promise<TeamMember[]> {
  return readJSON<TeamMember[]>("organization.json");
}

/**
 * Devuelve la URL pública del avatar de forma genérica.
 * @param avatarPath - Ruta relativa como "speakers/carlos-mendoza.jpg" o "organization/maria-lopez.jpg"
 * @param fallback - Imagen de fallback si no hay avatarPath
 */
export function resolveAvatarUrl(avatarPath?: string, fallback: string = "placeholder.jpg") {
  const file = avatarPath && avatarPath.trim().length ? avatarPath : fallback;
  return `${IMAGES_PREFIX}/${file}`;
}

/**
 * Devuelve la URL pública del avatar de un speaker.
 * - avatarPath debe ser algo relativo como "speakers/carlos-mendoza.jpg"
 * - si no hay avatarPath, devuelve el fallback "speakers/default.jpg"
 */
export function resolveSpeakerAvatarUrl(avatarPath?: string) {
  return resolveAvatarUrl(avatarPath, "speakers/default.jpg");
}

/**
 * Devuelve la URL pública del avatar de un miembro de organización.
 * @param avatarPath - Ruta relativa como "organization/nombre.jpg"
 */
export function resolveOrganizationAvatarUrl(avatarPath?: string) {
  return resolveAvatarUrl(avatarPath, "organization/default.jpg");
}
