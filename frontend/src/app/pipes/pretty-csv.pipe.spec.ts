import { PrettyCsvPipe } from './pretty-csv.pipe';

describe('PrettyCsvPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyCsvPipe();
    expect(pipe).toBeTruthy();
  });
});
