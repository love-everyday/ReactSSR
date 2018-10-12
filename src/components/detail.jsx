import React from 'react';
import {connect} from 'react-redux';
import '../assets/css/detail.css'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    console.log('Detail created');
    
  }
  componentDidMount() {
    console.log('Detail componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }

  render() {
    const {filmDetail} = this.props;
    return (
      <div className="detail-container">
        <div className="detail-card">
          <div className="detail-head">
            <img src={filmDetail.albumDocInfo.albumHImage} className="detail-avatar" />
            <div className="detail-info">
              <div className="detail-title">{filmDetail.albumDocInfo.albumTitle}</div>
              <span className="detail-score">{filmDetail.albumDocInfo.score}</span>
              <div className="detail-region">{filmDetail.albumDocInfo.region}</div>
              <div className="detail-region">导演： {filmDetail.albumDocInfo.director}</div>
              <div className="detail-region">演员： {filmDetail.albumDocInfo.star}</div>
            </div>
          </div>
          <div style={{marginTop: 15}}>简介：{filmDetail.albumDocInfo.description}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { filmDetail } = state
  return {
    filmDetail
  }
}

export default connect(mapStateToProps)(Detail);