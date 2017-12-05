import React, { PropTypes } from 'react';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose, setPropTypes, withState } from 'recompose';
import SaveIconButton from 'ui/components/IconButton/SaveIconButton';
import DeleteIconButton from 'ui/components/IconButton/DeleteIconButton';
import styles from './styles.css';

const enhanceNewAttribute = compose(
  setPropTypes({
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }),
  withState('attributeKey', 'setAttributeKey', ''),
  withState('attributeValue', 'setAttributeValue', ''),
  withStyles(styles)
);

const renderNewAttribute = ({
  attributeKey,
  attributeValue,
  setAttributeKey,
  setAttributeValue,
  onAdd,
  onCancel,
}) => {
  let keyRef = null;
  const handleSave = () => {
    keyRef.focus();
    onAdd(attributeKey, attributeValue);
    setAttributeKey('');
    setAttributeValue('');
  };
  const handleEnterSave = (e) => {
    if (e.keyCode === 13) {
      handleSave();
    }
  };
  return (
    <tr>
      <td className={styles.td}>
        <input
          value={attributeKey}
          onChange={(e) => setAttributeKey(e.target.value)}
          placeholder="Attribute Name"
          className={classNames(styles.input, 'form-control')}
          onKeyDown={handleEnterSave}
          ref={(input) => {
            keyRef = input;
          }} />
      </td>
      <td className={styles.td}>
        <input
          value={attributeValue}
          onChange={(e) => setAttributeValue(e.target.value)}
          onKeyDown={handleEnterSave}
          placeholder="Attribute Value"
          className={classNames(styles.input, 'form-control')} />
      </td>
      <td className={classNames(styles.td, styles.actions)}>
        <SaveIconButton onClick={handleSave} />
        <DeleteIconButton onClick={onCancel} />
      </td>
    </tr>
  );
};

export default enhanceNewAttribute(renderNewAttribute);