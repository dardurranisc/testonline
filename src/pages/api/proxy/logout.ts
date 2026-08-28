import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookie = req.headers.cookie || '';

    const response = await fetch('https://interns-test-fe.snp.agency/api/logout/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
        Cookie: cookie,
      },
    });

    if (response.status === 204) {
      res.setHeader('Set-Cookie', 'access=;');
      return res.status(204).end();
    }

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || 'Ошибка при выходе из системы',
      });
    }

    const responseStatus = response.status;

    res.setHeader('Set-Cookie', 'access=;');
    return res.status(responseStatus).json(data);
  } catch (error) {
    console.error('Ошибка при запросе к /logout:', error);

    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';

    return res.status(500).json({
      message: 'Ошибка сервера при выходе',
      error: message,
    });
  }
};

export default handler;
