import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import Spinner from '../common/Spinner'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import commentBox from 'commentbox.io'

class Post extends Component {
  static propTypes = {
      getPost: PropTypes.func.isRequired,
      post: PropTypes.object.isRequired
  }

    componentDidMount() {
        const { id } = this.props.match.params; 

        this.props.getPost(id); 

        this.removeCommentBox = commentBox('5698169736265728-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

  render() {

    const { post, loading } = this.props.post;
    let postContent; 

    if (post === null || loading || Object.keys(post).length === 0) {
        postContent = (<Spinner />)
    } else {
        postContent = ( 
            <div>
                <PostItem post={post} showActions={false} />
            </div>
        );
    }

    return (
      <div className="post">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/feed" className="btn btn-light mb-3">
                        Back To Feed
                    </Link>
                    { postContent }
                    <div className="commentbox" />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

const mapDispatchToProps = {
    getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
