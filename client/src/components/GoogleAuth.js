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

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>;
        }

        if (this.state.isSignedIn) {
            return <div>I'm signed in</div>;
        }

        return <div>I'm not signed in</div>;
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;
