import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const LdpContext = React.createContext();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const useLdp = () => useContext(LdpContext);

export function withLdp(WrappedComponent) {
  class WithLdp extends React.Component {
    static propTypes = {
      ldp: PropTypes.object,
    }

    render() {
      return (
        <LdpContext.Consumer>
          {ldp => <WrappedComponent {...this.props} ldp={this.props.ldp || ldp} /> }
        </LdpContext.Consumer>
      );
    }
  }
  WithLdp.displayName = `WithLdp(${getDisplayName(WrappedComponent)})`;

  return hoistNonReactStatics(WithLdp, WrappedComponent);
}
