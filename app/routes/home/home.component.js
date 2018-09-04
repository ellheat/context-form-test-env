import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import validate from 'validate.js';
import { FormProvider, Field } from 'context-form/src/main'; //eslint-disable-line

import { Container } from './home.styles';

export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.fetchMaintainers(this.props.language);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.props.fetchMaintainers(this.props.language);
    }
  }

  validate = (values) => {
    const constraints = {
      simpleField: {
        presence: {
          allowEmpty: false,
        },
      },
    };

    return validate(values, constraints);
  };

  handleChange = input => (e) => {
    input.onChange(e.target.value);
  };

  handleSubmit = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  renderTextField = ({ input, error, touched, active, dirty }) => {
    return (
      <Fragment>
        <input {...input} onChange={this.handleChange(input)} />
        <p>{error && error.length ? error[0] : null}</p>
        <p>touched: {`${touched}`}</p>
        <p>active: {`${active}`}</p>
        <p>dirty: {`${dirty}`}</p>
      </Fragment>
    );
  };

  renderForm = ({ handleSubmit, isSubmitting }) => {
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="simpleField"
          component={this.renderTextField}
        />
        { isSubmitting ? 'isSubmitting' : null }
      </form>
    );
  };

  render() {
    return (
      <Container>
        <Helmet title="Homepage" />
        <FormProvider component={this.renderForm} validate={this.validate} />
      </Container>
    );
  }
}
