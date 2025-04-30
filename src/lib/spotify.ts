// src/lib/spotify.ts
const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const getAccessToken = async () => {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
  });

  return res.json() as Promise<{ access_token: string }>;
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
