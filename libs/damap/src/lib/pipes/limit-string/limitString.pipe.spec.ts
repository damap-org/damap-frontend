import { LimitStringPipe } from './limitString.pipe';

describe('LimitStringPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitStringPipe();
    expect(pipe).toBeTruthy();
  });
});
