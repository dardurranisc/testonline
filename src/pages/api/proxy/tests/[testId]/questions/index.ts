import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.headers.cookie || '';
  const { testId } = req.query;

  if (!testId) {
    return res.status(400).json({ message: 'Не найден ID теста' });
  }

  try {
    if (req.method === 'POST') {
      const response = await fetch(
        `https://interns-test-fe.snp.agency/api/tests/${testId}/questions/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            Cookie: cookies,
          },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          message: data.message || 'Ошибка при удалении теста',
        });
      }

      return res.status(response.status).json(data);
    } else if (req.method === 'PATCH') {
      const response = await fetch(
        `https://interns-test-fe.snp.agency/api/tests/${testId}/questions/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiXHUwNDIwXHUwNDMwXHUwNDNkXHUwNDM4IiwibGFzdF9uYW1lIjoiXHUwNDE0XHUwNDMwXHUwNDQwXHUwNDM0XHUwNDQzXHUwNDQwIn0.bV__1CCGF4YoOOwtC8otmInLJymrSVYULCAtT3930hA',
            Cookie: cookies,
          },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          message: data.message || 'Ошибка при удалении теста',
        });
      }

      return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Ошибка в /api/proxy/tests/[testId]:', error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(500).json({
      message: 'Ошибка сервера',
      error: message,
    });
  }
};

export default handler;
