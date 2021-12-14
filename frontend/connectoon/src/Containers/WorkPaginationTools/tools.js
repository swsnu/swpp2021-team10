export const stateConstructor = (location) => {
  let subjectRows;
  const worksInRow = 4;
  const rowIncrement = 2;
  const pageRowIncrement = 5;
  if (location.state && location.state.subjectRows) {
    subjectRows = location.state.subjectRows;
  } else {
    subjectRows = [1, 1];
  }
  const requestWorks = subjectRows.map((rows) => { return [0, worksInRow * (rows + pageRowIncrement)]; });
  return {
    subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
  };
};

export const stateUpdator = (listId, state) => {
  const {
    subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
  } = state;
  subjectRows[listId] += rowIncrement;
  const newRequestWorks = [];
  let fetchMore = false;
  requestWorks.forEach((requestWork, idx) => {
    if (worksInRow * (subjectRows[idx] + rowIncrement) >= requestWork[1]) {
      fetchMore = true;
      newRequestWorks.push([requestWork[1], requestWork[1] + worksInRow * pageRowIncrement]);
    } else {
      newRequestWorks.push([requestWork[1], requestWork[1]]);
    }
  });
  return { subjectRows, newRequestWorks, fetchMore };
};
