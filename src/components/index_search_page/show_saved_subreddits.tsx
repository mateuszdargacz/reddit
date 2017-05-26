import * as React from 'react';
import {connect} from 'react-redux';
import { removeSubreddit } from '../../actions/searching_page';

interface IProps {
  removeSubreddit?: any;
  dispatch?: any;
  savedSubreddits?: ISubreddit[];
}

interface ISubreddit {
  data: any;
  kind: string;
}

interface ISubreddits {
  data: Object;
}


interface IState {
}

const mapStateToProps = (state: any): IProps => {
  return {
    savedSubreddits: state.subreddits.savedSubreddits,
  };
};

const mapDispatchToProps = { removeSubreddit };


@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class showSavedSubreddits extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {

    };

  }

  public componentDidMount() {
    const {
      removeSubreddit
    } = this.props;
  }

  private removeSubredditOnClick = (subreddit: any ) => {
    return (e: any) => {
      this.props.removeSubreddit(subreddit);
    };

  };


  private renderSubreddit = (subreddit: any, index: number) => {
    return (

      <div className="custom-list row search-panel pall col-xs-2" key={subreddit.id}>
        <div className="row">
          <div className="col-xs-10">{subreddit.display_name_prefixed}</div>
          <button type="button" className="btn-xs btn-primary text-right" onClick={this.removeSubredditOnClick(subreddit)}>o</button>
        </div>
      </div>
    );
  };


  public render() {

    console.log(this.props.savedSubreddits);
    return (
      <div className="container-fluid">
        {this.props.savedSubreddits &&
        this.props.savedSubreddits.map((subreddit: any, index: number) => {
          return this.renderSubreddit(subreddit, index);
        })
        }
      </div>
    );
  }
}
