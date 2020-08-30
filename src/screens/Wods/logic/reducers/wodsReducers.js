export default {
  setCurrentWeekWods: async (globalState, dispatch, { currentWeekWods }) => {
    console.log('currentWeekWods: ', currentWeekWods);
    const newWodsState = {
      ...globalState.wodsState,
      data: {
        ...globalState.wodsState.data,
        currentWeekWods,
      },
    };
    await dispatch.setCacheAt({ data: currentWeekWods, key: 'currentWeekWods' });
    return { wodsState: newWodsState };
  },
  setWod: async (globalState, dispatch, { wod }) => {
    console.log('wod in setWod: ', wod);
    await dispatch.setCacheAt({
      data: {
        ...globalState.cache.wods,
        [wod._id]: wod,
      },
      key: 'wods',
    });
    const { wodsState } = globalState;
    wodsState.data.wods[wod._id] = wod;
    return { ...wodsState };
  },
  setWods: async (globalState, dispatch, { wods: _wods }) => {
    const wods = _wods.reduce((allWods, wod) => {
      allWods[wod._id] = wod;
      return allWods;
    }, {});

    const newWodsState = {
      ...globalState.wodsState,
      data: {
        ...globalState.wodsState.data,
        wods,
      },
      // direction: direction || globalState.wods.direction,
    };

    await dispatch.setCacheAt({ data: { ...globalState.cache.wods, ...wods }, key: 'wods' });
    return { wodsState: newWodsState };
  },
};