import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addUser } from '../actions/user'
import classnames from 'classnames'

const TextInput = ({ model, changeHandler, fld, placeHolder, error, fldType = "text" }) => {
  return (
    <div className={classnames('form-group', { 'has-error': !!error})}>
      <label className="col-sm-2 control-label">{placeHolder}</label>
      <div className="col-sm-6">
        <input className="form-control" key={fld} type={fldType} onChange={(e) => { changeHandler(e, fld) }} value={model[fld]} placeholder={placeHolder}/>
        {error ? <span className="error-msg col-sm-6"> {error} </span> : <span className="col-sm-6"><br /></span>}
      </div>
    </div>
  )
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitState(this.props.user)
    this.inputList = this.getInputList(this.state)
    this.handleChange = this.handleChange(this)
    this.handleSubmit = this.handleSubmit(this.props.handleAddUser, this)
  }

  getInitState = ({ userId, firstName, lastName, password, confirmPassword, email, errors }) => {
    return {
      userId: userId || '',
      firstName: firstName || '',
      lastName: lastName || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
      email: email || '',
      errors
    }
  }

  getInputList = (inputs) => {
    return Object.keys(inputs).reduce((list, key) => {
      switch(key) {
        case 'userId': return !(list[key] = { fld: key, placeHolder: 'User Id', fldType: 'text' }) || list
        case 'firstName': return !(list[key] = { fld: key, placeHolder: 'First Name', fldType: 'text' }) || list
        case 'lastName': return !(list[key] = { fld: key, placeHolder: 'Last Name', fldType: 'text' }) || list
        case 'password': return !(list[key] = { fld: key, placeHolder: 'Password', fldType: 'password' }) || list
        case 'confirmPassword': return !(list[key] = { fld: key, placeHolder: 'Cofirm Password', fldType: 'password' }) || list
        case 'email': return !(list[key] = { fld: key, placeHolder: 'Email', fldType: 'email' }) || list
        default: return list
      }
    }, {})
  }

  handleSubmit = (handleAddUser, comp) => (e) => {
    e.preventDefault()
    const errors = this.getValidation(comp.state, comp.inputList)
    if (errors) {
      comp.setState({ errors })
      return;
    }

    let user = { ...comp.state }
    delete user.confirmPassword
    handleAddUser(user)
  }

  handleChange = (comp) => (e, fld) => {
    let obj = {}
    obj[fld] = e.target.value
    comp.setState(obj)
  }

  getValidation = (state, inputList) => {
    return Object.keys(state).reduce((errors, fld) => {
      if (fld === 'errors') { return errors }
      if (!state[fld]) {
        errors[fld] = `${inputList[fld].placeHolder} can not be empty`
      }
      if (fld === 'password') {
        if (state[fld] !== state.confirmPassword) {
          errors[fld] = (errors[fld] ? '\n' : '') + `Password does not match with confirm password.`
        }
      }
      if (fld === 'confirmPassword') {
        if (state[fld] !== state.password) {
          errors[fld] = (errors[fld] ? '\n' : '') + `Password does not match with confirm password.`
        }
      }
      return errors
    }, {})
  }

  render() {
    return (
      <div className="col-sm-10">
        <legend>Sign Up Form</legend>
        <form className="form-horizontal col-sm-9">
          <fieldset>
              {Object.keys(this.inputList).map(key => {
                const item = this.inputList[key];
                const error = this.state.errors ? this.state.errors[key] :  null;
                return (
                  <TextInput key={item.fld}
                    model={this.state}
                    changeHandler={this.handleChange}
                    fld={item.fld}
                    placeHolder={item.placeHolder}
                    fldType={item.fldType}
                    error={error}/>
              )})}
              <div className="form-group">
                  <label className="col-sm-2 control-label"></label>
                  <div className="col-sm-2">
                    <button onClick={this.handleSubmit} className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user } )
const mapDispatchToProps = (dispatch) => ({ handleAddUser: (user) => { dispatch(addUser(user)) }})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
export default SignUpPage
