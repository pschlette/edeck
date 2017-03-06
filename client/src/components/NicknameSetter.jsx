// @flow
import React from 'react';

type nicknameSetterProps = {
  currentNickname: ?string,
  onSaveNickname: (newNickname: ?string) => void
};

type nicknameSetterState = {
  newNickname: ?string
};

export default class NicknameSetter extends React.Component {
  state: nicknameSetterState = {
    newNickname: this.props.currentNickname,
  }

  props: nicknameSetterProps

  handleUpdateNickname = (event: any) => {
    this.setState({ newNickname: event.target.value });
  }

  handleSaveNickname = () => {
    this.props.onSaveNickname(this.state.newNickname || null);
  }

  render() {
    const { newNickname } = this.state;
    const { currentNickname } = this.props;

    return (
      <div className="row">
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            value={newNickname === null ? (currentNickname || '') : newNickname}
            placeholder="No nickname set"
            onChange={this.handleUpdateNickname}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            disabled={newNickname === currentNickname}
            onClick={this.handleSaveNickname}
          >
            Set
          </button>
        </div>
      </div>
    );
  }
}
