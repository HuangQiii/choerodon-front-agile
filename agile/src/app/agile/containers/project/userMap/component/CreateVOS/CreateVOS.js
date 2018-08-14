import React, { Component } from 'react';
import { stores, axios } from 'choerodon-front-boot';
import { Modal, Form, Input } from 'choerodon-ui';

import './CreateVOS.scss';

const { AppState } = stores;
const FormItem = Form.Item;

class CreateVOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nextSprintName: '',
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if (type === 'sprint') {
      // 请求下一个冲刺名，置入state
    }
  }

  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const projectId = AppState.currentMenuType.id;
        const { type } = this.props;
        const { name } = values;
        const copyConditionDTO = {
        };
        this.setState({
          loading: true,
        });
        if (type === 'sprint') {
          // 创建冲刺
        } else {
          // 创建版本
          const versionCreateDTO = {
            name,
            projectId,
            releaseDate: null,
            startDate: null,
          };
          axios.post(`/agile/v1/projects/${projectId}/product_version`, versionCreateDTO)
            .then((res) => {
              this.setState({ loading: false });
              this.props.onOk();
            })
            .catch((error) => {
              this.setState({ loading: false });
            });
        }
      }
    });
  };

  render() {
    const { visible, onCancel, onOk, type } = this.props;
    const { getFieldDecorator } = this.props.form;
  
    return (
      <Modal
        className="c7n-createVOS"
        title={`创建${type === 'sprint' ? '冲刺' : '版本'}`}
        visible={visible || false}
        onOk={this.handleCreate}
        onCancel={onCancel}
        okText="创建"
        cancelText="取消"
        confirmLoading={this.state.loading}
      >
        <Form layout="vertical">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称' }],
              initialValue: this.state.nextSprintName,
            })(
              <Input
                label={`${type === 'sprint' ? '冲刺' : '版本'}名称`}
                // defaultValue={this.state.nextSprintName}
                maxLength={30}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create({})(CreateVOS);