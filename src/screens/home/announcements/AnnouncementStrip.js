import React from 'react';
import { Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import LeftImgAnnouncement from './LeftImgAnnouncement';
import RightImgAnnouncement from './RightImgAnnouncement';

export default AnnouncementStrip = props => {
  const { announcement, img, imgHeight, imgLeft, imgWidth, padding, textWrapWidth, updateAnnouncement, url } = props;
  const textPadding = {paddingLeft: padding, paddingRight: padding};
  const position  = imgLeft
                  ? <LeftImgAnnouncement
                      announcement={announcement}
                      imgHeight={imgHeight}
                      imgWidth={imgWidth}
                      textPadding={textPadding}
                      textWrapWidth={textWrapWidth}
                      updateAnnouncement={updateAnnouncement}
                    />
                  //     {/* CLICK ON ANNOUNCEMENT IS HYPERLINK TO WEB */}
                  //     {/* DOUBLE CLICK ON PIC TO HYPERLINK TO WEB */}
                  //       {/* ADD HEART BUTTON AND HOW MANY PPL HAVE LIKED IT */}
                  : <RightImgAnnouncement
                      announcement={announcement}
                      imgHeight={imgHeight}
                      imgWidth={imgWidth}
                      textPadding={textPadding}
                      textWrapWidth={textWrapWidth}
                      updateAnnouncement={updateAnnouncement}
                    />;
  return (
    <View style={styles.view}>{position}</View>
  )
};

const styles = EStyleSheet.create({
  $spacing: '15rem',
  view: {
    height: '$height * 0.15',
    marginTop: '$spacing',
    marginBottom: '$spacing',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$greyDark',
  },
});
