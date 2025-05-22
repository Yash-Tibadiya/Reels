import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  });

  const authenticationParameters = {
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  };

  try {
    return Response.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      {
        status: 500,
      }
    );
  }
}
