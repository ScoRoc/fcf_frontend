import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import AnnouncementsSubScreen from './announcements/AnnouncementsSubScreen';
import EventsSubScreen from './events/EventsSubScreen';

import PagingTitleBar from '../../components/PagingTitleBar';

import { height, width } from '../../variables/variables';
import homeScreenPages, { firstPageX, secondPageX } from './home-screen-pages';

const {
  getPages,
  getPageByXValue,
  getPageTitleByXValue,
  getPageTitles,
  getPagesSpecifcValue
} = homeScreenPages();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolledViaPress: false,
      currentPage: 'Announcements',
    };
  }

  scrollToBeginning = () => {
    this.scrollView.scrollTo( {x: 0} );
    this.setState({scrolledViaPress: true, currentPage: 'Announcements'});
  }

  scrollToEnd = () => {
    this.scrollView.scrollToEnd();
    this.setState({scrolledViaPress: true, currentPage: 'Events'});
  }

  handleScroll = e => {
    const { x } = e.nativeEvent.contentOffset;
    const xPage = x < width / 2 ? firstPageX : secondPageX;
    if (!this.state.scrolledViaPress) this.setState({ currentPage: getPageTitleByXValue(xPage) });
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Hello from HomeScreen</Text>
        </View>
        <Button title='open drawer' onPress={() => this.props.navigation.openDrawer()} />
        <PagingTitleBar
          currentPage={this.state.currentPage}
          pageTitles={getPageTitles}
          scrollEnabled={false}
          scrollToBeginning={this.scrollToBeginning}
          scrollToEnd={this.scrollToEnd}
        />
        <View style={styles.scrollViewWrap}>
          <ScrollView
            ref={scrollView => this.scrollView = scrollView}
            onScroll={e => this.handleScroll(e)}
            onMomentumScrollEnd={() => this.setState({scrolledViaPress: false})}
            scrollEventThrottle={5}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            <AnnouncementsSubScreen />
            <EventsSubScreen />
          </ScrollView>
        </View>
      </View>
    );
  };
};

const styles = EStyleSheet.create({
  $padding: '50rem',
  screen: {
    paddingTop: '$padding',
    flex: 1,
  },
  title: {
    height: '100rem',
    backgroundColor: 'yellow',
  },
  titleText: {
    color: '$pink',
    fontSize: '22rem'
  },
  scrollViewWrap: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'orange',
  },
});
