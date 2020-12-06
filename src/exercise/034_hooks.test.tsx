import { render, waitFor } from '@testing-library/react';
import Hooks from './033_hooks';

/**
 * Test the async rendering of the user name
 * Mock global.fetch
 * https://jestjs.io/docs/en/mock-functions.html
 * Use waitFor from @testing-library/react
 * https://testing-library.com/docs/dom-testing-library/api-async#waitfor
 */

describe('<Hooks />', () => {
  it('should render a user name', async () => {
    render(<Hooks />);
  });
});
