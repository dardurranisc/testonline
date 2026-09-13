const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type ReqProps = {
  method: Method;
  url: string;
  body?: unknown;
  credentials?: RequestCredentials;
};

export const req = async ({ method, url, body, credentials }: ReqProps) => {
  const res = await fetch(url, {
    method,
    credentials,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) {
    return undefined;
  }

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
