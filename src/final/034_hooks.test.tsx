import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Hooks from './033_hooks';

describe('<Hooks />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch');
  });

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  const mockFetchUser = (
    user: { id: number; name: string },
    timeout: number = 0
  ) => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resovle) =>
          setTimeout(
            () =>
              resovle({
                status: 200,
                json: () => user,
              }),
            timeout
          )
        )
    );
  };

  it('should render a user name', async () => {
    mockFetchUser({ id: 42, name: 'Patrick' });
    render(<Hooks />);
    expect(screen.getByLabelText('24')).toBeInTheDocument();
    expect(screen.getByLabelText('42')).toBeInTheDocument();
    expect(screen.getByLabelText('666')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/user/42',
      expect.anything()
    );
    await waitFor(() =>
      expect(screen.getByText('Patrick')).toBeInTheDocument()
    );

    (global.fetch as jest.Mock).mockClear();
    mockFetchUser({ id: 24, name: 'Isabelle' });
    fireEvent.click(screen.getByLabelText('24'));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/user/24',
      expect.anything()
    );
    await waitFor(() =>
      expect(screen.getByText('Isabelle')).toBeInTheDocument()
    );
  });
});

describe('<Hooks />', () => {
  const handlers = [
    rest.get('/api/user/42', async (_, res, ctx) => {
      await new Promise((r) => setTimeout(r, 2000));
      return res(ctx.json({ id: 42, name: 'Patrick' }));
    }),
    rest.get('/api/user/24', async (_, res, ctx) => {
      await new Promise((r) => setTimeout(r, 1000));
      return res(ctx.json({ id: 24, name: 'Isabelle' }));
    }),
  ];
  const server = setupServer(...handlers);
  expect.extend({
    toBeAbortError(received) {
      const type = Object.prototype.toString.call(received);
      const expectedType = '[object DOMException]';
      const expectedMessage = 'Aborted';
      const pass =
        type === expectedType && received?.message === expectedMessage;
      if (pass) {
        return {
          message: () =>
            `expected ${type}/${received?.message} not to be ${expectedType}/${expectedMessage}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${type}/${received?.message} to be ${expectedType}/${expectedMessage}`,
          pass: false,
        };
      }
    },
  });

  beforeAll(() => {
    server.listen();
    jest.spyOn(console, 'error');
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.runAllTimers();
    jest.useRealTimers();
  });

  afterAll(() => {
    server.close();
    (console.error as jest.Mock).mockRestore();
  });

  const expectAbortError = () => {
    const logError = console.error as jest.Mock;
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith((expect as any).toBeAbortError());
    logError.mockClear();
  };

  it('should cancel previous requests and render last requested user name', async () => {
    render(<Hooks />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    jest.advanceTimersByTime(500);
    fireEvent.click(screen.getByLabelText('24'));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expectAbortError());

    jest.advanceTimersByTime(500);
    fireEvent.click(screen.getByLabelText('42'));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expectAbortError());

    jest.advanceTimersByTime(500);
    fireEvent.click(screen.getByLabelText('24'));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expectAbortError());

    jest.runAllTimers();
    await waitFor(() =>
      expect(screen.getByText('Isabelle')).toBeInTheDocument()
    );
  });
});
