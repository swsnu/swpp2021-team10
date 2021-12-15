import * as tools from './tools';

describe('Pagination tools', () => {
  it('`stateConstructor` should set subjectRows correctly', () => {
    const stubLocation = { state: { subjectRows: [3, 1] } };
    const constructedState = tools.stateConstructor(stubLocation);
    expect(constructedState.subjectRows).toEqual([3, 1]);
  });
});
