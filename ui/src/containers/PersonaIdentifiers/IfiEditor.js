import React, { PropTypes } from 'react';
import { compose, setPropTypes } from 'recompose';
import IfiAccountEditor from './IfiAccountEditor';
import IfiValueEditor from './IfiValueEditor';

const enhanceIfiEditor = compose(
  setPropTypes({
    identifierType: PropTypes.oneOf(['mbox', 'mbox_sha1sum', 'openid', 'account']).isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
);

const renderIfiEditor = ({ identifierType, value, onChange }) => {
  return (identifierType === 'account'
    ? (
      <IfiAccountEditor value={value} onChange={onChange} />
    )
    : (
      <IfiValueEditor value={value} onChange={onChange} />
    )
  );
};

export default enhanceIfiEditor(renderIfiEditor);
