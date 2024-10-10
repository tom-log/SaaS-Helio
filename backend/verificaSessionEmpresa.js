"use server";
import { getServerSession } from "next-auth/next";

import prisma from "./prisma";

export const verificaSessionEmpresa = async () => {
  const session = await getServerSession();
  if (session) {
    const usuario = await prisma.usuarios.findUnique({
      where: {
        email: session.user.email,
      },
    });
    return {
      empresa: usuario.empresaId,
      email: usuario.email,
    };
  }
  return null;
};
