import "../App.css";

import { FormComponent } from "../components/Form";

function StartPage() {
    return (
        <div className="App">
            <div id="wrapper" className="container">
                <div id="center_col">
                    <FormComponent />
                </div>
            </div>
        </div>
    );
}

export default StartPage;
