import React from 'react';
import { Button, Dimensions, ScrollView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import eventKeys from './event-keys';

import EventsKey from './EventsKey';
import EventStrip from './EventStrip';

const date = new Date();
const month = date.toLocaleString('en-us', {month: 'long'});
const year = date.toLocaleString('en-us', {year: 'numeric'});
const { getKeys } = eventKeys();

//////////////////////////////
const fakeEvents = () => {
  const fakeEventsObj = {
    one: {
      date: '3',
      title: 'Drinks at Optimism',
      type: 'social',
    },
    two: {
      date: '8',
      throughDate: 'Dec 15',
      title: 'Cancer Drive',
      type: 'community',
    },
    three: {
      date: '11',
      title: '5k Run for ABC',
      type: 'competition',
    },
    four: {
      date: '17',
      throughDate: 'Dec 22',
      title: 'Another Comp Event',
      type: 'competition',
    },
    five: {
      date: '22',
      title: 'Another Social Event',
      type: 'social',
    },
    six: {
      date: '26',
      title: 'Another Community Event',
      type: 'community',
    },
  };
  return {
    getDateByTitle: title => fakeEventsObj[Object.keys(fakeEventsObj).find(key => fakeEventsObj[key].title === title)].date,
    getEventTitles: (() => Object.values(fakeEventsObj).map(event => event.title))(),
    getThroughDateByTitle: title => fakeEventsObj[Object.keys(fakeEventsObj).find(key => fakeEventsObj[key].title === title)].throughDate,
    getTypeByTitle: title => fakeEventsObj[Object.keys(fakeEventsObj).find(key => fakeEventsObj[key].title === title)].type,

  }
};
const { getDateByTitle, getEventTitles, getThroughDateByTitle, getTypeByTitle } = fakeEvents();
//////////////////////////////

export default EventsSubScreen = props => {
  const { height, width } = Dimensions.get('window');
  ///////
  const events = getEventTitles.map((title, i) => {
    return (
      <EventStrip
        title={title}
        color={getKeys[getTypeByTitle(title)].color}
        date={getDateByTitle(title)}
        throughDate={getThroughDateByTitle(title)}
        key={i}
      />
    )
  })
  ///////
  return (
    <View style={[styles.screen, {width}]}>
      <Text>Events sub screen</Text>
      <EventsKey />
      <View style={styles.monthWrapper}>
        <Text style={styles.monthText}>{month} {year}</Text>
      </View>
      <ScrollView>
        {events}
      </ScrollView>
    </View>
  )
};

const styles = EStyleSheet.create({
  $padding: '50rem',
  $monthPadding: '7rem',
  screen: {
    // paddingTop: '$padding',
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  monthWrapper: {
    paddingTop: '$monthPadding',
    paddingBottom: '$monthPadding',
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  monthText: {
    // color: '$pink',
    fontSize: '30rem'
  }
});
