/**
 * 列状态
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import ScrumBoardStore from '../../../../../stores/project/scrumBoard/ScrumBoardStore';
import StatusIssue from '../StatusIssue/StatusIssue';
import './StatusBodyColumn.scss';

@inject('AppState')
@observer
class StatusBodyColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  renderIssues(subStatuse, clickItem) {
    const {
      issues,
      id: droppableId,
      name: statusName,
      categoryCode,
      completed: isCompleted,
      statusId,
    } = subStatuse;
    let data = issues;
    data = _.orderBy(data, ['rank'], 'desc');
    // data = _.sortBy(data, o => o.rank);
    const result = [];
    const parentIds = [];
    if (ScrumBoardStore.getSwimLaneCode === 'parent_child') {
      for (let index = 0, len = ScrumBoardStore.getParentIds.length; index < len; index += 1) {
        parentIds.push(ScrumBoardStore.getParentIds[index].issueId);
      }
      if (!this.props.parentId) {
        //
        for (let index = 0, len = data.length; index < len; index += 1) {
          if (!data[index].parentIssueId) {
            if (_.indexOf(parentIds, data[index].issueId) === -1) {
              result.push(
                <StatusIssue
                  key={data[index].issueId}
                  data={data[index]}
                  index={index}
                  droppableId={droppableId}
                  statusName={statusName}
                  categoryCode={categoryCode}
                  isCompleted={isCompleted}
                  statusData={this.props.data.subStatuses}
                  renderIssues={this.renderIssues.bind(this)}
                  ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
                  parentsIds={ScrumBoardStore.getParentIds}
                  epicDatas={ScrumBoardStore.getEpicData}
                  dragStartData={ScrumBoardStore.getDragStartItem}
                  swimLaneCode={ScrumBoardStore.getSwimLaneCode}
                  statusId={statusId}
                />,
              );
            }
          }
        }
      } else {
        for (let index = 0, len = data.length; index < len; index += 1) {
          if (data[index].parentIssueId === this.props.parentId) {
            result.push(
              <StatusIssue
                key={data[index].issueId}
                data={data[index]}
                index={index}
                droppableId={droppableId}
                statusName={statusName}
                categoryCode={categoryCode}
                isCompleted={isCompleted}
                statusData={this.props.data.subStatuses}
                renderIssues={this.renderIssues.bind(this)}
                ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
                parentsIds={ScrumBoardStore.getParentIds}
                epicDatas={ScrumBoardStore.getEpicData}
                dragStartData={ScrumBoardStore.getDragStartItem}
                swimLaneCode={ScrumBoardStore.getSwimLaneCode}
                statusId={statusId}
              />,
            );
          }
        }
      }
    } else if (ScrumBoardStore.getSwimLaneCode === 'assignee') {
      if (this.props.assigneeId) {
        for (let index = 0, len = data.length; index < len; index += 1) {
          if (data[index].assigneeId) {
            if (data[index].assigneeId === this.props.assigneeId) {
              result.push(
                <StatusIssue
                  key={data[index].issueId}
                  data={data[index]}
                  index={index}
                  droppableId={droppableId}
                  statusName={statusName}
                  categoryCode={categoryCode}
                  isCompleted={isCompleted}
                  statusData={this.props.data.subStatuses}
                  renderIssues={this.renderIssues.bind(this)}
                  ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
                  parentsIds={ScrumBoardStore.getParentIds}
                  epicDatas={ScrumBoardStore.getEpicData}
                  dragStartData={ScrumBoardStore.getDragStartItem}
                  swimLaneCode={ScrumBoardStore.getSwimLaneCode}
                  statusId={statusId}
                />,
              );
            }
          }
        }
      } else {
        for (let index = 0, len = data.length; index < len; index += 1) {
          if (!data[index].assigneeId) {
            result.push(
              <StatusIssue
                key={data[index].issueId}
                data={data[index]}
                index={index}
                droppableId={droppableId}
                statusName={statusName}
                categoryCode={categoryCode}
                isCompleted={isCompleted}
                statusData={this.props.data.subStatuses}
                renderIssues={this.renderIssues.bind(this)}
                ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
                parentsIds={ScrumBoardStore.getParentIds}
                epicDatas={ScrumBoardStore.getEpicData}
                dragStartData={ScrumBoardStore.getDragStartItem}
                swimLaneCode={ScrumBoardStore.getSwimLaneCode}
                statusId={statusId}
              />,
            );
          }
        }
      }
    } else if (ScrumBoardStore.getSwimLaneCode === 'swimlane_epic') {
      if (this.props.epicId) {
        for (let index = 0, len = data.length; index < len; index += 1) {
          if (data[index].epicId) {
            if (data[index].epicId === this.props.epicId) {
              result.push(
                <StatusIssue
                  key={data[index].issueId}
                  data={data[index]}
                  index={index}
                  droppableId={droppableId}
                  statusName={statusName}
                  categoryCode={categoryCode}
                  isCompleted={isCompleted}
                  statusData={this.props.data.subStatuses}
                  renderIssues={this.renderIssues.bind(this)}
                  ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
                  parentsIds={ScrumBoardStore.getParentIds}
                  epicDatas={ScrumBoardStore.getEpicData}
                  dragStartData={ScrumBoardStore.getDragStartItem}
                  swimLaneCode={ScrumBoardStore.getSwimLaneCode}
                  statusId={statusId}
                />,
              );
            }
          }
        }
      } else {
        for (let index = 0, len = data.length; index < len; index += 1) {
          if (!data[index].epicId) {
            result.push(
              <StatusIssue
                key={data[index].issueId}
                data={data[index]}
                index={index}
                droppableId={droppableId}
                statusName={statusName}
                categoryCode={categoryCode}
                isCompleted={isCompleted}
                statusData={this.props.data.subStatuses}
                renderIssues={this.renderIssues.bind(this)}
                ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
                parentsIds={ScrumBoardStore.getParentIds}
                epicDatas={ScrumBoardStore.getEpicData}
                dragStartData={ScrumBoardStore.getDragStartItem}
                swimLaneCode={ScrumBoardStore.getSwimLaneCode}
                statusId={statusId}
              />,
            );
          }
        }
      }
    } else {
      for (let index = 0, len = data.length; index < len; index += 1) {
        result.push(
          <StatusIssue
            key={data[index].issueId}
            data={data[index]}
            index={index}
            droppableId={droppableId}
            statusName={statusName}
            categoryCode={categoryCode}
            isCompleted={isCompleted}
            statusData={this.props.data.subStatuses}
            renderIssues={this.renderIssues.bind(this)}
            ifClickMe={String(clickItem.issueId) === String(data[index].issueId)}
            parentsIds={ScrumBoardStore.getParentIds}
            epicDatas={ScrumBoardStore.getEpicData}
            dragStartData={ScrumBoardStore.getDragStartItem}
            swimLaneCode={ScrumBoardStore.getSwimLaneCode}
            statusId={statusId}
          />,
        );
      }
    }
    return result;
  }

  /**
   *每个droppable背景色渲染
   *
   * @param {*} isDraggingOver
   * @returns
   * @memberof StatusBodyColumn
   */
  renderBackground(isDraggingOver) {
    // 如果拖动过这个drop
    if (isDraggingOver) {
      return 'rgba(26,177,111,0.08)';
    } else if (
      JSON.stringify(ScrumBoardStore.getDragStartItem) !== '{}') {
      // 如果开始拖动 并且拖动的issue在当前source里
      if (ScrumBoardStore.getSwimLaneCode === 'parent_child') {
        if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).parentId) === 
        String(this.props.source)
        ) {
          return 'rgba(140,158,255,0.12)';
        } else {
          return 'rgba(0, 0, 0, 0.04)';
        }
      } else if (ScrumBoardStore.getSwimLaneCode === 'assignee') {
        if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).assigneeId) === 
        String(this.props.assigneeId)
        ) {
          return 'rgba(140,158,255,0.12)';
        } else {
          return 'rgba(0, 0, 0, 0.04)';
        }
      } else if (ScrumBoardStore.getSwimLaneCode === 'swimlane_epic') {
        if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).epicId) === 
        String(this.props.epicId)
        ) {
          return 'rgba(140,158,255,0.12)';
        } else {
          return 'rgba(0, 0, 0, 0.04)';
        }
      } else {
        // if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).assigneeId)
        return 'rgba(140,158,255,0.12)';
      }
    } else {
      return 'rgba(0, 0, 0, 0.04)';
    }
  }

  // 这里是拖动issue 不会显示同一列的其他状态drop
  renderDisplay(item, type) {
    const data = ScrumBoardStore.getDragStartItem;
    // 如果没有开始拖动 则都显示
    if (JSON.stringify(data) === '{}') {
      if (type === 'visibility') {
        return 'visible';
      } else {
        return '100%';
      }
    } else {
      const dropCode = JSON.parse(data.source.droppableId).code;
      const currentStatusList = [];
      for (let index = 0, len = this.props.data.subStatuses.length; index < len; index += 1) {
        currentStatusList.push(this.props.data.subStatuses[index].id);
      }
      let flag = 0;
      if (_.indexOf(currentStatusList, dropCode) !== -1) {
        // 如果当前列的状态包含拖动卡片的状态列
        if (item.id !== dropCode) {
          // 并且当前状态列的id不等于拖动时的状态列id
          if (this.props.source) {
            if (String(JSON.parse(data.source.droppableId).parentId) === String(this.props.source)) {
              flag = 1;
            }
          } else if (this.props.assigneeId) {
            if (String(JSON.parse(data.source.droppableId).assigneeId) === String(this.props.assigneeId)) {
              flag = 1;
            }
          } else if (this.props.epicId) {
            if (String(JSON.parse(data.source.droppableId).epicId) === String(this.props.epicId)) {
              flag = 1;
            }
          } else if (!JSON.parse(data.source.droppableId).hasOwnProperty('parentId') && !JSON.parse(data.source.droppableId).hasOwnProperty('assigneeId') && !JSON.parse(data.source.droppableId).hasOwnProperty('epicId')) {
            flag = 1;
          }
        }
      }
      if (flag === 1) {
        if (type === 'visibility') {
          return 'hidden';
        } else {
          return 0;
        }
      } else if (type === 'visibility') {
        return 'visible';
      } else {
        return '100%';
      }
    }
  }

  /**
   *droppable的边框渲染逻辑
   *
   * @param {*} data
   * @param {*} index
   * @param {*} position
   * @param {*} drag
   * @returns
   * @memberof StatusBodyColumn
   */
  renderBorder(data, index, position, drag) {
    if (ScrumBoardStore.getSwimLaneCode === 'parent_child') {
      if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).parentId) === 
      String(this.props.source)) {
        // 如果在同一个泳道
        if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).columnId) !== 
        String(this.props.data.columnId)) {
          let flag = 0;
          // 如果不在同一列
          if (data.length === 1) {
            // 如果只有一个状态
            if (drag) {
              return '2px dashed #1AB16F';
            } else {
              return '2px dashed #26348B';
            }
          } else {
            // 如果有多个状态
            if (index > 0) {
              if (position === 'top') {
                // 如果当前状态不是第一个 并且是top border
                flag = 1;
              }
            }
            if (flag === 1) {
              return 'unset';
            } else if (drag) {
              return '2px dashed #1AB16F';
            } else {
              return '2px dashed #26348B';
            }
          }
        } else if (drag) {
          return '2px dashed #1AB16F';
        } else {
          return '2px dashed #26348B';
        }
      } else {
        return 'unset';
      }
    } else if (ScrumBoardStore.getSwimLaneCode === 'assignee') {
      if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).assigneeId) === 
      String(this.props.assigneeId)) {
        // 如果在同一个泳道
        if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).columnId) !== 
        String(this.props.data.columnId)) {
          let flag = 0;
          // 如果不在同一列
          if (data.length === 1) {
            // 如果只有一个状态
            if (drag) {
              return '2px dashed #1AB16F';
            } else {
              return '2px dashed #26348B';
            }
          } else {
            // 如果有多个状态
            if (index > 0) {
              if (position === 'top') {
                // 如果当前状态不是第一个 并且是top border
                flag = 1;
              }
            }
            if (flag === 1) {
              return 'unset';
            } else if (drag) {
              return '2px dashed #1AB16F';
            } else {
              return '2px dashed #26348B';
            }
          }
        } else if (drag) {
          return '2px dashed #1AB16F';
        } else {
          return '2px dashed #26348B';
        }
      } else {
        return 'unset';
      }
    } else if (ScrumBoardStore.getSwimLaneCode === 'swimlane_epic') {
      if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).epicId) === 
      String(this.props.epicId)) {
        // 如果在同一个泳道
        if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).columnId) !== 
        String(this.props.data.columnId)) {
          let flag = 0;
          // 如果不在同一列
          if (data.length === 1) {
            // 如果只有一个状态
            if (drag) {
              return '2px dashed #1AB16F';
            } else {
              return '2px dashed #26348B';
            }
          } else {
            // 如果有多个状态
            if (index > 0) {
              if (position === 'top') {
                // 如果当前状态不是第一个 并且是top border
                flag = 1;
              }
            }
            if (flag === 1) {
              return 'unset';
            } else if (drag) {
              return '2px dashed #1AB16F';
            } else {
              return '2px dashed #26348B';
            }
          }
        } else if (drag) {
          return '2px dashed #1AB16F';
        } else {
          return '2px dashed #26348B';
        }
      } else {
        return 'unset';
      }
    }
    if (drag) {
      return '2px dashed #1AB16F';
    } else {
      return '2px dashed #26348B';
    }
  }

  /**
   *是否显示状态名称
   *
   * @param {*} dragStartData
   * @param {*} data
   * @returns
   * @memberof StatusBodyColumn
   */
  renderStatusDisplay(dragStartData, data) {
    if (JSON.stringify(dragStartData) !== '{}') {
      let flag = 0;
      if (data.length > 1) {
        if (this.props.source) {
          if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).parentId) === String(this.props.source)) {
            flag = 1;
          }
        } else if (this.props.assigneeId) {
          if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).assigneeId) === String(this.props.assigneeId)) {
            flag = 1;
          }
        } else if (this.props.epicId) {
          if (String(JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).epicId) === String(this.props.epicId)) {
            flag = 1;
          }
        } else if (!JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).hasOwnProperty('parentId') && !JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).hasOwnProperty('assigneeId') && !JSON.parse(ScrumBoardStore.getDragStartItem.source.droppableId).hasOwnProperty('epicId')) {
          flag = 1;
        }
      }
      if (flag === 0) {
        return 'none';
      } else {
        return 'flex';
      }
    } else {
      return 'none';
    }
  }

  /**
   *渲染列
   *
   * @returns
   * @memberof StatusBodyColumn
   */
  renderStatusColumn(clickItem) {
    const dragStartData = ScrumBoardStore.getDragStartItem;
    const {
      data,
      source,
      assigneeId,
      epicId,
    } = this.props;
    const { subStatuses, categoryCode, columnId } = data;
    const result = [];
    for (let index = 0, len = subStatuses.length; index < len; index += 1) {
      result.push(
        <Droppable
          key={subStatuses[index].id}
          droppableId={
            JSON.stringify({
              columnId,
              endStatusId: subStatuses[index].statusId,
              parentId: source,
              assigneeId,
              epicId,
              categoryCode,
            })
          }
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                background: this.renderBackground(snapshot.isDraggingOver),
                padding: 'grid',
                borderTop: JSON.stringify(dragStartData) === '{}'
                  ? 'unset' : this.renderBorder(subStatuses, index, 'top', snapshot.isDraggingOver),
                borderLeft: JSON.stringify(dragStartData) === '{}'
                  ? 'unset' : this.renderBorder(subStatuses, index, 'left', snapshot.isDraggingOver),
                borderRight: JSON.stringify(dragStartData) === '{}'
                  ? 'unset' : this.renderBorder(subStatuses, index, 'right', snapshot.isDraggingOver),
                borderBottom: JSON.stringify(dragStartData) === '{}'
                  ? 'unset' : this.renderBorder(subStatuses, index, 'bottom', snapshot.isDraggingOver),
                visibility: this.renderDisplay(subStatuses[index], 'visibility'),
                height: '100%',
                position: 'relative',
              }}
            >
              <p
                style={{
                  display: this.renderStatusDisplay(dragStartData, subStatuses),
                  fontSize: '18px',
                  color: 'rgb(38, 52, 139)',
                  lineHeight: '26px',
                }}
              >
                {subStatuses[index].name}
              </p>
              <div className="c7n-itemBodyColumn" style={{ minHeight: 83 }}>
                {this.renderIssues(
                  subStatuses[index],
                  clickItem,
                )}
              </div>
            </div>
          )}
        </Droppable>,
      );
    }
    return result;
  }

  render() {
    const clickItem = ScrumBoardStore.getClickIssueDetail;
    return (
      <div className="c7n-scrumboard-statusBody">
        {this.renderStatusColumn(clickItem)}
      </div>
    );
  }
}

export default StatusBodyColumn;

