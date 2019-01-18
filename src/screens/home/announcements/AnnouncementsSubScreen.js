import React from 'react';
import { Button, Dimensions, Image, ScrollView, RefreshControl, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import AnnouncementStrip from './AnnouncementStrip';

import { getIndex } from '../../../utils/helpers';
import useAxios from '../../../utils/axios-helpers';
import { apiUrl } from '../../../utils/global-variables';

const path = `${apiUrl}/announcements`;
const { getWithAxios } = useAxios(path);

const screenWidth = Dimensions.get('window').width;

class AnnouncementsSubScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      announcements: null,
      refreshing: false,
    }
  }

  updateAnnouncement = ({ announcementId, userId }) => {
    const announcements = this.state.announcements.slice(0);
    const idx = getIndex('_id', announcements, announcementId);
    announcements[idx].likes.push(userId);
    this.setState({ announcements });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    getWithAxios().then(result => {
      this.setState({ announcements: result.data.announcements, refreshing: false });
    });
  }

  componentDidMount() {
    getWithAxios().then(result => {
      this.setState({ announcements: result.data.announcements });
    });
  }

  render() {
    const width = () => EStyleSheet.value('$width');
    const yellow = () => EStyleSheet.value('$yellow');
    const imgWidth = width() * .3;
    const imgHeight = imgWidth / 4 * 3;
    const leftoverSpace = width() - imgWidth;
    const padding = leftoverSpace * .1 / 2;
    const textWrapWidth = leftoverSpace - padding * 2;
    // const announcements = Object.keys(getAllAnnouncements).map((announcement, i) => {
    const announcements = this.state.announcements
                        ? this.state.announcements.reverse().map((announcement, i) => {
                            const imgLeft = i % 2 === 0 ? true : false;
                            return (
                              <AnnouncementStrip
                                announcement={announcement}
                                imgHeight={imgHeight}
                                imgLeft={imgLeft}
                                imgWidth={imgWidth}
                                key={announcement._id}
                                padding={padding}
                                // textWrapWidth={textWrapWidth}
                                textWrapWidth={leftoverSpace}
                                updateAnnouncement={this.updateAnnouncement}
                              />
                            );
                          })
                          : null;
    return (
      <View style={{width: width()}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[yellow]}
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              tintColor={yellow()}
            />
          }
        >
          {announcements}
        </ScrollView>
      </View>
    )
  }
};

const styles = EStyleSheet.create({
  text: {
    // fontSize: '22rem'
  },
});

export default AnnouncementsSubScreen;
