import * as React from 'react';
import { connect } from 'react-redux';
import { authorization } from '../../actions/index';

interface IProps {
    authorization?: any;
}

interface IState {
    mounted: boolean;
    username: string;
    password: string;

}

const mapDispatchToProps = {authorization};



@(connect(null, mapDispatchToProps) as any)
export default class Login extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            mounted: false,
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.FormSubmit = this.FormSubmit.bind(this);
    }

    public FormSubmit(e: any){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    public handleChange(event: any): void {
        this.setState({[event.target.name]: event.target.value});
    }

    public render() {
        return(<div>
            <h1>Login Page</h1>
            <form onSubmit={this.FormSubmit}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" className="btn" value="Submit!" />
            </form>
        </div>);

    }
}