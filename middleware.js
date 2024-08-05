// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Importa a função para obter o token JWT

export async function middleware(req) {
  // Ignora as rotas de API
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Obtém o token JWT dos cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se o token existe
  if (!token) {
    // Se não houver token e a rota começar com "/dashboard", redirecione para "/"
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    // Se houver token e a rota for "/", redirecione para "/dashboard"
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

// Define os caminhos a serem protegidos pelo middleware
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};