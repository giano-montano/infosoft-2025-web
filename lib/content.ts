// lib/content.ts
import fs from "fs/promises";
import path from "path";
import { Speaker, DaySchedule } from "./types";

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

/**
 * Devuelve la URL pública del avatar.
 * - avatarPath debe ser algo relativo como "speakers/carlos-mendoza.jpg"
 * - si no hay avatarPath, devuelve el fallback "speakers/default.jpg"
 */
export function resolveSpeakerAvatarUrl(avatarPath?: string) {
  const file = avatarPath && avatarPath.trim().length ? avatarPath : "speakers/default.jpg";
  return `${IMAGES_PREFIX}/${file}`; // ejemplo: /content/images/speakers/carlos-mendoza.jpg
}
