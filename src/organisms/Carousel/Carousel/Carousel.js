// Libraries
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// Atoms
import { Box, Scrollview, Text } from 'atoms';

// Carousel

const Carousel = ({
  children,
  contentContainerStyle,
  scrollViewProps,
  scrollX,
  showBullets,
  ...props
}) => {
  // State

  const [interval, setInterval] = useState(1);
  const [intervals, setIntervals] = useState(children.length || 1);
  const [scrollViewWidth, setScrollViewWidth] = useState(1);

  // Refs

  const scrollviewRef = useRef(null);

  // Effects

  // is this a double of handleContentSizeChange ??
  // useEffect(() => {
  //   setIntervals(children.length);
  // }, [children.length]);

  useEffect(() => {
    scrollviewRef.current.scrollTo({ x: scrollX });
  }, [scrollX]);

  // Functions

  const handleScroll = event => {
    const getInterval = offset => {
      for (let i = 1; i <= intervals; i++) {
        if (offset < (scrollViewWidth / intervals) * i) {
          return i;
        }
        if (i === intervals) {
          return i;
        }
      }
    };
    const currentInterval = getInterval(event.nativeEvent.contentOffset.x);
    setInterval(currentInterval);
    props?.onScroll?.({ currentInterval, event });
  };

  const handleContentSizeChange = (_width, _height) => {
    setScrollViewWidth(_width);
    setIntervals(children.length);
    props?.onContentSizeChange?.(_width, _height);
  };

  const buildBullets = ({ intervals }) => {
    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
      bullets.push(
        <Text fontSize={20} key={i} opacity={interval === i ? 0.5 : 0.1}>
          &bull;
        </Text>,
      );
    }
    return bullets;
  };

  // Variables

  const bullets = buildBullets({ intervals });

  // Return

  return (
    <Box {...props}>
      <Scrollview
        contentContainerStyle={contentContainerStyle}
        decelerationRate='fast'
        horizontal
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
        pagingEnabled
        ref={scrollviewRef}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </Scrollview>

      {showBullets && (
        <Box alignItems='center' flexDirection='row' justifyContent='center'>
          {bullets}
        </Box>
      )}
    </Box>
  );
};

Carousel.propTypes = {
  contentContainerStyle: PropTypes.object, // valid ScrollView contentContainerStyle object
  scrollViewProps: PropTypes.object, // object containing any ScrollView props
  scrollX: PropTypes.number, // number that Scrollview should scroll to
  showBullets: PropTypes.bool,
};

Carousel.defaultProps = {
  contentContainerStyle: null,
  scrollViewProps: null,
  scrollX: 0,
  showBullets: false,
};

export default Carousel;
