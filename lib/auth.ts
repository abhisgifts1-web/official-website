import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { AdminUser } from '@/types';

const JWT_SECRET_STRING = process.env.ADMIN_JWT_SECRET || 'abhi-gifts-super-secret-jwt-key-2026';
const secretKey = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = 'abhi_gifts_admin_token';

// In-memory admin credentials fallback
export const DEFAULT_ADMIN: AdminUser & { passwordHash: string } = {
  id: 'admin-1',
  email: 'admin@abhigifts.com',
  name: 'Abhi Gifts Administrator',
  role: 'superadmin',
  passwordHash: bcrypt.hashSync('AbhiGifts@2026!Admin', 10),
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createAdminToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);

  return token;
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as 'superadmin' | 'admin' | 'manager',
    };
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
