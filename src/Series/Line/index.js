import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart';
import Serie from '../../Serie';
import { memoize } from '../../utils';

export const Line = ({
  color,
  data: domain = [],
  delay,
  duration,
  ...props
}) => {
  const children = useMemo(
    () =>
      memoize(
        context => (
          <Chart
            color={color}
            delay={delay}
            domain={domain}
            duration={duration}
            {...context}
          />
        ),
        (...argv) => JSON.stringify(argv),
      ),
    [color, delay, JSON.stringify(domain), duration],
  );

  return (
    <Serie {...props} data={domain.map((value, index) => [index, value])}>
      {children}
    </Serie>
  );
};

Line.propTypes = {
  color: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number),
  delay: PropTypes.number,
  duration: PropTypes.number,
  tooltip: PropTypes.func,
};

export default Line;
