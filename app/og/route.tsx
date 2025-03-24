import { ImageResponse } from "next/og";

async function fetchFont(): Promise<ArrayBuffer | null> {
  const API = "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700";

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF (https://stackoverflow.com/questions/46321921/how-to-specify-return-type-format-for-google-fonts).
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  const res = await fetch(resource![1]);

  return res.arrayBuffer();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "parsam.io";

    const font = await fetchFont();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontFamily: "Courier Prime",
          }}
        >
          <div
            style={{
              textAlign: "center",
              textWrap: "balance",
              fontSize: 64,
              marginBottom: 40,
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#666",
              position: "absolute",
              bottom: 40,
            }}
          >
            parsam.io
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Courier Prime",
            data: font!,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
