import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import AnnouncementStripText from './AnnouncementStripText';
import ImgSection from './ImgSection';
import LikeButton from '../../components/LikeButton';

import useAxios from '../../utils/axios-helpers';
import { apiUrl } from '../../utils/global-variables';

const path = `${apiUrl}/announcements/like`;
const { putWithAxios } = useAxios(path);

class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props)
    this.lastPress = null;
  }

  handleSuccess = async ({ announcementId, userId }) => {
    this.props.updateAnnouncement({ announcementId, userId });
  }

  handleErr = err => {
    console.log('signup failed with err: ', err);
  }

  updateLike = ({ announcementId, userId }) => {
    putWithAxios({ announcementId, userId }).then(result => {
      // console.log('result.data: ', result.data);
      result.data.updatedAnnouncement
        ? this.handleSuccess({ announcementId, userId })
        : this.handleErr(result.data.err);
    }).catch(err => console.log('err: ', err));
  }

  // iksent from GitHub
  handleDoublePress = date => {
    const time = new Date().getTime();
    const delta = time - this.lastPress;
    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      this.updateLike({
        announcementId: this.props.announcement._id,
        userId: this.props.user._id,
      });
    }
    this.lastPress = time;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.updated !== this.props.updated && this.props.updated === true) {
      this.props.finishUpdate();
    }
  }

  render() {
    const {
      announcement,
      finishUpdate,
      imgHeight,
      imgLeft,
      imgWidth,
      padding,
      updateAnnouncement,
      updated
    } = this.props;
    const userId = this.props.user && this.props.user._id;
    const { _id, imgUrl, likes } = announcement;
    const liked = likes.includes(userId);
    return (
      <View style={[ styles.announcementStrip, { paddingLeft: padding, paddingRight: padding } ]}>

        <View style={styles.imgSectionWrapper}>
          <ImgSection
            announcement={announcement}
            finishUpdate={finishUpdate}
            imgHeight={imgHeight}
            imgWidth={imgWidth}
            updateAnnouncement={this.props.updateAnnouncement}
            updated={updated}
          />
        </View>

        <View style={styles.textWrapper}>
          {/* <Text style={styles.text}>{announcementText}</Text> */}
          <AnnouncementStripText announcement={announcement} imgWidth={imgWidth} />
        </View>

        <LikeButton
          addedStyle={{ width: imgWidth }}
          library={{ liked: 'MaterialCommunityIcons', unliked: 'MaterialCommunityIcons' }}
          liked={liked}
          likes={likes.length}
          name={{ liked: 'heart', unliked: 'heart-outline' }}
          updateLike={() => this.updateLike({ announcementId: _id, userId })}
        />

      </View>
    );
  }
};


const styles = EStyleSheet.create({
  $spacing: '20rem',
  announcementStrip: {
    marginTop: '$spacing',
    marginBottom: '$spacing',
    paddingTop: '$spacing',
    // paddingBottom: '$spacing',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$greyDark',
  },
  imgSectionWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },
  textWrapper: {
    marginBottom: '$spacing',
    width: '100%',
    alignItems: 'flex-start',
  },
  text: {
    marginTop: '$spacing',
    color: '$white',
    fontSize: '16rem',
  }
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(AnnouncementStrip);
