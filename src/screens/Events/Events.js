// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// Atoms
import { Box } from 'atoms';
// Event Organisms
import { EventsList, Legend } from './organisms';
// Events Context
import EventsContext from './logic/EventsContext';

// Events

const Events = ({
  getEvents,
  getEventTypes,
  onStripPress,
  setEvent,
  socket,
  viewEvent,
  ...props
}) => {
  return (
    <EventsContext.Provider value={{ getEvents, getEventTypes, setEvent, socket, viewEvent }}>
      <Box backgroundColor='lightsalmon' flex={1} {...props}>
        <Legend />
        <EventsList onStripPress={onStripPress} />
      </Box>
    </EventsContext.Provider>
  );
};

Events.propType = {
  eventSocket: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  getEventTypes: PropTypes.func.isRequired,
  onStripPress: PropTypes.func,
  setEvent: PropTypes.func.isRequired,
  viewEvent: PropTypes.func.isRequired,
};

Events.defaultProps = {
  eventSocket: null,
  getEvents: null,
  getEventTypes: null,
  onStripPress: null,
  setEvent: null,
  viewEvent: null,
};

export default Events;
