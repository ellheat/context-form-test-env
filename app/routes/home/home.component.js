import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
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

  writeSomething = () => console.log('writeSomething');

  render() {
    return (
      <Container>
        <Helmet title="Homepage" />

        <FormProvider>
          <Field name="simpleField" component="input" />
        </FormProvider>
      </Container>
    );
  }
}
