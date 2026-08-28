import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://interns-test-fe.snp.agency/api/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || 'Ошибка при выходе из системы',
      });
    }

    const responseStatus = response.status;

    const setCookie = response.headers.get('set-cookie');

    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }

    return res.status(responseStatus).json(data);
  } catch (error) {
    console.error('Ошибка при запросе к /signin:', error);

    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';

    return res.status(500).json({
      message: 'Ошибка сервера',
      error: message,
    });
  }
};

export default handler;
