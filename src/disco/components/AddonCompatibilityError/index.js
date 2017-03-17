/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  INCOMPATIBLE_FIREFOX_FOR_IOS,
  INCOMPATIBLE_NOT_FIREFOX,
  INCOMPATIBLE_UNDER_MIN_VERSION,
} from 'core/constants';
import _log from 'core/logger';
import translate from 'core/i18n/translate';
import { sanitizeHTML } from 'core/utils';

import './style.scss';


// Messages in the disco pane are a bit less specific as we expect fewer
// non-Firefox clients and the copy space is limited.
export class AddonCompatibilityErrorBase extends React.Component {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    log: PropTypes.object,
    minVersion: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
  }

  static defaultProps = {
    log: _log,
  }

  render() {
    const {
      i18n,
      lang,
      log,
      minVersion,
      reason,
    } = this.props;
    const downloadUrl = `https://www.mozilla.org/${lang}/firefox/`;
    let message;

    if (typeof reason === 'undefined') {
      throw new Error('AddonCompatibilityError requires a "reason" prop');
    }
    if (typeof minVersion === 'undefined') {
      throw new Error('minVersion is required; it cannot be undefined');
    }

    if (reason === INCOMPATIBLE_NOT_FIREFOX) {
      message = i18n.sprintf(i18n.gettext(`You need to
        <a href="%(downloadUrl)s">download Firefox</a> to install this add-on.`
      ), { downloadUrl });
    } else if (reason === INCOMPATIBLE_FIREFOX_FOR_IOS) {
      message = i18n.gettext(
        'Firefox for iOS does not currently support add-ons.');
    } else if (reason === INCOMPATIBLE_UNDER_MIN_VERSION) {
      message = i18n.gettext(
        'This add-on does not support your version of Firefox.');
    } else {
      // This is an unknown reason code and a custom error message should
      // be added.
      log.warn(
        'Unknown reason code supplied to AddonCompatibilityError', reason);

      message = i18n.gettext(
        'This add-on does not support your browser.');
    }

    return (
      <div className="AddonCompatibilityError"
        dangerouslySetInnerHTML={sanitizeHTML(message, ['a'])} />
    );
  }
}

export function mapStateToProps(state) {
  return { lang: state.api.lang };
}

export default compose(
  connect(mapStateToProps),
  translate({ withRef: true }),
)(AddonCompatibilityErrorBase);
