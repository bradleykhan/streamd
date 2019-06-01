import React from "react";
import clientId from "./google-client-id";

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: clientId,
                    scope: "email"
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();

                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });

                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

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
        if (this.state.isSignedIn === null) {
            return null;
        }

        return this.renderButton(this.state.isSignedIn);
    }

    render() {
        return <div>{this.getAuthButton()}</div>;
    }
}

export default GoogleAuth;
