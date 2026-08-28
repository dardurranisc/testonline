import { NextApiRequest, NextApiResponse } from 'next';
import { URLSearchParams } from 'url';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.headers.cookie || '';

  try {
    if (req.method === 'GET') {
      const queryParameters = new URLSearchParams(req.query as Record<string, string>);
      const response = await fetch(
        `https://interns-test-fe.snp.agency/api/tests/?${queryParameters.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            Cookie: cookies,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          message: data.message || 'Ошибка при получении списка тестов',
        });
      }

      return res.status(response.status).json(data);
    } else {
      const response = await fetch('https://interns-test-fe.snp.agency/api/tests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
          Cookie: cookies,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          message: data.message || 'Ошибка при создании теста',
        });
      }

      return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Ошибка в /api/proxy/tests:', error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(500).json({
      message: 'Ошибка сервера',
      error: message,
    });
  }
};

export default handler;
