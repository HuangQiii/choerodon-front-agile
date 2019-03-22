import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import EmptyBacklog from '../../../../../../assets/image/emptyBacklog.svg';
import BacklogStore from "../../../../../../stores/project/backlog/BacklogStore";

@inject('AppState')
@observer class NoneBacklog extends Component {
  render() {
    return BacklogStore.hasFilter ? (
      <div className="c7n-noissue-wapper">
        <div className="c7n-noissue-notzero">在 Backlog 中所有问题已筛选</div>
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '42px 0 45px 0',
        }}
      >
        <img style={{ width: 172 }} alt="emptybacklog" src={EmptyBacklog} />
        <div style={{ marginLeft: 40 }}>
          <p style={{ color: 'rgba(0,0,0,0.65)' }}>用问题填充您的待办事项</p>
          <p style={{ fontSize: 16, lineHeight: '28px', marginTop: 8 }}>
            {'这是您的团队待办事项。创建并预估新的问题，并通'}
            <br />
            {'过上下拖动来对待办事项排优先级'}
          </p>
        </div>
      </div>
    );
  }
}

export default NoneBacklog;