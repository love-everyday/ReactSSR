import React from 'react';
import {connect} from 'react-redux';
// import { List } from "antd";

// import List from 'antd/lib/list';
// import 'antd/lib/list/style/css';
import '../../public/css/home.css'


class Home extends React.Component {
  componentDidMount() {
    console.log('Home componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }

  render() {
    const {data} = this.props;
    return (
      <div className="home-container">
        <div className="home-card">
          {data && data.map((item, index) => {
            return (
              <div key={index}>
                {(index > 0) && <div className="home-divider"></div>}
                <div className="home-item">
                  <img src={item.albumDocInfo.albumHImage} className="home-avatar" />
                  <div className="home-info">
                    <a className="home-title" href={"/detail/" + item.albumDocInfo.albumId}>{item.albumDocInfo.albumTitle}</a>
                    <div className="home-des">{item.albumDocInfo.description}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

/*
<List
  className="home-card"
  itemLayout="horizontal"
  dataSource={data}
  renderItem={item => (
    <List.Item>
      <List.Item.Meta
        avatar={}
        title={<a href={"/detail/" + item.albumDocInfo.albumId} >{item.albumDocInfo.albumTitle}</a>}
        description={item.albumDocInfo.description}
      />
    </List.Item>
    
  )}
/>
*/

const mapStateToProps = (state) => {
  const { data } = state
  return {
    data
  }
}

export default connect(mapStateToProps)(Home);