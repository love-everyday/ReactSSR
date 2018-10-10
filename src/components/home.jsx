import React from 'react';
import {connect} from 'react-redux';
import { List } from "antd";

// import List from 'antd/lib/list';
// import 'antd/lib/list/style/css';
import './home.css'


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
        <List
          className="home-card"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<img src={item.albumDocInfo.albumHImage} className="home-avatar" />}
                title={<a href={"/detail/" + item.albumDocInfo.albumId} >{item.albumDocInfo.albumTitle}</a>}
                description={item.albumDocInfo.description}
              />
            </List.Item>
            
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { data } = state
  return {
    data
  }
}

export default connect(mapStateToProps)(Home);