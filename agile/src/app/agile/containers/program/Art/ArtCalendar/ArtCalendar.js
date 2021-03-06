import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page, Header, Content } from 'choerodon-front-boot';
import { find } from 'lodash';
import { Progress, Spin } from 'choerodon-ui';
import moment from 'moment';
import { artListLink, getParams } from '../../../../common/utils';
import { getArtCalendar, getArtsByProjectId } from '../../../../api/ArtApi';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import './ArtCalendar.scss';
import emptyART from '../../../../assets/image/emptyART.svg';
import EmptyBlock from '../../../../components/EmptyBlock';

class ArtCalendar extends Component {
  state = {
    ArtList: [],
    ArtName: null,
    data: null,
    currentPI: null,
    startDate: null,
    endDate: null,
    loading: true,
  }

  componentDidMount() {
    this.loadArt();
  }

  loadArt = () => {
    this.setState({
      loading: true,
    });
    getArtsByProjectId().then((artList) => {
      this.setState({
        ArtList: artList.content.filter(item => item.enabled && item.statusCode === 'doing'),
      }, () => {
        const { ArtList } = this.state;
        if (ArtList[0]) {
          getArtCalendar(ArtList[0].id).then((res) => {
            this.setState({
              loading: false,
            });
            const data = res;
            const { startDate, endDate } = this.getDuring(data);
            this.setState({
              data,
              ArtName: ArtList[0].name,
              currentPI: find(data, { statusCode: 'doing' }),
              startDate,
              endDate,
            });
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    });
  }

  getDuring = (data) => {
    const startDate = data.length > 0 ? data[0].startDate : moment();
    const endDate = data.length > 0 ? data[data.length - 1].endDate : moment().add(1, 'days');
    return {
      startDate,
      endDate,
    };
  }

  render() {
    const {
      data, startDate, 
      currentPI, ArtName,
      endDate,
      ArtList,
      loading,
    } = this.state;
    return (
      <Page className="c7nagile-ArtCalendar">
        <Header
          title="ART日历"
        />
        <Content>
          <Spin spinning={loading}>
            {
              ArtList && ArtList.length > 0 && data ? (
                <div style={{
                  display: 'flex', flexDirection: 'column', padding: 0, height: '100%', 
                }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="c7nagile-ArtCalendar-bar">
                      <span style={{ fontSize: '16px' }}>{ArtName && ArtName}</span>
                      <span style={{ margin: '0 40px' }}>
                        {'开始日期：'}
                        {startDate && moment(startDate).format('YYYY-MM-DD')}
                      </span>
                      {currentPI && (
                      <span>
                        {'正在进行中的PI：'}
                        {currentPI.name}
                      </span>
                      )}
                    </div>
                    <div className="c7nagile-ArtCalendar-scroller">
                      <div className="c7nagile-ArtCalendar-calendar">
                        <CalendarHeader
                          startDate={startDate}
                          endDate={endDate}
                        />
                        <CalendarBody
                          data={data}
                          startDate={startDate}
                          endDate={endDate}
                        />
                      </div>
                    </div>
                  </div>
              
                </div>
                
              ) : (
                <EmptyBlock
                  style={{ marginTop: 60 }}
                  pic={emptyART}
                  title="计划您的敏捷发布火车"
                  des="这是您的ART日历。如果您想看到具体的计划，请先设置火车的PI节奏，然后开启火车。"
                  border
                  textWidth={421}
                />
              )
            }
          </Spin>
        </Content>
      </Page>
    );
  }
}

ArtCalendar.propTypes = {

};

export default ArtCalendar;
