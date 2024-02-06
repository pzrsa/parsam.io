import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "parsam.io";

    return new ImageResponse(
      (
        <div
          style={{
            background: "white",
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "20px 50px",
              margin: "0 42px",
              fontSize: 80,
              borderRadius: "2px",
              backgroundColor: "#111",
              color: "white",
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
          <div
            style={{
              left: 42,
              bottom: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 60,
                margin: "0 42px",
              }}
            >
              parsam.io
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
