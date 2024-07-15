import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component{
    state = {hasError: false};
    static getDerivedStateFromError(){
        return {hasError: true}
    }
    componentDidCatch(error, info){
        // typically you would log this to something like TrackJs or NewRelic
        console.error("ErrorBoundary component caught an error",error, info);
    }
    render(){
        if(this.state.hasError){
            // we can use a reusable component
            return (
                <h2>
                    There was an error with this page. 
                    <Link to="/">Click Here to go back to the home page</Link>
                </h2>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;