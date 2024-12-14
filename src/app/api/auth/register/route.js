import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();

    const userFound = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userFound) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
        role: data.role,
      },
    });

    const { password: _, ...user } = newUser;

    // Responde con ok: true cuando el registro es exitoso
    return NextResponse.json({ ok: true, message: "Registro exitoso", _,user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
