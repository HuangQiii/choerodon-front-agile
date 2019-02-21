/* eslint-disable camelcase */
import React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import ScrumBoardStore from '../../../../../stores/project/scrumBoard/ScrumBoardStore';
import ColumnCouldDragOn from './ColumnCouldDragOn';

@observer
export default class ColumnProvider extends React.Component {
  getColumn(columnObj) {
    const {
      children, column_status_RelationMap, className, keyId,
    } = this.props;
    const subStatusArr = column_status_RelationMap.get(columnObj.columnId);
    return (
      <React.Fragment>
        <ColumnCouldDragOn keyId={keyId} dragOn={ScrumBoardStore.getCurrentDrag === keyId} />
        <div
          key={columnObj.columnId}
          className={className}
        >
          {children(subStatusArr, columnObj.columnId)}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { columnStructure, column_status_RelationMap } = this.props;
    return columnStructure.filter(column => column_status_RelationMap.get(column.columnId).length > 0).map(column => this.getColumn(column));
  }
}
