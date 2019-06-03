import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";
import clientId from "./google-client-id";

class GoogleAuth extends React.Component {
    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: clientId,
                    scope: "email"
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();

                    this.onAuthChange(this.auth.isSignedIn.get());

                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderButton(isSignedIn) {
        let buttonClassName, buttonText, onClickHandler;

        if (isSignedIn) {
            buttonClassName = "ui red google button";
            buttonText = "Sign Out";
            onClickHandler = this.onSignOutClick;
        } else {
            buttonClassName = "ui green google button";
            buttonText = "Sign in with Google";
            onClickHandler = this.onSignInClick;
        }

        return (
            <button className={buttonClassName} onClick={onClickHandler}>
                <i className="google icon" />
                {buttonText}
            </button>
        );
    }

    getAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }

        return this.renderButton(this.props.isSignedIn);
    }

    render() {
        return <div>{this.getAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);
