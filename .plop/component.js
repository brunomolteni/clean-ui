import React from 'react'
import PropTypes from 'prop-types'
if(process.env.WEBPACK) require('./{{ properCase name }}.scss');

const {{ properCase name }} = props => {
  let classes = ["{{ properCase name }}"];
  if(props.variant)  classes.push('--variant');
  return (
    <div className={classes.join(' ')}>{props.children}</div>
)};
{{ properCase name }}.displayName = '{{ properCase name }}';
{{ properCase name }}.propTypes = {
  variant: PropTypes.bool
}
{{ properCase name }}.defaultProps = {
  variant: false
}

export default {{ properCase name }}
