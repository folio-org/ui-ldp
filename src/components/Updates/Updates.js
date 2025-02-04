import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../Tabs';


function Info({ data }) {
  return (
    <Tabs version={data.version?.version}>
      {'XXX' + 1}
    </Tabs>
  );
}


Info.propTypes = {
  data: PropTypes.shape({
    version: PropTypes.shape({
      version: PropTypes.string.isRequired,
    }),
  }).isRequired,
};


export default Info;
