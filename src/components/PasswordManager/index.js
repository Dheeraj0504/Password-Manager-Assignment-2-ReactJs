import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    // console.log(event.target.value)
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {inputWebsite, inputUsername, inputPassword} = this.state
    if (inputWebsite !== '' && inputUsername !== '' && inputPassword !== '') {
      const passwordDetails = {
        id: uuidv4(),
        website: inputWebsite,
        username: inputUsername,
        password: inputPassword,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, passwordDetails],
        inputWebsite: '',
        inputUsername: '',
        inputPassword: '',
      }))
    }
  }

  onChangePasswordView = () => {
    // console.log('Password Shown')
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const updatedPasswords = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: updatedPasswords})
  }

  getPasswordsList = () => {
    const {passwordsList, searchInput} = this.state
    const filteredPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return filteredPasswordsList
  }

  render() {
    // return <h1>Hello World</h1>
    const {inputWebsite, inputUsername, inputPassword, showPasswords} =
      this.state
    const updatedPasswordsList = this.getPasswordsList()
    const passwordsCount = updatedPasswordsList.length
    return (
      <div className="password-manager-bg-container">
        <div className="app-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="top-section-container">
            <img
              className="password-manager-image-sm"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              className="password-manager-image-lg"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
            <form
              className="add-new-password-container"
              onSubmit={this.onAddPassword}
            >
              <h1 className="add-password-heading">Add New Password</h1>
              <div className="input-website-container">
                <div className="input-logo-container">
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <div className="input-element-container">
                  <input
                    className="input-element"
                    type="text"
                    placeholder="Enter Website"
                    value={inputWebsite}
                    onChange={this.onChangeWebsite}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-logo-container">
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </div>
                <div className="input-element-container">
                  <input
                    className="input-element"
                    type="text"
                    placeholder="Enter Username"
                    value={inputUsername}
                    onChange={this.onChangeUsername}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-logo-container">
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <div className="input-element-container">
                  <input
                    className="input-element"
                    type="password"
                    placeholder="Enter Password"
                    value={inputPassword}
                    onChange={this.onChangePassword}
                  />
                </div>
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="bottom-section-container">
            <div className="header-section">
              <div className="counter-section">
                <h1 className="your-password">Your Passwords</h1>
                <div className="counter">
                  <p className="count">{passwordsCount}</p>
                </div>
              </div>
              <div className="input-search-container">
                <div className="search-container">
                  <img
                    className="search-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <div className="input-element-container">
                  <input
                    type="search"
                    placeholder="Search"
                    className="input-element"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="toggle-view">
              <input
                id="checkBox"
                type="checkbox"
                className="check-box"
                value={showPasswords}
                onChange={this.onChangePasswordView}
              />
              <label htmlFor="checkBox" className="show-password">
                Show Passwords
              </label>
            </div>
            {updatedPasswordsList.length === 0 ? (
              <div className="no-passwords-container">
                <img
                  className="no-passwords-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list">
                {updatedPasswordsList.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    showStatus={showPasswords}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
