// Libraries
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { useSpring } from 'react-spring';
// Atoms
import { AnimatedBox, Box, TouchableIOSOpacity } from 'atoms';
import StyledText from 'atoms/basics/StyledText';
// Organisms
import Carousel from 'organisms/Carousel';

// PageCarousel

const PageCarousel = ({ children, onTitlePress, showSlider, styles, titles, ...props }) => {
  // Dimensions

  const { width } = Dimensions.get('window');

  // State

  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const [scrollX, setScrollX] = useState(0); // current scroll x position
  const [scrollToX, setScrollToX] = useState(0); // x position to scroll to
  const [titleDimensions, setTitleDimensions] = useState({});

  // Refs

  const titleRefs = useRef({});

  // Effects

  useEffect(() => {
    Object.entries(titleRefs?.current).forEach(([title, node]) => {
      node?.measure((x, y, width, height, pageX, pageY) => {
        const newDimensions = titleDimensions;
        newDimensions[title] = { x, y, width, height, pageX, pageY };
        setTitleDimensions(newDimensions);
      });
    });
  }, [titles]);

  // Functions

  const handlePress = ({ e, i, pageStartX, title }) => {
    onTitlePress?.({ event: e, index: i, title });
    setScrollToX(pageStartX);
    setCurrentTitle(title);
  };

  const handleScroll = ({ currentInterval, event }) => {
    setScrollX(event.nativeEvent.contentOffset.x);
  };

  // Style

  // removing custom style objects from RN style object
  const { activeColor, inActiveColor, ...titleTextStyle } = styles.titleTextStyle;

  // Animations

  const sliderSpringProps = useSpring({
    marginLeft: titleDimensions[currentTitle]?.pageX || 10,
    width: titleDimensions[currentTitle]?.width || 50,
  });

  // Titles

  const _titles = titles.map((title, i) => {
    const halfPageWidth = width / 2;
    const nextPageOffset = width * (i + 1) - halfPageWidth;
    const prevPageOffset = width * i - halfPageWidth;

    const isActive = scrollX > prevPageOffset && scrollX < nextPageOffset;

    if (currentTitle !== title && isActive) {
      setCurrentTitle(title);
    }

    return (
      <TouchableIOSOpacity
        key={title}
        onPress={e => handlePress({ e, i, pageStartX: width * i, title })}
        style={styles?.titleTouchableStyle}
      >
        <StyledText // need ref so must use StyledText, not custom Text component
          color={isActive ? activeColor : inActiveColor}
          fontSize={30}
          marginLeft={10}
          marginRight={10}
          ref={node => (titleRefs.current[title] = node)}
          style={titleTextStyle}
        >
          {title}
        </StyledText>
      </TouchableIOSOpacity>
    );
  });

  // Return

  return (
    <Box flex={1} {...props}>
      <Box marginBottom={2}>
        <Box flexDirection='row'>{_titles}</Box>
        {showSlider && (
          <AnimatedBox
            backgroundColor={styles.titleTextStyle.activeColor}
            borderRadius='50%'
            height={3}
            style={sliderSpringProps}
          />
        )}
      </Box>
      <Carousel
        color='orange'
        contentContainerStyle={{ width: `${100 * children.length}%` }}
        flex={1}
        onScroll={handleScroll}
        scrollViewProps={{ onMomentumScrollEnd: () => setScrollToX(scrollX) }}
        scrollX={scrollToX}
      >
        {children}
      </Carousel>
    </Box>
  );
};

PageCarousel.propTypes = {
  onTitlePress: PropTypes.func,
  showSlider: PropTypes.bool,
  // have to comment out bc RN thinks this is required
  // styles: PropTypes.shape({
  // titleContainerStyle: PropTypes.object, // valid View style object
  // titleTextStyle: PropTypes.shape({
  //   activeColor: PropTypes.string, // valid color string
  //   inActiveColor: PropTypes.string, // valid color string
  //   ...PropTypes.object, // valid style object
  // }),
  // titleTouchableStyle: PropTypes.object, // valid Touchable viewStyle object
  // }),
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PageCarousel.defaultProps = {
  onTitlePress: null,
  showSlider: false,
  styles: { titleTextStyle: { activeColor: 'green', inActiveColor: 'black' } },
  titles: null,
};

export default PageCarousel;
