import React, { Component } from 'react';

const FormContext = React.createContext();
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  render() {
    return (
      <FormContext.Provider value={{
        data: this.state.data, /* объект со всеми данными формы */
        /* функция, которая будет вызвана в onChange инпутов, которая поменяет состояние Form */
        onChangeField: (name, value) => {
          this.setState({
            ...this.state.data,
            name: value,
          });
        },
      }}
      >
        <div>
          <span id="result">{JSON.stringify(this.state.data)}</span>
          {this.props.children}
        </div>
      </FormContext.Provider>
    );
  }
}

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  _handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    return (
      <FormContext.Consumer>
        {
          (data) => (
            <>
              <div>
                <input
                  type="text"
                  name={this.props.name}
                  value={this.state.value}
                  onChange={(e) => { this._handleChange(e), data.onChangeField(this.props.name, e.target.value); }}
                />
              </div>
            </>
          )
        }
      </FormContext.Consumer>

    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Form onChange={(data) => console.log('FormData: ', data)}>
        <Field name="firstName" />
        <Field name="lastName" />
      </Form>
    );
  }
}
